import { useState } from 'react';
import { apiCall } from '../services/api';

export const useWrite = () => {
  const [isWriting, setIsWriting] = useState(false);

  const postData = async (endpoint, payload) => {
    setIsWriting(true);
    try {
      const result = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setIsWriting(false);
      return result;
    } catch (error) {
      setIsWriting(false);
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
      return result;
    } catch (error) {
      setIsWriting(false);
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
      return result;
    } catch (error) {
      setIsWriting(false);
      throw error;
    }
  };

  return { postData, putData, deleteData, isWriting };
};