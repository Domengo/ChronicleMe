import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../services/api';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    const success = await register(username, password);
    if (success) {
      setMessage('Registration successful! Redirecting to login...');
      setIsSuccess(true);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } else {
      setMessage('Registration failed. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={[styles.message, { color: isSuccess ? 'green' : 'red' }]}>{message}</Text>
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
  message: {
    marginTop: 20,
    textAlign: 'center',
  },
});
