import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { AppProvider } from '../contexts/AppContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AppProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="welcome" options={{ animation: 'none' }} />
            <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
            <Stack.Screen name="self-buy" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="help-buy" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="calculator" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
          </Stack>
        </AppProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
