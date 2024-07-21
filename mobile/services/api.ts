import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://chronicleme.onrender.com';

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
    // localStorage.setItem('token', data.token);
    await AsyncStorage.setItem('token', data.token);
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
  // const token = localStorage.getItem('token');
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/entries`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const addJournalEntry = async (entry) => {
  // const token = localStorage.getItem('token');
  const token = await AsyncStorage.getItem('token');
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
  // const token = localStorage.getItem('token');
  const token = await AsyncStorage.getItem('token');
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
  // const token = localStorage.getItem('token');
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.ok;
};

export const updateProfile = async (username, password) => {
  // const token = localStorage.getItem('token');
  const token = await AsyncStorage.getItem('token');
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
