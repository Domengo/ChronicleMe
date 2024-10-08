import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/api";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      setMessage("Login successful!");
      setIsSuccess(true);
      setTimeout(() => {
        navigation.navigate("Main");
      }, 500);
    } else {
      setMessage("Login failed. Please check your credentials.");
      setIsSuccess(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Text style={[styles.message, { color: isSuccess ? 'green' : 'red' }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  button: {
    marginBottom: 4,
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
  }
});
