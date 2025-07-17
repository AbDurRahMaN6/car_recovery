import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import RequestList from './components/RequestList';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <RequestList />
    </SafeAreaView>
  );
}
