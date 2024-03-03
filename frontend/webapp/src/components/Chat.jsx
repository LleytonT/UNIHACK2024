import React, { useState } from 'react';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from "@chatscope/chat-ui-kit-react";
import axios from 'axios';
import './ChatStyle.css'
import { Typography } from '@mui/material';

async function getSummary(username) {
  try {
    const response = await axios.get('https://ydl3nclhdrymgnoafu73wh6fvm0devin.lambda-url.ap-southeast-2.on.aws/', {
      params: {
        username: username
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getSummary: ${error}`);
  }
}

async function getResponse(username) {
  try {
    const response = await axios.get('https://wwcvh5dbedhwa23rb2aaxxejum0euzih.lambda-url.ap-southeast-2.on.aws/', {
      params: {
        username: username
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getSummary: ${error}`);
  }
}

function ChatInterface(props) {
  const username = localStorage.getItem('username');
  const [channels, setChannels] = useState([""]); // [channel1, channel2, ...
  const [messages, setMessages] = useState([
    { channel: "#start", message: "Hello! This is the start our chat. When you do /summarise in your chat, I will summarise the chat according to your specs here!",
     sentTime: "just now", sender: "Ai" },
  ]);
  const [userMessages, setUserMessages] = useState(0); // [message1, message2, ...
  const [messageText, setMessageText] = useState('');
  const [channelName, setChannelName] = useState('');

  React.useEffect(() => {
    const summary = getSummary(localStorage.getItem('username'));
    summary.then((value) => {
      if (value) {
        const channel = Object.keys(value)[0];
        setChannelName(channel);
        console.log("Channel: " + channel);
        console.log("Message: " + value[channel]);
        const newMessage = {
          channel: channel,
          message: "#" + channel + ": " + value[channel],
          sentTime: "just now",
          sender: "Ai"
        };
        setMessages([...messages, newMessage]);
      }
    });
  }, [username]);

  React.useEffect(() => {
    const summary = getResponse(localStorage.getItem('username'));
    summary.then((value) => {
      if (value) {
        const channel = Object.keys(value)[0];
        setChannelName(channel);
        console.log("Channel: " + channel);
        console.log(value);
        console.log("Message: " + value);
        const newMessage = {
          channel: channel,
          message: value,
          sentTime: "just now",
          sender: "Ai"
        };
        setMessages([...messages, newMessage]);
      }
    });
  }, [userMessages]);

  const handleInputChange = (event) => {
    setMessageText(event);
  };

  const handleSend = () => {
    console.log("SENDING:" + messageText);
    const newMessage = {
      channel: channelName,
      message: messageText,
      sentTime: "just now", 
      sender: "You" 
    };
    console.log("newMessage" + newMessage);
    setUserMessages(userMessages + 1);
    setMessages([...messages, newMessage]);
    setMessageText(''); 
  };

  return (
    <div style={{ position: "relative", height: "90vh" }}>
      <MainContainer style={{backgroundColor:"#16161a", border: "none"}}>
        <ChatContainer style={{backgroundColor:"#16161a", border: "none"}}>
          <MessageList style={{backgroundColor:"#16161a", border: "none"}}>
            {messages.map((msg, index) => (
              <Message className='message-container' key={index} model={msg} sender={msg.sender}>
              {msg.message} 
            </Message>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Ask me for more information!" 
            value={messageText}
            style={{backgroundColor:"#16161a", border: "none"}}
            onChange={handleInputChange}
            onSend={handleSend} 
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatInterface;
