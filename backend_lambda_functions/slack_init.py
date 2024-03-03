import json
import base64
import re
import boto3
import logging

def lambda_handler(event, context):
    decoded = base64.b64decode(event['body']).decode('utf-8')

    decoded_dict = dict(x.split('=') for x in decoded.split('&'))
    logging.info(decoded_dict)

    # Validate event['text'] is in form [num][d] / [num][h] / [num][m]
    if not re.match(r'^\d+[dhm]$', decoded_dict['text']):
        return {
            'statusCode': 200,
            'body': json.dumps('Invalid input. Please use the format [num][d/h/m]')
        }

    
    # Get the number and the unit
    num = int(re.search(r'\d+', decoded_dict['text']).group())
    unit = re.search(r'[dhm]', decoded_dict['text']).group()
    
    # TODO send request to `lambda_get_data`
    lambda_client = boto3.client('lambda')
    
    lambda_client.invoke(
        FunctionName='get_historical_data',
        InvocationType='Event',
        Payload=json.dumps({
            "chat_id": decoded_dict['channel_id'],
            "user_id": decoded_dict['user_id'],
            "username": decoded_dict['user_name'],
            "channel_name": decoded_dict['channel_name'],
            "team_domain": decoded_dict['team_domain'],
            "unit": unit,
            "num": num
        })
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps("Let us cook! In the meanwhile have some fun!")
    }