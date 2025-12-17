import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSession } from "@/lib/ctx";
import { ActivityIndicator, MD2Colors, Button, TextInput } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { FadeInDown, FadeInUp } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasRedirected = useRef(false);

  const { signIn, message, isSuccess } = useSession();

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) return
    setIsSubmitting(true);
    await signIn(username, password);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isSuccess && !hasRedirected.current) {
      hasRedirected.current = true; // Set flag to true after redirect
      router.push('/');
    }
  }, [isSuccess]); // Redirect when isSuccess changes
  // if (isSuccess) {
  //   router.push("/");
  // }

  return (
    // <View style={styles.container}>
    //   <StatusBar style="dark" animated />
    //   {loading && (
    //     <ActivityIndicator animating={true} color={MD2Colors.red500} />
    //   )}
    //   <Text style={styles.title}>Login</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Username"
    //     value={username}
    //     onChangeText={setUsername}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />
    //   <View style={styles.button}>
    //     <Button
    //       mode="contained"
    //       icon="login" // Adding an icon to the button
    //       onPress={handleLogin}
    //       loading={loading} // Show loading indicator in the button
    //       disabled={loading} // Disable the button while loading
    //       style={loading ? styles.loadingButton : styles.buttonNormal}
    //       labelStyle={styles.buttonText}
    //     >
    //       {loading ? "Logging in..." : "Login"}{" "}
    //       {/* Change button text based on loading state */}
    //     </Button>
    //   </View>
    //   <Button
    //     mode="contained-tonal"
    //     icon="plus"
    //     onPress={() => router.push("/(auth)/sign-up")}
    //   >
    //     {" "}
    //     Register{" "}
    //   </Button>
    //   <Text style={[styles.message, { color: isSuccess ? "green" : "red" }]}>
    //     {message}
    //   </Text>
    // </View>
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={["rgba(249, 115, 22, 0.15)", "transparent"]}
        className="absolute top-0 left-0 right-0 h-96"
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-6 pt-20 pb-8">
            {/* Logo & Header */}
            <Animated.View entering={FadeInDown.delay(100).springify()} className="items-center mb-12">
              <View className="w-20 h-20 rounded-3xl bg-primary/20 items-center justify-center mb-6">
                <Ionicons name="journal" size={40} color="#f97316" />
              </View>
              <Text className="text-4xl font-bold text-foreground tracking-tight">Chronicle</Text>
              <Text className="text-muted-foreground text-lg mt-2">Your thoughts, beautifully captured</Text>
            </Animated.View>

            {/* Form */}
            <Animated.View entering={FadeInUp.delay(200).springify()} className="space-y-5">
              {message ? (
                <View className="bg-destructive/20 border border-destructive/30 rounded-2xl p-4">
                  <Text className="text-destructive text-center">{message}</Text>
                </View>
              ) : null}

             
              <View className="space-y-2">
                <TextInput
                  disabled={isSubmitting}
                  value={username}
                  onChangeText={setUsername}
                  left={<TextInput.Icon icon="account-outline" color="#737373" />}
                  autoCapitalize="none"

                />
              </View>

              
              <View className="space-y-2">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  disabled={isSubmitting}
                  secureTextEntry={!showPassword}
                  left={<TextInput.Icon icon="lock" color="#737373" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-outline" : "eye-off-outline"}
                      color="#737373"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              </View>

              <TouchableOpacity
                className={`mt-6 rounded-2xl overflow-hidden ${isSubmitting ? "opacity-70" : ""}`}
                onPress={handleLogin}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#f97316", "#ea580c"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 items-center"
                >
                  <Text className="text-white font-semibold text-lg">{isSubmitting ? "Signing in..." : "Sign In"}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center mt-8">
                <Text className="text-muted-foreground">Don't have an account? </Text>
                <Link href="/sign-up" asChild>
                  <TouchableOpacity>
                    <Text className="text-primary font-semibold">Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </Animated.View>

            {/* Bottom decoration */}
            <View className="flex-1 justify-end items-center mt-12">
              <View className="flex-row items-center space-x-2">
                <View className="w-2 h-2 rounded-full bg-primary/40" />
                <View className="w-2 h-2 rounded-full bg-primary/60" />
                <View className="w-2 h-2 rounded-full bg-primary" />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  buttonNormal: {
    backgroundColor: "#1e90ff", // Normal background color
  },
  loadingButton: {
    backgroundColor: "#6495ed", // Background color during loading state
  },
  buttonText: {
    color: "#FFF", // Text color to ensure it is visible against the button's background
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