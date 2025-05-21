import axios from 'axios';

const API_BASE_URL = 'http://192.168.103.152:8000'; // Keep your current URL

export interface ModuleTopic {
  id: string;
  name: string;
  title: string;
  description: string;
  isCompleted: boolean;
  subtopics: ModuleTopic[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  progress: number;
  icon: string;
}

export const getModuleTopics = async (moduleName: string): Promise<ModuleTopic[]> => {
  try {
    console.log(`Fetching topics for module: ${moduleName}`);
    
    // Use POST request with JSON body
    const response = await axios.post(
      `${API_BASE_URL}/module-content/${encodeURIComponent(moduleName)}/topics`,
      { moduleName },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', response.data);

    if (Array.isArray(response.data)) {
      return response.data;
    }

    // Handle case where response.data has a data property
    if (response.data && typeof response.data === 'object' && 'data' in response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    console.warn('Unexpected response format:', response.data);
    return [];

  } catch (error) {
    console.error('Error fetching module topics:', error);
    // Return empty array instead of throwing to prevent component crashes
    return [];
  }
};

// Function to update topic completion status
export const updateTopicCompletion = async (
  topicId: string, 
  isCompleted: boolean
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/topics/${topicId}/completion`,
      { isCompleted },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error updating topic completion:', error);
    return false;
  }
};

/**
 * Start learning a module - sends module selection to backend
 */
export const startModuleLearning = async (moduleData: {
  moduleId: string;
  moduleName: string;
  moduleDescription: string;
}): Promise<any> => {
  try {
    // Ensure moduleData has the required properties
    if (!moduleData || !moduleData.moduleName) {
      throw new Error('Invalid module data');
    }
    
    // Encode the module name for the URL
    const encodedModuleName = encodeURIComponent(moduleData.moduleName);
    
    console.log('Starting module learning for:', moduleData);
    
    // Make the API call using POST
    const response = await axios.post(
      `${API_BASE_URL}/module-content/${encodedModuleName}/topics`,
      moduleData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('API startModuleLearning response:', response.data);
    
    return response.data;
  } catch (error: any) {
    // Detailed error logging
    console.error('Error in startModuleLearning:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    // Return empty object instead of throwing
    return {};
  }
};
