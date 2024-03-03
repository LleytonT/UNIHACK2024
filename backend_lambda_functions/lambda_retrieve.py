import json
import boto3

# @precondition: event has username in it
def lambda_handler(event, context):
    s3 = boto3.client('s3')  # Initialize the s3 client
    username = event['queryStringParameters']['username']
    
    response = None
    
    try:
        response = s3.get_object(Bucket='unihack24', Key=f"{username}_summary.json")
    except Exception as e:
        print(e)
        pass
    
    if response is None:
        return {
            'statusCode': 404,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
            },
            'body': json.dumps({'info': f'the requested resource does not exist {username}'})
        }
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        },
        'body': json.dumps(json.loads(response['Body'].read()))
    }
