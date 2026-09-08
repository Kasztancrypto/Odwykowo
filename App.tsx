import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/context/AppContext';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeAvatarScreen from './src/screens/HomeAvatarScreen';
import SOSScreen from './src/screens/SOSScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import HealthTimelineScreen from './src/screens/HealthTimelineScreen';
import PiggyBankScreen from './src/screens/PiggyBankScreen';
import PunishmentScreen from './src/screens/PunishmentScreen';
import MotivationScreen from './src/screens/MotivationScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();
const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.surfaceLight,
    primary: colors.primary,
    text: colors.textPrimary,
  },
};

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Awatar: 'leaf',
  SOS: 'alert-circle',
  Kalendarz: 'calendar',
  Zdrowie: 'pulse',
  Skarbonka: 'wallet',
  Kary: 'sync-circle',
  Kartki: 'sparkles',
  Ustawienia: 'settings',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.surfaceLight,
        },
        tabBarLabelStyle: {
          fontSize: 8,
        },
        tabBarItemStyle: {
          paddingHorizontal: 0,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} color={color} size={size - 2} />
        ),
      })}
    >
      <Tab.Screen name="Awatar" component={HomeAvatarScreen} />
      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{ tabBarActiveTintColor: colors.red }}
      />
      <Tab.Screen name="Kalendarz" component={CalendarScreen} />
      <Tab.Screen name="Zdrowie" component={HealthTimelineScreen} />
      <Tab.Screen name="Skarbonka" component={PiggyBankScreen} />
      <Tab.Screen name="Kary" component={PunishmentScreen} />
      <Tab.Screen name="Kartki" component={MotivationScreen} />
      <Tab.Screen name="Ustawienia" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function Root() {
  const { data, loading, completeOnboarding } = useApp();

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  if (!data.hasSeenOnboarding) {
    return <OnboardingScreen onDone={completeOnboarding} />;
  }

  return <MainTabs />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Root />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
