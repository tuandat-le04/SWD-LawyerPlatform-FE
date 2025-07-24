import apiClient from './apiClient';

const apiService = {
  // Lấy danh sách luật sư
  getLawyers: async () => {
    try {
      const response = await apiClient.get('/Appointment/lawyers');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch lawyers:', error);
      throw new Error('Failed to fetch lawyers');
    }
  },

  // Lấy danh sách loại pháp lý
  getLawtypes: async () => {
    try {
      const response = await apiClient.get('/Appointment/lawtypes');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch lawtypes:', error);
      throw new Error('Failed to fetch lawtypes');
    }
  },

  // Tạo appointment
  createAppointment: async (appointmentData) => {
    try {
      console.log('API: Creating appointment with data:', appointmentData);
      const response = await apiClient.post('/Appointment', appointmentData);
      console.log('API: Appointment response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Failed to create appointment:', error);
      
      // Log detailed error information
      if (error.response) {
        console.error('API: Error response data:', error.response.data);
        console.error('API: Error status:', error.response.status);
        
        // Handle validation errors
        if (error.response.status === 400 && error.response.data.errors) {
          const validationErrors = Object.entries(error.response.data.errors)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('\n');
          throw new Error(`Validation errors:\n${validationErrors}`);
        }
      }
      
      throw new Error(error.response?.data?.message || 'Failed to create appointment');
    }
  }
};

export default apiService;