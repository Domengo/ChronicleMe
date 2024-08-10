import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  RefreshControl,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getJournalEntries } from "../services/api";
import JournalEntryItem from "../components/JournalEntryItem";
import { RobotoSerif_500Medium_Italic, useFonts } from "@expo-google-fonts/dev";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [entries, setEntries] = useState([]);
  const [loaded, error] = useFonts({
    RobotoSerif_500Medium_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchEntries();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchEntries();
    }, 2000);
  }, [entries]);

  const fetchEntries = async () => {
    const data = await getJournalEntries();
    setEntries(data);
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "RobotoSerif_500Medium_Italic",
        }}
      >
        Inter Black
      </Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JournalEntryItem
            entry={item}
            onPress={() => navigation.navigate("EditEntry", { entry: item })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Button
        title="Add Entry"
        onPress={() => navigation.navigate("AddEntry")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
