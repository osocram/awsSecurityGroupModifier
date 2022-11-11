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
    #alguns array não tem a tag Description e causa um erro, 
    #então aqui vamos apenas fazer um processo onde tenha o description    
    try:
        if xxx[tag] != "":
            result = True
    except:
        result = False
    return result
            
def checkIPExists(ip_ranges,new_ip_address):
    showLog("Valida se IP repetido")
    result = ''
    for ip_range in ip_ranges:
        showLog(ip_range['CidrIp']+" = "+new_ip_address+'/32')
        if ip_range['CidrIp'] == new_ip_address+'/32':
            result = ip_range['Description']
    return result

def resultAll(code,msg):
    return {
        'statusCode': code,
        'body': json.dumps(msg) }
        
def resultOK(msg):
    return resultAll(200,'[OK] - '+msg)

def resultError(msg):
    return resultAll(400,'[Error] - '+msg)
    
def modifyRule(client,groupID,old_Permisson, new_Permission):
    if old_Permisson != new_permission:
        #remove a regra encontrada
        showLog('permission = '+str(old_Permisson))
        response = client.revoke_security_group_ingress(GroupId=groupID['GroupId'], IpPermissions=[old_Permisson])
        showLog("revoke = "+str(response))
        
        #insere a regra nova
        response = client.authorize_security_group_ingress(GroupId=groupID['GroupId'], IpPermissions=[new_permission])
        showLog("authorize = "+str(response))
    
def modifyrRules(new_ip_address, new_name):
    
    client = boto3.client('ec2')
    response = client.describe_security_groups(GroupIds=[SECURITY_GROUP_ID])
    #showLog("response = "+str(response))
    group = response['SecurityGroups'][0]
    #showLog("group = "+str(group))

    modificou = False
    for permission in group['IpPermissions']:
        showLog('Entrou no for permission')
        
        new_permission = copy.deepcopy(permission)
        ip_ranges = new_permission['IpRanges']
        
        #Valida se o IP ja esta cadastrado
        userName = checkIPExists(ip_ranges,new_ip_address)
        if userName != '':
            showLog('Achou ip repetido')
            return resultError('Este IP:'+new_ip_address+' ja está cadastrado para o usuário: '+userName)

        # percorre toda a lista p ver se encontra com o mesmo nome, caso encontrar modifica o IP.
        showLog("Valida se o nome ja esta cadastrado para editar.")
        for ip_range in ip_ranges:
            if checkTagExists(ip_range,'Description'):
                if ip_range['Description'] == new_name:
                    ip_range['CidrIp'] = "%s/32" % new_ip_address
                    modificou = True
                    break

        if modificou:
            modifyRule(client,group,Permisson, new_Permission)
            break

    # se não modificou então não encontrou o nome do usuario, então incluir.
    if (not modificou):
        response = client.authorize_security_group_ingress(
            GroupId=group['GroupId'],
            IpPermissions=[{
            'FromPort': 0,
            'ToPort': 65535,
            'IpProtocol': 'tcp',
            'IpRanges': [
                {
                    'CidrIp': new_ip_address+'/32',
                    'Description': new_name
                },],
            },])
        return resultOK('Alterado o IP:'+new_ip_address+' para o usuário: '+new_name)
    else:
         return resultOK('Adicionado o IP:'+new_ip_address+' para o usuário: '+new_name)

    return resultError('Não foi possivel alterar a regra')

def lambda_handler(event, context):

    new_ip_address = list(event.values())[0]
    new_name       = list(event.values())[1]

    try:
        result         = modifyrRules(new_ip_address,new_name)
    except OSError  as err:  
        showLog("Exception = "+err)
        result         = resultError('Ocorreu um erro ao tentar modificar a regra')
    return result
