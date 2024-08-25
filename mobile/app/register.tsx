import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { register } from "../services/api";
import { Redirect, router } from "expo-router";
import { ActivityIndicator, MD2Colors, Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const success = await register(username, password);
    if (success) {
      setLoading(true);
      setMessage("Registration successful! Redirecting to login...");
      setIsSuccess(true);
      setTimeout(() => {
        return <Redirect href="/signin" />;
      }, 2000);
    } else {
      setMessage("Registration failed. Please try again.");
      setIsSuccess(false);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" animated />
      {loading && (
        <ActivityIndicator animating={true} color={MD2Colors.red500} />
      )}
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        blurOnSubmit={true}
      />
      <View style={styles.button}>
        <Button
          mode="contained-tonal"
          loading={loading} // Show loading indicator in the button
          disabled={loading} // Disable the button while loading
          icon="plus"
          onPress={handleRegister}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Button
          mode="contained"
          icon="login" // Adding an icon to the button
          onPress={() => router.push("/signin")}
        >
          Login
        </Button>
      </View>
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
    paddingHorizontal: 8,
  },
  button: {
    gap: 4,
  },
  message: {
    marginTop: 20,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
