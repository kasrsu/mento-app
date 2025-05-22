import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp as RNNavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  // Main route names with consistent parameter definitions
  Home: undefined;
  Dashboard: undefined;
  Progress: undefined;
  Recommendations: {
    modules: Array<{
      id: string;
      name: string;
      description: string;
    }>;
  };
  Chat: undefined;
  ModuleContent: {
    moduleName: string;
    moduleDescription: string;
    moduleId: string;
  };
  
  // Path-style routes
  'screens/home/index': undefined;
  'screens/Dashboard/index': undefined;
  'screens/progress/index': undefined;
  'screens/Recommendations/index': {
    modules: Array<{
      id: string;
      name: string;
      description: string;
    }>;
  };
  'screens/chat/index': undefined;
  'screens/ModuleContent/index': {
    moduleName: string;
    moduleDescription: string;
    moduleId: string;
  };
};

export type NavigationProp = RNNavigationProp<RootStackParamList>;

export type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;
