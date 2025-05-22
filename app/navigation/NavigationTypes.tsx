import { StackNavigationProp } from '@react-navigation/stack';

// Import from the main types file to ensure consistency
import { RootStackParamList as MainRootStackParamList } from './types';

// Re-export the same type
export type RootStackParamList = MainRootStackParamList;

export type NavigationProp = StackNavigationProp<RootStackParamList>;
