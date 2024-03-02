import os
import time
from typing import Optional
import requests

from fastapi import FastAPI, Request
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

# ... (other imports if needed) ...

SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")  
#API_ENDPOINT = "https://your-ai-service.com/summarize"  

client = WebClient(token=SLACK_BOT_TOKEN)
app = FastAPI()

@app.post("/slack/commands")
async def handle_command(request: Request):
    body = await request.json()  # Get request data

    # ... (Your logic from before: parameter parsing, fetching messages, calling AI, etc.) ...
    print(body)

    url_body = [i for i in body if i['key'] == 'response_url']
    url = url_body[0]['value']

    requests.post(url, json={"text": "Your response here"})


    return {"status": "success"}  # Return summary for web app
