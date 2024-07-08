import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addJournalEntry } from '../services/api';

export default function AddEntryScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

  const handleAddEntry = async () => {
    const success = await addJournalEntry({ title, content, category, date: new Date() });
    if (success) {
      navigation.navigate('Home');
    } else {
      alert('Failed to add entry');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add Journal Entry</Text>
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
      <Button title="Add" onPress={handleAddEntry} />
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
