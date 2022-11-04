import boto3
import json
from botocore.exceptions import ClientError
import hashlib
import copy

# ID of the security group we want to update
SECURITY_GROUP_ID = "sg-xxxx"

def modifyrRules(new_ip_address, new_name):
    
    client = boto3.client('ec2')
    response = client.describe_security_groups(GroupIds=[SECURITY_GROUP_ID])
    #print("response = "+str(response))
    group = response['SecurityGroups'][0]
    #print("group = "+str(group))

    modificou = False
    for permission in group['IpPermissions']:
        new_permission = copy.deepcopy(permission)
        ip_ranges = new_permission['IpRanges']
        
        for ip_range in ip_ranges:
            #print(ip_range['CidrIp']+" = "+new_ip_address+'/32')
            if ip_range['CidrIp'] == new_ip_address+'/32':
                #print("IP repetido")
                return {
                    'statusCode': 400,
                    'body': json.dumps('Este IP:'+new_ip_address+' ja está cadastrado para o usuário: '+ip_range['Description']) }
                
            
        
        for ip_range in ip_ranges:
            if ip_range['Description'] == new_name:
                ip_range['CidrIp'] = "%s/32" % new_ip_address
                modificou = True
     
                
     
        response = client.revoke_security_group_ingress(GroupId=group['GroupId'], IpPermissions=[permission])
        #print("revoke = "+str(response))
        response = client.authorize_security_group_ingress(GroupId=group['GroupId'], IpPermissions=[new_permission])
        #print("authorize = "+str(response))
        

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
        return {
            'statusCode': 200,
            'body': json.dumps('Alterado o IP:'+new_ip_address+' para o usuário: '+new_name)}
    else:
         return {
            'statusCode': 200,
            'body': json.dumps('Adicionado o IP:'+new_ip_address+' para o usuário: '+new_name)}
 
    return ""


def lambda_handler(event, context):

    new_ip_address = list(event.values())[0]
    new_name       = list(event.values())[1]
    result         = modifyrRules(new_ip_address,new_name)
    return result