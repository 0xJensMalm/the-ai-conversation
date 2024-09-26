// File: components/AgentSettings.tsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/AgentSettings.module.css';

interface AgentSettingsProps {
  agent: string;
  config: {
    name: string;
    personality: string;
    model: string;
  };
  onConfigChange: (config: { name: string; personality: string; model: string }) => void;
}

const AgentSettings: React.FC<AgentSettingsProps> = ({ agent, config, onConfigChange }) => {
  const [isCustom, setIsCustom] = useState(false);

  const personalities = [
    "Default", "Eternal Contrarian", "Hardcore Capitalist", "Anti-Capitalist Revolutionary",
    "Fundamentalist Traditionalist", "Relentless Futurist", "Authoritarian Nationalist",
    "Anarchic Libertarian", "Hardcore Marxist", "Ancient Wizard", "Random person from the year 2089",
    "6 year old girl", "98 year old person with dementia", "Custom"
  ];

  const models = ["gpt-3.5-turbo-0125", "gpt-4-turbo-preview"];

  const defaultNames: { [key: string]: string } = {
    "Default": "Neutral Nancy",
    "Eternal Contrarian": "Opposite Oscar",
    "Hardcore Capitalist": "Moneybags Monty",
    "Anti-Capitalist Revolutionary": "Rebel Rosa",
    "Fundamentalist Traditionalist": "Old-School Ollie",
    "Relentless Futurist": "Techno Tessa",
    "Authoritarian Nationalist": "Iron-Fist Ian",
    "Anarchic Libertarian": "Free-Spirit Frankie",
    "Hardcore Marxist": "Comrade Carl",
    "Ancient Wizard": "Merlin the Timeless",
    "Random person from the year 2089": "Neo Nora",
    "6 year old girl": "Little Lucy",
    "98 year old person with dementia": "Forgetful Fred"
  };

  useEffect(() => {
    if (config.personality in defaultNames && !isCustom) {
      onConfigChange({ ...config, name: defaultNames[config.personality] });
    }
  }, [config.personality, isCustom]);

  const handlePersonalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPersonality = e.target.value;
    if (newPersonality === "Custom") {
      setIsCustom(true);
      onConfigChange({ ...config, personality: '' });
    } else {
      setIsCustom(false);
      onConfigChange({ ...config, personality: newPersonality });
    }
  };

  return (
    <div className={styles.settingsBox}>
      <h3 className={styles.settingsTitle}>Agent {agent} Settings</h3>
      <div className={styles.settingItem}>
        <input
          type="text"
          value={config.name}
          onChange={(e) => onConfigChange({ ...config, name: e.target.value })}
          className={styles.input}
          placeholder="Name"
        />
      </div>
      <div className={styles.settingItem}>
        <select 
          value={isCustom ? 'Custom' : config.personality} 
          onChange={handlePersonalityChange}
          className={styles.select}
        >
          {personalities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className={styles.settingItem}>
        <select 
          value={config.model} 
          onChange={(e) => onConfigChange({ ...config, model: e.target.value })}
          className={styles.select}
        >
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      {isCustom && (
        <div className={styles.settingItem}>
          <input
            type="text"
            value={config.personality}
            onChange={(e) => onConfigChange({ ...config, personality: e.target.value })}
            className={styles.input}
            placeholder="Enter custom personality"
          />
        </div>
      )}
    </div>
  );
};

export default AgentSettings;