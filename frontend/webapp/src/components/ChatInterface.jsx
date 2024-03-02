import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import './ChatStyle.css'; 

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

function ChatInterface() {
  return (
    <div className="chat-container" style={{ position: "relative", height: "90vh"}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
              }}
            />
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatInterface;