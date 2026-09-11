import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <Stack
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="game" options={{ title: 'Game' }} />
        <Stack.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      </Stack>
    </>
  );
}
