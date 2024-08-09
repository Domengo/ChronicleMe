import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getJournalEntries } from '../services/api';
import JournalEntryItem from '../components/JournalEntryItem';

export default function HomeScreen() {
  const [entries, setEntries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchEntries();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchEntries();
    }, 2000);
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
