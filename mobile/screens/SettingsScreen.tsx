import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateProfile } from '../services/api';

export default function SettingsScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async () => {
    const success = await updateProfile(username, password);
    if (success) {
      alert('Profile updated');
    } else {
      alert('Update failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Update Profile</Text>
      <TextInput 
        style={styles.input} 
        placeholder="New Username" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="New Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
