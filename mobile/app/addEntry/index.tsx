// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
// // import { useNavigation } from '@react-navigation/native';
// import { addJournalEntry } from "@/services/api";
// import { useRouter } from "expo-router";
// import { Stack } from "expo-router";
// import * as ImagePicker from "expo-image-picker";
// import * as ImageManipulator from 'expo-image-manipulator';

// export default function AddEntryScreen({route}) {
//   // const [title, setTitle] = useState("");
//   // const [content, setContent] = useState("");
//   // const [category, setCategory] = useState("");
//   // const [photo, setPhoto] = useState<string | null>(null);
//   const [title, setTitle] = useState(route?.params?.entry?.title || '');
//   const [content, setContent] = useState(route?.params?.entry?.content || '');
//   const [category, setCategory] = useState(route?.params?.entry?.category || '');
//   const [photo, setPhoto] = useState(route?.params?.entry?.photo || null);

//   const compressImage = async (uri) => {
//     const manipResult = await ImageManipulator.manipulateAsync(
//       uri,
//       [{ resize: { width: 800 } }], // Resize the image to a width of 800 pixels
//       { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress with 70% quality
//     );
//     return manipResult.uri;
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const compressedUri = await compressImage(result.assets[0].uri);
//       setPhoto(compressedUri);
//     }
//   };

//   const router = useRouter();

//   const handleAddEntry = async () => {
//     try {
//       const newEntry = {
//         title,
//         content,
//         category,
//         date: new Date(),
//         photo,
//       };

//       const success = await addJournalEntry(newEntry);
//       if (success) {
//         router.navigate("/");
//       } else {
//         alert("Failed to add entry");
//       }
//     } catch (error) {
//       console.error("Error saving entry:", error);
//       alert("An error occurred while saving the entry.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Stack.Screen
//         options={{
//           title: "Add Entry",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//         }}
//       />
//       <Text>Add Journal Entry</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Content"
//         value={content}
//         onChangeText={setContent}
//         multiline
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Category"
//         value={category}
//         onChangeText={setCategory}
//       />
//       <Button title="Pick a Photo" onPress={pickImage} />
//       {photo && (
//         <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
//       )}
//       {/* <Button title="Save" onPress={handleSave} /> */}
//       <Button title="Add" onPress={handleAddEntry} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });
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
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import Snackbar from "react-native-snackbar";
import { addJournalEntry } from "@/services/api";

export default function AddEntryScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [failedEntry, setFailedEntry] = useState(null); // Store the failed entry

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const newEntry = {
        title,
        content,
        category,
        date: new Date(),
        photoAdded,
      };
      const success = await addJournalEntry(newEntry);
      if (success) {
        router.navigate("/"); // Navigate back to the hom;

        Snackbar.show({
          text: "Entry added successfully!",
          // duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "#4CAF50",
        });
      } else {
        Snackbar.show({
          text: "Failed to add entry. Please try again.",
          // duration: Snackbar.LENGTH_INDEFINITE,
          backgroundColor: "#F44336",
          action: {
            text: "RELOAD",
            textColor: "green",
            onPress: () => {
              /* Do something. */
            },
          },
        });
      }

      // Navigate to home screen
      router.navigate("/");
    } catch (error) {
      Snackbar.show({
        text: "An error occurred while saving the entry. Please try again.",
        // duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: "#F44336",
        action: {
          text: "RELOAD",
          textColor: "green",
          onPress: () => {
            /* Do something. */
          },
        },
      });
    }
  };

  const handleAddPhoto = () => {
    // Implement photo selection logic here
    setPhotoAdded(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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

        <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
          <Icon name="camera" size={24} color="#4A90E2" />
          <Text style={styles.photoText}>
            Add Photo {photoAdded ? "✓" : "(Optional)"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Entry</Text>
        </TouchableOpacity>
      </ScrollView>
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
