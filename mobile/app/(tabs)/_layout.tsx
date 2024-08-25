import { Text } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import Ionicons from "react-native-vector-icons/Ionicons";

import { useSession } from '@/lib/ctx';

export default function TabLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/signin" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs 
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = "";

        if (route.name === "index") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home',  }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
}