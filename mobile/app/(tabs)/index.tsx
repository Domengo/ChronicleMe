import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
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
import { getJournalEntries } from "@/services/api";
import JournalEntryItem from "@/components/JournalEntryItem";
import { RobotoSerif_500Medium_Italic, useFonts } from "@expo-google-fonts/dev";
import * as SplashScreen from "expo-splash-screen";
import { useSession } from "@/lib/ctx";
import { FAB } from "react-native-paper";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { deleteJournalEntry } from "@/services/api";

// SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [entries, setEntries] = useState([]);
  const [loaded, error] = useFonts({
    RobotoSerif_500Medium_Italic,
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const { signOut } = useSession();
  const router = useRouter();

  const handleAddEntry = () => {
    router.navigate("addEntry");
  };

  const handleEditEntry = (entry) => {
    router.push({
      pathname: "editEntry",
      params: { entry: JSON.stringify(entry) },
    });
  };

  const handleDeleteEntry = async (id) => {
    try {
      const success = await deleteJournalEntry(id);
      if (success) {
        alert("Deleted");
      } else {
        alert("Failed to delete entry");
      }
    } catch (error) {
    } finally {
      fetchEntries(); // Refresh entries after deletion
    }
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchEntries();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchEntries();
    }, 2000);
  }, [entries]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={signOut}
          title="Sign Out"
          color={Platform.OS === "ios" ? "#007AFF" : "#000"}
        />
      ),
    });
  }, [navigation]);

  const fetchEntries = async () => {
    const data = await getJournalEntries();
    setEntries(data);
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
            onPressEdit={handleEditEntry}
            onPressDelete={handleDeleteEntry}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FAB
        label="Add Entry"
        icon="plus"
        style={styles.fab}
        onPress={handleAddEntry}
        color="#ffd700"
        // background="#8a2be2"
        rippleColor="rgba(0, 150, 136, 0.3)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: "#0000ff",
  },
});
