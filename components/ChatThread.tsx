// File: components/ChatThread.tsx
import React from 'react';
import styles from '../styles/ChatThread.module.css';

interface Message {
  agent: string;
  content: string;
}

interface ChatThreadProps {
  messages: Message[];
}

const ChatThread: React.FC<ChatThreadProps> = ({ messages }) => {
  return (
    <div className={styles.chatThread}>
      {messages.map((message, index) => (
        <div key={index} className={`${styles.messageContainer} ${styles[message.agent === 'User' ? 'user' : 'agent']}`}>
          {message.agent !== 'User' && <div className={styles.agentName}>{message.agent}</div>}
          <div className={styles.message}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatThread;