import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function JournalEntryItem({ entry, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Text class="text-red-500">Hello</Text>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.content}>{entry.content}</Text>
        <Text style={styles.category}>{entry.category}</Text>
        <Text style={styles.date}>{new Date(entry.date).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    fontSize: 16,
  },
  category: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  date: {
    marginTop: 8,
    color: '#666',
  },
});