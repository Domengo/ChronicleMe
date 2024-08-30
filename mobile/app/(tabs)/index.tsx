import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  lazy,
} from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getJournalEntries, deleteJournalEntry } from "@/services/api";
import JournalEntryItem from "@/components/JournalEntryItem2";
import { RobotoSerif_500Medium_Italic, useFonts } from "@expo-google-fonts/dev";
import * as SplashScreen from "expo-splash-screen";
import { useSession } from "@/lib/ctx";
import { FAB, Menu, IconButton, Button, Avatar } from "react-native-paper";
import { useRouter, useNavigation, Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
// import {WebView} from 'react-native-webview'

import { Snackbar } from "react-native-paper";

// Define the Entry interface
interface Entry {
  id: number;
  title: string;
  content: string;
  date: string; // Ensure it's a string if it's an ISO date
}

export default function HomeScreen() {
  const [entries, setEntries] = useState<Entry[]>([]); // Use the Entry interface
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState<Date | null>(null); // Explicitly typed
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const [loaded, error] = useFonts({
    RobotoSerif_500Medium_Italic,
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const { signOut } = useSession();
  const router = useRouter();

  const fetchEntries = async () => {
    try {
      const data = await getJournalEntries();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  // Filter and sort entries whenever entries, date, or sortOrder changes
  useEffect(() => {
    let updatedEntries = [...entries];

    // Filter by date if a date is selected
    if (date) {
      updatedEntries = updatedEntries.filter((entry) =>
        moment(entry.date).isSame(moment(date), "day")
      );
    }

    // Sort entries based on sortOrder
    updatedEntries.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredEntries(updatedEntries);
  }, [entries, date, sortOrder]);

  // Handler for date selection
  const onDateChange = (event: any, selectedDate?: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const clearDateFilter = () => {
    setDate(null);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchEntries();
    }, [])
  );

  const handleAddEntry = () => {
    router.push({
      pathname: "/addEntry",
      params: {
        refresh: fetchEntries.toString(), // Convert refresh callback to a string
      },
    });
  };

  const handleEditEntry = (entry: Entry) => {
    // Use the Entry interface here
    router.push({
      pathname: "/editEntry",
      params: {
        entry: JSON.stringify(entry),
        refresh: fetchEntries.toString(),
      },
    });
  };

  const handleDeleteEntry = async (id: number) => {
    // Use number for ID
    try {
      const success = await deleteJournalEntry(id.toString()); // Ensure ID is a string if necessary
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEntries().finally(() => setRefreshing(false));
  }, []);

  const navigation = useNavigation();
  const openProfileMenu = () => setProfileMenuVisible(true);
  const closeProfileMenu = () => setProfileMenuVisible(false);

  const navigateToProfile = () => {
    closeProfileMenu();
    router.push("/profile" as Href<string>);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          statusBarHeight={48}
          visible={profileMenuVisible}
          onDismiss={closeProfileMenu}
          anchor={
            <IconButton
              icon={() => (
                <Avatar.Image
                  size={40}
                  source={{
                    uri: "https://via.placeholder.com/150",
                  }}
                />
              )}
              onPress={openProfileMenu}
            />
          }
          anchorPosition="bottom"
          mode="elevated"
          contentStyle={{
            backgroundColor: "#dcdcdc",
          }}
        >
          <Menu.Item
            titleStyle={styles.menuItemText}
            leadingIcon="account"
            onPress={navigateToProfile}
            title="Profile"
          />
          <Menu.Item
            titleStyle={styles.menuItemText}
            leadingIcon="logout"
            onPress={signOut}
            title="Sign Out"
          />
        </Menu>
      ),
    });
  }, [navigation, profileMenuVisible]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}
      <StatusBar
        style={Platform.OS === "ios" ? "light" : "dark"}
        animated
        translucent
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "RETRY",
          onPress: fetchEntries, // Retry fetching entries
        }}
      >
        Error fetching entries. Please check your connection.
      </Snackbar>
      {/* Date Picker and Sort Filter Section */}
      <View style={styles.filterContainer}>
        {/* Date Picker */}
        <View style={styles.datePickerContainer}>
          <Button
            buttonColor="blue"
            background={{
              color: "#00008b",
              borderless: true,
            }}
            // rippleColor="#00008b"
            // textColor="#dc143c"
            mode="outlined"
            icon="calendar"
            onPress={() => setShowDatePicker(true)}
          >
            {date ? moment(date).format("MMMM Do, YYYY") : "Select Date"}
          </Button>
          {date && (
            <IconButton
              icon="close-circle"
              size={20}
              onPress={clearDateFilter}
              style={styles.clearDateButton}
            />
          )}
        </View>

        {/* Sort Menu */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              textColor="#483d8b"
              background={{
                color: "#483d8b",
                borderless: true,
              }}
              icon={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
              onPress={() => setMenuVisible(true)}
            >
              Sort
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSortOrder("asc");
              setMenuVisible(false);
            }}
            title="Ascending"
            leadingIcon="arrow-up"
          />
          <Menu.Item
            onPress={() => {
              setSortOrder("desc");
              setMenuVisible(false);
            }}
            title="Descending"
            leadingIcon="arrow-down"
          />
        </Menu>
      </View>

      {/* DateTimePicker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <FlatList
        data={filteredEntries}
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No entries found</Text>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      />
      <FAB
        label="Add Entry"
        icon="plus"
        style={styles.fab}
        onPress={handleAddEntry}
        color="#ffd700"
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearDateButton: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  menuItemText: {
    color: "#000000", // Text color for menu items
  },
});
