import React from 'react';
import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index" // Corresponds to app/index.tsx
        options={{
          title: 'Mi Lista de Tareas',
          headerStyle: {
            backgroundColor: '#8a2be2', // Violet header
          },
          headerTintColor: '#fff', // White text
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="calendar" // Corresponds to app/calendar.tsx
        options={{
          title: 'Calendario',
          headerStyle: {
            backgroundColor: '#8a2be2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="deleted" // Corresponds to app/deleted.tsx
        options={{
          title: 'Tareas Eliminadas',
          headerStyle: {
            backgroundColor: '#8a2be2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
};

export default StackLayout;