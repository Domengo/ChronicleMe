// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { updateProfile } from '@/services/api';

// export default function SettingsScreen() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [success, setSuccess] = useState(true);

//   const handleUpdate = async () => {
//     const success = await updateProfile(username, password);
//     if (success) {
//         setMessage('Profile updated successfully!');
//         setSuccess(true);
//     } else {
//         setMessage('Update failed. Please try again.');
//         setSuccess(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Update Profile</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="New Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="New Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Update" onPress={handleUpdate} />
//       {message && (
//         <Text style={[styles.message, { color: success ? "green" : "red" }]}>
//           {message}
//         </Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   message: {
//     marginTop: 20,
//     textAlign: "center",
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Avatar, IconButton, Button } from "react-native-paper";
import { updateProfile } from "@/services/api";

export default function ProfileScreen() {
  const [username, setUsername] = useState("John Doe"); // Example username
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [success, setSuccess] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    const success = await updateProfile(
      username,
      password,
      email,
      phone,
      country,
      firstName,
      lastName
    );
    if (success) {
      setMessage("Profile updated successfully!");
      setSuccess(true);
      setIsEditing(false);
    } else {
      setMessage("Update failed. Please try again.");
      setSuccess(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPassword(""); // Optionally reset the password field
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{ uri: "https://via.placeholder.com/150" }} // Placeholder image URL
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{username}</Text>
          <IconButton
            icon="pencil"
            size={20}
            onPress={handleEdit}
            style={styles.editIcon}
          />
        </View>
      </View>

      {isEditing ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleUpdate}
              style={styles.updateButton}
            >
              Update Profile
            </Button>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>john.doe@example.com</Text>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>+1 (555) 555-5555</Text>
        </View>
      )}

      {message && (
        <Text style={[styles.message, { color: success ? "green" : "red" }]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  editIcon: {
    marginTop: 5,
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateButton: {
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
  },
  detailsContainer: {
    marginTop: 24,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  message: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
});
