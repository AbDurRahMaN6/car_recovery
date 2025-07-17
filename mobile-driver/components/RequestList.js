import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from '../api/axios';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/requests')
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching requests:', err.message);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.customer_name}</Text>
      <Text style={styles.text}>📍 {item.location}</Text>
      <Text style={styles.text}>📝 {item.note}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default RequestList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    marginBottom: 2,
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
});
