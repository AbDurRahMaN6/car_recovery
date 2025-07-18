import { SafeAreaView, StatusBar } from 'react-native';
import RequestList from '../../components/RequestList';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../login/index';
const Stack = createNativeStackNavigator();

export default function HomeScreen() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Request">
            {(props) => <RequestList />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
