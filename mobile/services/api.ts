import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { setStorageItemAsync, useStorageState } from '@/lib/useStorageState';
import { Platform } from 'react-native';

const API_URL = 'https://chronicleme.onrender.com';

export async function saveToken(key, value) {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
    } else { // mobile
      await SecureStore.setItemAsync(key, value.toString());
    }
  } catch (error) {
    console.error("Error saving data:", error); 
  }
}

// Helper function to retrieve the token based on the platform
export async function getToken() {
  if (Platform.OS === 'web') {
    return await AsyncStorage.getItem('token');
  } else {
    return await SecureStore.getItemAsync('token');
  }
}

export const removeToken = async () => {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem('token');
  } else {
    await SecureStore.deleteItemAsync('token');
  }
};

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    await saveToken('token', data.token)
    return true;
  } else {
    return false;
  }
};

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.ok;
};

export const getJournalEntries = async () => {
  const token = await getToken();
  console.log(token)
  const response = await fetch(`${API_URL}/entries`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log(`Response Status: ${response.status}`);
  if (response.status === 403) {
    console.error('Forbidden: Invalid or Expired Token');
  }

  return response.json();
};

export const addJournalEntry = async (entry) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  });
  return response.ok;
};

export const updateJournalEntry = async (id, entry) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  });
  return response.ok;
};

export const deleteJournalEntry = async (id) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.ok;
};

export const updateProfile = async (username, password) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/auth/update-profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ username, password }),
  });
  return response.ok;
};