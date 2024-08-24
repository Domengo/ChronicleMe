import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateJournalEntry, deleteJournalEntry } from "@/services/api";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

export default function EditEntryScreen() {
  const route = useRoute();
  //   const navigation = useNavigation();
  // const { entry } = route.params;
  const { entry } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (entry) {
      const parsedEntry = JSON.parse(entry); // If you passed it as a string
      setTitle(parsedEntry.title);
      setContent(parsedEntry.content);
      setCategory(parsedEntry.category);
    }
  }, [entry]);

  const handleUpdateEntry = async () => {
    const parsedEntry = JSON.parse(entry); // If you passed it as a string
    const success = await updateJournalEntry(parsedEntry.id, {
      title,
      content,
      category,
      date: new Date(),
    });
    if (success) {
      router.push("/");
    } else {
      alert("Failed to update entry");
    }
  };

  const handleDeleteEntry = async () => {
    const parsedEntry = JSON.parse(entry); // If you passed it as a string
    const success = await deleteJournalEntry(parsedEntry.id);
    if (success) {
      router.navigate("/");
    } else {
      alert("Failed to delete entry");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Edit Entry",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text
        style={{
          marginBottom: 4,
        }}
      >
        Edit Journal Entry
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <View
        style={{
          gap: 4,
        }}
      >
        <Button
          mode="contained"
          buttonColor="blue"
          rippleColor={"#000088"}
          icon="update"
          onPress={handleUpdateEntry}
          textColor="#fefefe"
        >
          Update
        </Button>
        <Button
          textColor="#fefefe"
          mode="contained"
          buttonColor="blue"
          rippleColor={"#000088"}
          icon="delete-empty"
          onPress={handleDeleteEntry}
        >
          Delete
        </Button>
      </View>
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
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
