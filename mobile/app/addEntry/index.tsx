import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import {Snackbar} from "react-native-paper";
import { addJournalEntry } from "@/services/api";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function AddEntryScreen({ route }) {
  const [title, setTitle] = useState(route?.params?.entry?.title || "");
  const [content, setContent] = useState(route?.params?.entry?.content || "");
  const [category, setCategory] = useState(
    route?.params?.entry?.category || ""
  );
  const [photo, setPhoto] = useState(route?.params?.entry?.photo || null);
  // const [failedEntry, setFailedEntry] = useState(null); // Store the failed entry
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

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

  const handleSubmit = async () => {
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
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          router.navigate("/");
        }, 2000);
         // Navigate back to the hom;

        // Snackbar.show({
        //   text: "Entry added successfully!",
        //   // duration: Snackbar.LENGTH_SHORT,
        //   backgroundColor: "#4CAF50",
        // });
      } else {
        // Snackbar.show({
        //   text: "Failed to add entry. Please try again.",
        //   // duration: Snackbar.LENGTH_INDEFINITE,
        //   backgroundColor: "#F44336",
        //   action: {
        //     text: "RELOAD",
        //     textColor: "green",
        //     onPress: () => {
        //       /* Do something. */
        //     },
        //   },
        // });
        alert("Failed to add entry");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      // Snackbar.show({
      //   text: "An error occurred while saving the entry. Please try again.",
      //   // duration: Snackbar.LENGTH_INDEFINITE,
      //   backgroundColor: "#F44336",
      //   action: {
      //     text: "RELOAD",
      //     textColor: "green",
      //     onPress: () => {
      //       /* Do something. */
      //     },
      //   },
      // });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: "Add Entry",
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

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Icon name="camera" size={24} color="#4A90E2" />
          <Text style={styles.photoText}>
            Add Photo {photo ? "✓" : "(Optional)"}
          </Text>
        </TouchableOpacity>
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Entry</Text>
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
        Entry added successfully!
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
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  photoText: {
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
