import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen.tsx';
import HomeScreen from './src/screens/HomeScreen.tsx';
import RegisterPersonScreen from './src/screens/RegisterPersonScreen.tsx';
import PersonDetailScreen from './src/screens/PersonDetailScreen.tsx';
import AdminDashboard from './src/screens/AdminDashboard.tsx';
import CreateAdminScreen from './src/screens/CreateAdminScreen.tsx';
const { Platform } = require('react-native');

const Stack = createStackNavigator();
// Theme and helpers shared across the app
export const colors = {
    primary: '#003C71',
    primaryDark: '#001F3F',
    background: '#000000',
    surface: '#0F172A',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    success: '#00cc66',
    white: '#FFFFFF',
    whiteSoft: '#F5F7FA',
    border: '#1E293B',
};

// Helper to pick a sensible API base URL depending on platform.
// src/services/api.ts can import { getApiBaseUrl } from this file.

export function getApiBaseUrl() {
    if (Platform.OS === 'android') {
        // Android emulator
        return 'http://10.0.2.2:8000';
    }
    if (Platform.OS === 'web') {
        // Web
        return 'http://localhost:8000';
    }
    // iOS simulator or physical device:
    // Replace with your machine IP when using a physical device, e.g. http://192.168.1.100:8000
    return 'http://localhost:8000';
}

// Navigation theme compatible with @react-navigation/native
export const navigationTheme = {
    dark: true,
    colors: {
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.success,
    },
};
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RegisterPerson" component={RegisterPersonScreen} />
            <Stack.Screen name="PersonDetail" component={PersonDetailScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="CreateAdmin" component={CreateAdminScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}