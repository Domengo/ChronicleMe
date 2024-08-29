import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function JournalEntryItem({
  entry,
  onPressEdit,
  onPressDelete,
}) {

  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: entry.photo }} style={styles.photo} /> */}
      {entry.photo && (
          <Image
            source={{ uri: entry.photo }}
            style={styles.photo}
            // resizeMode="cover"
          />
        )}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.category}>{entry.category}</Text>
          {/* <Text style={styles.date}>{entry.date}</Text> */}
          <Text style={styles.date}>
            {new Date(entry.date).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.title}>{entry.title}</Text>
        {/* <Text style={styles.time}>{entry.time}</Text> */}
        <Text style={styles.time}>
            {new Date(entry.date).toLocaleTimeString()}
          </Text>
        <Text numberOfLines={3} style={styles.content}>
          {entry.content}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {
                // closeModal();
                onPressEdit(entry);
              }} style={styles.iconButton}>
            <Icon name="edit-2" size={20} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
                // closeModal();
                onPressDelete(entry.id);
              }} style={styles.iconButton}>
            <Icon name="trash-2" size={20} color="#E25C5C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: 200,
    // resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  category: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconButton: {
    padding: 8,
    marginLeft: 12,
  },
});
