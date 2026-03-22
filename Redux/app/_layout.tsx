// app/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        headerShown: false
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'ตะกร้าสินค้า',
            tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="todo"
          options={{
            title: 'To-Do List',
            tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />
          }}
        />
      </Tabs>
    </Provider>
  );
}