import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSession } from "@/lib/ctx";
import { ActivityIndicator, MD2Colors, Button } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const hasRedirected = useRef(false);

  const { signIn, message, isSuccess } = useSession();

  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    await signIn(username, password);
    setLoading(false);
  };

  // useEffect(() => {
  //   if (isSuccess && !hasRedirected.current) {
  //     hasRedirected.current = true; // Set flag to true after redirect
  //     router.push('/home');
  //   }
  // }, [isSuccess]); // Redirect when isSuccess changes
  if (isSuccess) {
    router.push("/home");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" animated />
      {loading && (
        <ActivityIndicator animating={true} color={MD2Colors.red500} />
      )}
      <Text style={styles.title}>Login</Text>
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
        <Button
          mode="contained"
          icon="login" // Adding an icon to the button
          onPress={handleLogin}
          loading={loading} // Show loading indicator in the button
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Logging in..." : "Login"}{" "}
          {/* Change button text based on loading state */}
        </Button>
      </View>
      <Button
        mode="contained-tonal"
        icon="plus"
        onPress={() => router.push("/register")}
      >
        {" "}
        Register{" "}
      </Button>
      <Text style={[styles.message, { color: isSuccess ? "green" : "red" }]}>
        {message}
      </Text>
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
    textAlign: "center",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
