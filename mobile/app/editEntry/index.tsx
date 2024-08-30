import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { updateJournalEntry} from "@/services/api";
import { Button, Snackbar } from 'react-native-paper';

export default function EditEntryScreen() {
  const router = useRouter();
  const { entry } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

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
      setVisible(true);
      setTimeout(() => {
        setVisible(false)
        router.push("/");
      }, 2000);
      
    } else {
      alert("Failed to update entry");
    }
  };

  const handleDeletePhoto = () => {
    Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => setPhoto(null), style: "destructive" },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      
      <Stack.Screen
        options={{
          title: "Edit Entry",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          value={content}
          onChangeText={setContent}
          placeholder="Write your journal entry"
          multiline
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />

        <Text style={styles.label}>Photo</Text>
        {photo ? (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <View style={styles.photoActions}>
              <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
                <Feather name="edit-2" size={24} color="#4A90E2" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeletePhoto}
                style={styles.photoButton}
              >
                <Feather name="trash-2" size={24} color="#E25C5C" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
            <Feather name="camera" size={24} color="#4A90E2" />
            <Text style={styles.addPhotoText}>
              Add Photo {photo ? "✓" : "(Optional)"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleUpdateEntry}
        >
          <Text style={styles.submitButtonText}>Update Entry</Text>
        </TouchableOpacity>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        action={{
          label: 'Home',
          onPress: () => {
            router.push('/');
          },
        }}>
        Entry updated successfully!
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
  },
  photoContainer: {
    marginBottom: 20,
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  photoButton: {
    padding: 8,
    marginLeft: 16,
  },
  addPhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addPhotoText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4A90E2",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
