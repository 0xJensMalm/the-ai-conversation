// File: global.d.ts
declare module '../components/ChatThread' {
    import { FC } from 'react';
    
    interface Message {
      agent: string;
      content: string;
    }
  
    interface ChatThreadProps {
      messages: Message[];
    }
  
    const ChatThread: FC<ChatThreadProps>;
    export default ChatThread;
  }
  
  declare module '../components/AgentSettings' {
    import { FC } from 'react';
    
    interface AgentConfig {
      name: string;
      personality: string;
      model: string;
    }
  
    interface AgentSettingsProps {
      agent: string;
      config: AgentConfig;
      onConfigChange: (config: AgentConfig) => void;
    }
  
    const AgentSettings: FC<AgentSettingsProps>;
    export default AgentSettings;
  }
  
  declare module '../components/ConversationStarter' {
    import { FC } from 'react';
  
    interface ConversationStarterProps {
      onStart: (prompt: string, exchanges: number) => void;
      onStop: () => void;
      isLoading: boolean;
    }
  
    const ConversationStarter: FC<ConversationStarterProps>;
    export default ConversationStarter;
  }