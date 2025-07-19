import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RequestList from '../../components/RequestList';
import LoginScreen from '../../login/index';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.logo}>Towing App</Text>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  {isLoggedIn ? (
    <Stack.Screen name="RequestList">
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

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFDA43', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
});
