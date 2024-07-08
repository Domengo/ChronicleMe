import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getJournalEntries } from '../services/api';
import JournalEntryItem from '../components/JournalEntryItem';

export default function HomeScreen() {
  const [entries, setEntries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const data = await getJournalEntries();
    setEntries(data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JournalEntryItem entry={item} onPress={() => navigation.navigate('EditEntry', { entry: item })} />
        )}
      />
      <Button title="Add Entry" onPress={() => navigation.navigate('AddEntry')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
