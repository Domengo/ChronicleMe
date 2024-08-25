import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
// import { useNavigation } from '@react-navigation/native';
import { addJournalEntry } from "@/services/api";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function AddEntryScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const router = useRouter();

  const handleAddEntry = async () => {
    try {
      const newEntry = {
        title,
        content,
        category,
        date: new Date(),
        photo,
      };
      const success = await addJournalEntry(newEntry);
      if (success) {
        router.navigate("/");
      } else {
        alert("Failed to add entry");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      alert("An error occurred while saving the entry.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Add Entry",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text>Add Journal Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
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
      <Button title="Pick a Photo" onPress={pickImage} />
      {photo && (
        <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
      )}
      {/* <Button title="Save" onPress={handleSave} /> */}
      <Button title="Add" onPress={handleAddEntry} />
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
});
