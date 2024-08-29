import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateJournalEntry, deleteJournalEntry } from "@/services/api";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function EditEntryScreen() {
  const route = useRoute();
  //   const navigation = useNavigation();
  // const { entry } = route.params;
  const { entry } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (entry) {
      const parsedEntry = JSON.parse(entry); // If you passed it as a string
      setTitle(parsedEntry.title);
      setContent(parsedEntry.content);
      setCategory(parsedEntry.category);
      setPhoto(parsedEntry.photo || null);
    }
  }, [entry]);

  const compressImage = async (uri: string) => {
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

  const handleUpdateEntry = async () => {
    const parsedEntry = JSON.parse(entry); // If you passed it as a string
    const success = await updateJournalEntry(parsedEntry.id, {
      title,
      content,
      category,
      date: new Date(),
      photo,
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
      <Button onPress={pickImage}>
        Pick a Photo
      </Button>
      {photo && (
        <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
      )}
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
