import json
import boto3
from typing import Dict, List
import base64
import re
import requests


endpoint_name = "jumpstart-dft-meta-textgeneration-llama-2-7b-f"

def query_endpoint(payload):
    client = boto3.client("sagemaker-runtime")
    response = client.invoke_endpoint(
        EndpointName=endpoint_name,
        ContentType="application/json",
        Body=json.dumps(payload),
    )
    response = response["Body"].read().decode("utf8")
    response = json.loads(response)
    return response
    
def format_messages(messages):
    """Format messages for Llama-2 chat models."""
    prompt = []

    if messages[0]["role"] == "system":
        content = "".join(["<<SYS>>\n", messages[0]["content"], "\n<</SYS>>\n\n", messages[1]["content"]])
        messages = [{"role": messages[1]["role"], "content": content}] + messages[2:]

    for user, answer in zip(messages[::2], messages[1::2]):
        prompt.extend(["<s>", "[INST] ", (user["content"]).strip(), " [/INST] ", (answer["content"]).strip(), "</s>"])

    prompt.extend(["<s>", "[INST] ", (messages[-1]["content"]).strip(), " [/INST] "])

    return "".join(prompt)

def lambda_handler(event, context):
    
    system_prompt = """
    Given a set of messages exchanged between users on slack, please summarise the key points, main topics, and any notable conclusions or decisions.
    Highlight important details such as given task, key meetings or anything that the user might have missed while they were not checking the channel.
    Provide a concise overview of the overall conversation and list the key points in your output.
    """
    
    dialog = [{"role": "system", "content": system_prompt}]
    
    
    # Parse the JSON data
    js = json.loads(event['body'])
    
    
    # texts = [x['text'] for x in js['hackathon']['messages'] if 'text' in x]
    # whole_chat = '\n'.join(texts)
    
    whole_chat = "\n".join(js["messages"])
    
    input_message = f"""The History of the chat: 
        {whole_chat}
        """
    # read previous interactions from somewhere and add as assistant message
    dialog.append({"role": "user", "content": input_message})
    
    
    
    prompt = format_messages(dialog)
    payload = {"inputs": prompt, "parameters": {"max_new_tokens": 360, "top_p": 0.9, "temperature": 0.6}}
    response = query_endpoint(payload)
    
    
    requests.post(
        "https://e6iwsa4jcq7zy42l6ckgurfwca0cpfjc.lambda-url.ap-southeast-2.on.aws/",
        json={
            "summary": "hello", # response[0]["generated_text"],
            "username": js["username"],
            "channel_name": js["channel_name"],
        }
    )
    
    print(response[0]["generated_text"])

    return {
        "statusCode": 200,
        "body": json.dumps(response[0]["generated_text"])
    }