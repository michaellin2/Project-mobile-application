// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePage from './Screens/Home';
import colorAdjustmentPage from './Screens/ColorAdjustment';
import SettingPage from './Screens/Setting';
import WiFiPage from './Screens/WIFI';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="Home"
        component={HomePage} 
      />
      <Drawer.Screen
        name="Color"
        component={colorAdjustmentPage}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingPage} 
      />
      <Drawer.Screen
        name="WIFI"
        component={WiFiPage} 
      />
      
    </Drawer.Navigator>
  );
}
export default function drawerNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Setting"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={App} option={{headerShown:false}} />
        <Stack.Screen name="Color" component={colorAdjustmentPage} option={{headerShown:false}} />
        <Stack.Screen name="Setting" component={SettingPage} option={{headerShown:false}} />
        <Stack.Screen name="WIFI" component={WiFiPage} option={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
