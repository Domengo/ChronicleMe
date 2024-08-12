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
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "settings" : "settings-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabel: ({ focused }) => {
        let label;

        if (route.name === 'home') {
          label = focused ? 'Home' : 'Home';
        } else if (route.name === 'settings') {
          label = focused ? 'Settings' : 'Settings';
        }

        return <Text style={{ color: focused ? '#673ab7' : '#222' }}>{label}</Text>;
      },
      // tabBarActiveTintColor: "tomato",
      // tabBarInactiveTintColor: "gray",
      tabBarActiveTintColor: '#673ab7',
        tabBarInactiveTintColor: '#222',
        tabBarActiveBackgroundColor: 'red'
    })}>
      <Tabs.Screen
        name="(tabs)/home"
        options={{ headerTitle: 'Home' }}
      />
      <Tabs.Screen
        name="(tabs)/settings"
        options={{ headerTitle: 'Settings' }}
      />
    </Tabs>
  );
}
