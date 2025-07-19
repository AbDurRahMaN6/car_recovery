import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, SafeAreaView } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Customer: {item.customerName}</Text>
      <Text style={styles.text}>Contact: {item.customerPhone}</Text>
      <Text style={styles.text}>Vehicle No: {item.vehicleNo}</Text>
      <Text style={styles.text}>Location: {item.location}</Text>
      <Text style={styles.text}>Requested Service: {item.serviceType}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>

      {item.latitude && item.longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} />
        </MapView>
      ) : (
        <Text style={styles.mapError}>Map not available for this request</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No requests found.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFDA43',
  },
  container: {
    padding: 10,
    paddingBottom: 30,
  },
  loader: {
    marginTop: 50,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  mapError: {
    marginTop: 10,
    fontStyle: 'italic',
    color: 'red',
  },
  emptyText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default RequestList;
