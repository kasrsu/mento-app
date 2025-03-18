import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Module {
  id: string;
  name: string;
  description: string;
}

interface SessionContextProps {
  cachedModules: Module[];
  updateModules: (modules: Module[]) => Promise<void>;
  clearCache: () => Promise<void>;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cachedModules, setCachedModules] = useState<Module[]>([]);

  useEffect(() => {
    loadCachedModules();
  }, []);

  const loadCachedModules = async () => {
    try {
      const saved = await AsyncStorage.getItem('cachedModules');
      if (saved) {
        setCachedModules(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load cached modules:', error);
    }
  };

  const updateModules = async (modules: Module[]) => {
    try {
      await AsyncStorage.setItem('cachedModules', JSON.stringify(modules));
      setCachedModules(modules);
    } catch (error) {
      console.error('Failed to cache modules:', error);
    }
  };

  const clearCache = async () => {
    try {
      await AsyncStorage.removeItem('cachedModules');
      setCachedModules([]);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  return (
    <SessionContext.Provider value={{ cachedModules, updateModules, clearCache }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};