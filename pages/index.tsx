// File: pages/index.tsx
import { useState, useRef } from 'react';
import axios from 'axios';
import ChatThread from '../components/ChatThread';
import AgentSettings from '../components/AgentSettings';
import ConversationStarter from '../components/ConversationStarter';
import styles from '../styles/Home.module.css';

interface Message {
  agent: string;
  content: string;
}

interface AgentConfig {
  name: string;
  personality: string;
  model: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentA, setAgentA] = useState<AgentConfig>({
    name: "Agent A",
    personality: "Default",
    model: "gpt-3.5-turbo-0125",
  });
  const [agentB, setAgentB] = useState<AgentConfig>({
    name: "Agent B",
    personality: "Default",
    model: "gpt-3.5-turbo-0125",
  });
  const [isLoading, setIsLoading] = useState(false);
  const stopConversationRef = useRef(false);

  const generateResponse = async (agent: AgentConfig, prompt: string, messageLength: string) => {
    try {
      const response = await axios.post('/api/generate', { 
        messages: [
          { role: "system", content: `You are ${agent.name}, a ${agent.personality}. Respond accordingly. Keep your response ${messageLength} (short: max 2 sentences, medium: 3-4 sentences, long: 5+ sentences). Always end with an interesting and relevant question.` },
          { role: "user", content: prompt }
        ],
        model: agent.model
      });
      return response.data.response;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  };

  const startConversation = async (prompt: string, setting: string, messageLength: string, maxMessages: number) => {
    setIsLoading(true);
    stopConversationRef.current = false;
    
    let currentPrompt = `${prompt} (Setting: ${setting})`;
    setMessages([{ agent: 'User', content: currentPrompt }]);

    for (let i = 0; i < maxMessages && !stopConversationRef.current; i++) {
      // Agent A's turn
      const agentAResponse = await generateResponse(agentA, currentPrompt, messageLength);
      setMessages(prev => [...prev, { agent: agentA.name, content: agentAResponse }]);

      if (stopConversationRef.current) break;

      // Agent B's turn
      const agentBResponse = await generateResponse(agentB, agentAResponse, messageLength);
      setMessages(prev => [...prev, { agent: agentB.name, content: agentBResponse }]);

      currentPrompt = agentBResponse;

      if (stopConversationRef.current) break;
    }

    setIsLoading(false);
  };

  const stopConversation = () => {
    stopConversationRef.current = true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.globalSettings}>
        <ConversationStarter 
          onStart={startConversation} 
          onStop={stopConversation}
          isLoading={isLoading} 
        />
      </div>
      <div className={styles.content}>
        <div className={styles.sidePanel}>
          <AgentSettings 
            agent="A"
            config={agentA}
            onConfigChange={(config: AgentConfig) => setAgentA(config)}
          />
        </div>
        <div className={styles.chatArea}>
          <ChatThread messages={messages} />
        </div>
        <div className={styles.sidePanel}>
          <AgentSettings 
            agent="B"
            config={agentB}
            onConfigChange={(config: AgentConfig) => setAgentB(config)}
          />
        </div>
      </div>
    </div>
  );
}