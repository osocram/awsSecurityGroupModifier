import boto3
import json
from botocore.exceptions import ClientError
import hashlib
import copy

# ID of the security group we want to update
SECURITY_GROUP_ID = "sg-xxxx"
SHOWLOG = True

def showLog(msg):
    if SHOWLOG  :
        print('[LOG] - '+msg)   

def checkTagExists(xxx,tag):
    try:
        if xxx[tag] != "":
            return True
    except:
        return False

def resultAll(code,msg):
    return {
        'statusCode': code,
        'body': json.dumps(msg) }
        
def resultOK(msg):
    return resultAll(200,'[OK] - '+msg)

def resultError(msg):
    return resultAll(400,'[Error] - '+msg)
    
def addOrModifyRule(new_ip_address, new_name):
    
    def checkIPExists(ip_ranges,new_ip_address):
        showLog("Valida se IP repetido")
        nonlocal userName
        for ip_range in ip_ranges:
            showLog(ip_range['CidrIp']+" = "+new_ip_address+'/32')
            if ip_range['CidrIp'] == new_ip_address+'/32':
                userName = ip_range['Description']
                return True

    def modifyRule(client, groupID, permission, new_permission):
        showLog("modifyRule")
        if permission != new_permission:
            #remove a regra encontrada
            response = client.revoke_security_group_ingress(GroupId=groupID['GroupId'], IpPermissions=[permission])
            showLog("revoke = "+str(response))
            
            #insere a regra nova
            response = client.authorize_security_group_ingress(GroupId=groupID['GroupId'], IpPermissions=[new_permission])
            showLog("authorize = "+str(response))
            
    def addRule(client, group, new_name, new_ip_address):
        client.authorize_security_group_ingress(
            GroupId=group['GroupId'],
            IpPermissions=[{'FromPort'  : 0,
                            'ToPort'    : 65535,
                            'IpProtocol': 'tcp',
                            'IpRanges'  : [{
                                'CidrIp'     : new_ip_address+'/32',
                                'Description': new_name
                            },],
                        },])
            
    def modifiedPermissionIfEquals(new_name,new_ip_address,ip_ranges):
        nonlocal modificou
        for ip_range in ip_ranges:
            if checkTagExists(ip_range,'Description'):
                if ip_range['Description'] == new_name:
                    ip_range['CidrIp'] = "%s/32" % new_ip_address
                    modificou = True
                    return True
                
    client = boto3.client('ec2')
    securtyGroups = client.describe_security_groups(GroupIds=[SECURITY_GROUP_ID])
    #showLog("response = "+str(response))
    group = securtyGroups['SecurityGroups'][0]
    #showLog("group = "+str(group))

    modificou = False
    for permission in group['IpPermissions']:
        #showLog('Entrou no for permission')
        new_permission = copy.deepcopy(permission)
        ip_ranges = new_permission['IpRanges']
        userName = ''
        if checkIPExists(ip_ranges,new_ip_address ):
            return resultError('Este IP:'+new_ip_address+' ja está cadastrado para o usuário: '+userName)

        if modifiedPermissionIfEquals(new_name,new_ip_address,ip_ranges):
            modifyRule(client, group, permission, new_permission)
            return resultOK('Alterado o IP:'+new_ip_address+' para o usuário: '+new_name)
            break

    if (not modificou):
        addRule(client, group, new_name, new_ip_address)
        return resultOK('Adicionado o IP: '+new_ip_address+' para o usuário: '+new_name)

    return resultError('Não foi possivel alterar a regra')

def lambda_handler(event, context):
    new_ip_address = list(event.values())[0]
    new_name       = list(event.values())[1]

    try:
        return addOrModifyRule(new_ip_address,new_name)
    except OSError  as err:  
        showLog("Exception = "+err)
        return resultError('Ocorreu um erro ao tentar modificar a regra')
