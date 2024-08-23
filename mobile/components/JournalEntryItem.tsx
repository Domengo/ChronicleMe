import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function JournalEntryItem({ entry, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>{new Date(entry.date).toLocaleDateString()}</Text>
          <Text style={styles.time}>{new Date(entry.date).toLocaleTimeString()}</Text>
        </View>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.category}>Category: {entry.category}</Text>
        <Text style={styles.content}>{entry.content}</Text>
        
        
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,  // For shadow on Android
    shadowColor: '#000',  // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    fontSize: 16,
  },
  category: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#888',
  },
  dateTimeContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#888',
    fontSize: 14,
  },
  time: {
    color: '#888',
    fontSize: 14,
  },
});
