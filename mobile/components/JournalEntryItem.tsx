import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Button,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView, ExperimentalBlurMethod } from "expo-blur";

export default function JournalEntryItem({
  entry,
  onPressEdit,
  onPressDelete,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>
            {new Date(entry.date).toLocaleDateString()}
          </Text>
          <Text style={styles.time}>
            {new Date(entry.date).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.tt}>
          <Text style={styles.title}>{entry.title}</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name="pencil"
              size={24}
              color="black"
              onPress={() => {
                closeModal();
                onPressEdit(entry);
              }}
              style={{
                borderColor: "#808080",
                borderRadius: 5,
                padding: 4,
                borderWidth: 1,
                margin: 2,
              }}
            />
            <Ionicons
              name="trash"
              size={24}
              color="red"
              onPress={() => {
                closeModal();
                onPressDelete(entry.id);
              }}
              style={{
                borderRadius: 5,
                padding: 4,
                borderWidth: 1,
                borderColor: "#ff0000",
                margin: 2,
              }}
            />
          </View>
        </View>
        {entry.photo && (
          <Image
            source={{ uri: entry.photo }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <Text style={styles.category}>Category: {entry.category}</Text>
        <Text style={styles.content}>{entry.content}</Text>
      </View>
      {/* Modal with Blur Background */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <BlurView
          intensity={10}
          style={styles.blurContainer}
          experimentalBlurMethod={"dimezisBlurView"}
        >
          <View style={styles.card}>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.date}>
                {new Date(entry.date).toLocaleDateString()}
              </Text>
              <Text style={styles.time}>
                {new Date(entry.date).toLocaleTimeString()}
              </Text>
            </View>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.category}>Category: {entry.category}</Text>
            <Text style={styles.content}>{entry.content}</Text>

            <Button title="Close" onPress={closeModal} />
          </View>
        </BlurView>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    marginTop: 8,
    fontSize: 16,
  },
  category: {
    marginTop: 8,
    fontStyle: "italic",
    color: "#888",
  },
  dateTimeContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#888",
    fontSize: 14,
  },
  time: {
    color: "#888",
    fontSize: 14,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: To darken the background
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 4,
  },
  tt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
