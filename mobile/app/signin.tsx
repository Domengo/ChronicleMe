import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/api";
import { useSession } from "@/lib/ctx";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Avatar } from 'react-native-paper';
import { router } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  // const [isSuccess, setIsSuccess] = useState(false);

  const { signIn, message, isSuccess } = useSession();

  const navigation = useNavigation();

  const handleLogin = async () => {
    await signIn(username, password);
    if (isSuccess) {
      setTimeout(() => {
        // navigation.navigate("home");
        router.push('/home')
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
        <Avatar.Icon size={48} color={MD2Colors.red800} icon="camera" />
        <ActivityIndicator animating={true} color={MD2Colors.red500} />
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
        onPress={() => router.push('/register')}
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
