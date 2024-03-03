import json

def lambda_handler(event, context):
    
    event = json.loads(event)
    
    summary = event['body']['summary']
    username = event['body']['username']
    channel_name = event['body']['channel_name']
    
    try:
        response = s3.get_object(Bucket='unihack24', Key=f"{username}_summary.json")
    except:
        pass
 
    if response is None:
        s3.put_object(
            Bucket='unihack24', 
            Key=f"{username}_summary.json", 
            Body=json.dumps({
                channel_name: summary
            })
        )
    else:
        # Append to response data
        data = json.loads(response['Body'].read())
        data[channel_name] = summary
        s3.put_object(
            Bucket='unihack24', 
            Key=f"{username}_summary.json", 
            Body=json.dumps(data)
        )
    
    
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
