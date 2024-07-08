import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateJournalEntry, deleteJournalEntry } from '../services/api';

export default function EditEntryScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { entry } = route.params;
  
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);
  const [category, setCategory] = useState(entry.category);

  const handleUpdateEntry = async () => {
    const success = await updateJournalEntry(entry.id, { title, content, category, date: new Date() });
    if (success) {
      navigation.navigate('Home');
    } else {
      alert('Failed to update entry');
    }
  };

  const handleDeleteEntry = async () => {
    const success = await deleteJournalEntry(entry.id);
    if (success) {
      navigation.navigate('Home');
    } else {
      alert('Failed to delete entry');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Journal Entry</Text>
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
      <Button title="Update" onPress={handleUpdateEntry} />
      <Button title="Delete" onPress={handleDeleteEntry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
