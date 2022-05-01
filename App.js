// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './Screens/Home';
import colorAdjustmentPage from './Screens/ColorAdjustment';
import SettingPage from './Screens/Setting';
import WiFiPage from './Screens/WIFI';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomePage} 
      />
      <Tab.Screen
        name="Color"
        component={colorAdjustmentPage}
      />
      <Tab.Screen
        name="Setting"
        component={SettingPage} 
      />      
    </Tab.Navigator>
  );
}
export default function TabNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={App} option={{headerShown:false}} />
        <Stack.Screen name="WIFI" component={WiFiPage} option={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
