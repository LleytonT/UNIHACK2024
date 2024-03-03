import React, { useState } from 'react';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from "@chatscope/chat-ui-kit-react";
import axios from 'axios';

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

function ChatInterface(props) {
  const [username, setUsername] = useState(props.username);
  const [channels, setChannels] = useState([""]); // [channel1, channel2, ...
  const [messages, setMessages] = useState([
    { message: "Hello! This is the start our chat. When you do /summarise in your chat, I will summarise the chat according to your specs here!",
     sentTime: "just now", sender: "Ai" },
  ]);
  const [messageText, setMessageText] = useState('');

  React.useEffect(() => {
    const summary = getSummary(localStorage.getItem('username'));
    summary.then((value) => {
      const channel = Object.keys(value)[0];
      console.log("Channel: " + channel);
      console.log("Message: " + value[channel]);
      const newMessage = {
        message: value[channel],
        sentTime: "just now",
        sender: "Ai"
      };
      setMessages([...messages, newMessage]);
    });
  }, []);

  const handleInputChange = (event) => {
    setMessageText(event);
  };

  const handleSend = () => {
    console.log("SENDING:" + messageText);
    const newMessage = {
      message: messageText,
      sentTime: "just now", 
      sender: "You" 
    };
    setMessages([...messages, newMessage]);
    setMessageText(''); 
  };

  return (
    <div style={{ position: "relative", height: "90vh" }}>
      <MainContainer style={{backgroundColor:"#16161a", border: "none"}}>
        <ChatContainer style={{backgroundColor:"#16161a", border: "none"}}>
          <MessageList style={{backgroundColor:"#16161a", border: "none"}}>
            {messages.map((msg, index) => (
              <Message className='message-container' key={index} model={msg} />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here" 
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
