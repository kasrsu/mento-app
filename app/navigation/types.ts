import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  'screens/home/index': undefined;
  'screens/Mento_reco/index': {
    modules: Array<{
      id: string;
      name: string;
      description: string;
    }>;
  };
  'screens/chat/index': undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;