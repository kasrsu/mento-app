const API_BASE_URL = 'http://192.168.231.152:8000';

export const getModuleTopics = async (moduleName: string) => {
  try {
    const encodedModuleName = encodeURIComponent(moduleName);
    const response = await fetch(`${API_BASE_URL}/module-content/${encodedModuleName}/topics`);

    if (!response.ok) {
      throw new Error('Failed to fetch module topics');
    }

    const data = await response.json();
    
    // Log the response for debugging
    console.log('API response for getModuleTopics:', data);
    
    // Ensure we return an array
    if (Array.isArray(data)) {
      return data;
    } else if (data.topics && Array.isArray(data.topics)) {
      return data.topics;
    } else {
      console.error('Unexpected API response format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching module topics:', error);
    throw error;
  }
};

export const startModuleLearning = async (moduleData: {
  moduleId: string;
  moduleName: string;
  moduleDescription: string;
}) => {
  try {
   // Extract moduleName from moduleData
    const encodedModuleName = encodeURIComponent(moduleData.moduleName);
    
    // Use the correct endpoint format that matches the backend
    const response = await fetch(`${API_BASE_URL}/module-content/${encodedModuleName}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moduleData),
    });

    if (!response.ok) {
      throw new Error('Failed to start module learning');
    }

    return await response.json();
  } catch (error) {
    console.error('Error starting module:', error);
    throw error;
  }
};
