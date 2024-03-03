import json
import requests
import os
import boto3
import time

def filer_by_time(data, start_time):
    return [x for x in data if float(x['ts']) > start_time]

def filter_by_num_messages(data, num_messages):
    return data[-num_messages:]


# @precondition `event` is a dictionary that contains at least the fields:
#   - `chat_id` (string)
#   - `user_id` (string)
#   - `channel_name` (string)
#   - `team_domain` (string)
#   - `text` (string) what the user typed in the chat
def lambda_handler(event, context):
    
    res = requests.get(
        'https://slack.com/api/conversations.history', 
        params={
            'channel': event['chat_id']
            },
        headers={
            'Authorization': f'Bearer {os.environ["SLACK_BOT_TOKEN"]}'
        }
    )

    messages = res.json()
    print(messages)
    # Only keep `type = message`
    messages = [x for x in messages['messages'] if x['type'] == 'message']

    if event['unit'] == 'd':
        messages = filer_by_time(messages, time.time() - event['num'] * 24 * 60 * 60)
    elif event['unit'] == 'h':
        messages = filer_by_time(messages, time.time() - event['num'] * 60 * 60)
    elif event['unit'] == 'm':
        messages = filter_by_num_messages(messages, event['num'])

    messages = [x['text'] for x in messages if 'text' in x]
        
    print(messages)
    
    s3 = boto3.client('s3')
    response = None
    
    try:
        response = s3.get_object(Bucket='unihack24', Key=f"{event['username']}.json")
    except:
        pass

    if response is None:
        s3.put_object(
            Bucket='unihack24', 
            Key=f"{event['username']}.json", 
            Body=json.dumps({
                event["channel_name"]: messages
            })
        )
    else:
        # Append to response data
        data = json.loads(response['Body'].read())
        data[event["channel_name"]] = messages
        s3.put_object(
            Bucket='unihack24', 
            Key=f"{event['username']}.json", 
            Body=json.dumps(data)
        )
        
    print("Sending to Ali")
    requests.post(
        "https://6b4flv6hbio3z5i7zqoclu3xa40rupme.lambda-url.us-east-1.on.aws/",
        json={
            "username": event['username'],
            "channel_name": event['channel_name'],
            "messages": messages
        }
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps("success")
    }