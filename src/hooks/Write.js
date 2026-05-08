import { useState } from 'react';
import { apiCall } from '../services/api';
import { useRefresh } from '../context/RefreshContext';

export const useWrite = () => {
  const [isWriting, setIsWriting] = useState(false);
  const { triggerRefresh } = useRefresh();

  const postData = async (endpoint, payload) => {
    setIsWriting(true);
    try {
      const result = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setIsWriting(false);
      // Data updated successfully - trigger refresh across all components
      console.log(`✅ POST ${endpoint} success - triggering refresh`);
      triggerRefresh();
      return result;
    } catch (error) {
      setIsWriting(false);
      console.error(`❌ POST ${endpoint} error:`, error);
      throw error;
    }
  };

  const putData = async (endpoint, payload) => {
    setIsWriting(true);
    try {
      const result = await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      setIsWriting(false);
      // Data updated successfully - trigger refresh across all components
      console.log(`✅ PUT ${endpoint} success - triggering refresh`);
      triggerRefresh();
      return result;
    } catch (error) {
      setIsWriting(false);
      console.error(`❌ PUT ${endpoint} error:`, error);
      throw error;
    }
  };

  const deleteData = async (endpoint) => {
    setIsWriting(true);
    try {
      const result = await apiCall(endpoint, {
        method: 'DELETE',
      });
      setIsWriting(false);
      // Data deleted successfully - trigger refresh across all components
      console.log(`✅ DELETE ${endpoint} success - triggering refresh`);
      triggerRefresh();
      return result;
    } catch (error) {
      setIsWriting(false);
      console.error(`❌ DELETE ${endpoint} error:`, error);
      throw error;
    }
  };

  return { postData, putData, deleteData, isWriting };
};