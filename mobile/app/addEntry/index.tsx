import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
// import { useNavigation } from '@react-navigation/native';
import { addJournalEntry } from "@/services/api";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';

export default function AddEntryScreen({route}) {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [category, setCategory] = useState("");
  // const [photo, setPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState(route?.params?.entry?.title || '');
  const [content, setContent] = useState(route?.params?.entry?.content || '');
  const [category, setCategory] = useState(route?.params?.entry?.category || '');
  const [photo, setPhoto] = useState(route?.params?.entry?.photo || null);

  const compressImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // Resize the image to a width of 800 pixels
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress with 70% quality
    );
    return manipResult.uri;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      setPhoto(compressedUri);
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
