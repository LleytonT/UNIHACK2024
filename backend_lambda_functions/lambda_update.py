import json
import requests

def lambda_handler(event, context):
    
    # Send a request to update the summary
    res = requests.post(
        "https://6b4flv6hbio3z5i7zqoclu3xa40rupme.lambda-url.us-east-1.on.aws/",
        json={
            "username": event['username'],
            "channel_name": event['channel_name'],
            "messages": event['messages'],
            "query": event["query"]
        }
    )
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        },
        'body': json.dumps(res.json())
    }
