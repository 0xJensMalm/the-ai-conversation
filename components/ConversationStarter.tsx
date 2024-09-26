// File: components/ConversationStarter.tsx
import React, { useState } from 'react';
import styles from '../styles/ConversationStarter.module.css';

interface ConversationStarterProps {
  onStart: (prompt: string, setting: string, messageLength: string, maxMessages: number) => void;
  onStop: () => void;
  isLoading: boolean;
}

const ConversationStarter: React.FC<ConversationStarterProps> = ({ onStart, onStop, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [setting, setSetting] = useState('');
  const [messageLength, setMessageLength] = useState('short');
  const [maxMessages, setMaxMessages] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPrompt = `${prompt} Setting: ${setting}. Always answer with an interesting and relevant question back.`;
    onStart(fullPrompt, setting, messageLength, maxMessages);
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Start the conversation..."
        className={styles.input}
        disabled={isLoading}
      />
      <input
        type="text"
        value={setting}
        onChange={(e) => setSetting(e.target.value)}
        placeholder="Setting"
        className={styles.input}
        disabled={isLoading}
      />
      <select
        value={messageLength}
        onChange={(e) => setMessageLength(e.target.value)}
        className={styles.select}
        disabled={isLoading}
      >
        <option value="short">Short (max 2 sentences)</option>
        <option value="medium">Medium (3-4 sentences)</option>
        <option value="long">Long (5+ sentences)</option>
      </select>
      <input
        type="number"
        value={maxMessages}
        onChange={(e) => setMaxMessages(Math.max(1, parseInt(e.target.value)))}
        min="1"
        className={styles.input}
        disabled={isLoading}
      />
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Start'}
      </button>
      {isLoading && (
        <button type="button" onClick={onStop} className={styles.stopButton}>
          Stop
        </button>
      )}
    </form>
  );
};

export default ConversationStarter;