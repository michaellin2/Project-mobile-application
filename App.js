// App.js
import React from "react";
import { StyleSheet, Image } from "react-native";
//import and install the libraries for different navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import every pages
import HomePage from "./Screens/Home";
import ColorAdjustmentPage from "./Screens/ColorAdjustment";
import SettingPage from "./Screens/Setting";
import WiFiPage from "./Screens/WIFI";
import AddDevicePage from "./Screens/AddDevice";
//import different images
import homeIcon from "./assets/home.png";
import settingIcon from "./assets/setting.png";

//declare variable for stack navigation and bottom navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//stylesheet
const styles = StyleSheet.create({
  imageIcon: {
    height: 27,
    width: 27,
  },
});

function App() {
  return (
    //create tab navigator with customised icon
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          tabBarIcon: () => (
            <Image style={styles.imageIcon} source={homeIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingPage}
        options={{
          tabBarIcon: () => (
            <Image style={styles.imageIcon} source={settingIcon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
//export to mobile app
export default function TabNav() {
  return (
    //create stack navigation container and declare all the pages which enables to user to navigate to any of the pages
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={App}
          option={{ headerShown: false }}
        />
        <Stack.Screen
          name="Color"
          component={ColorAdjustmentPage}
          option={{ headerShown: false }}
        />
        <Stack.Screen
          name="WIFI"
          component={WiFiPage}
          option={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddDevice"
          component={AddDevicePage}
          option={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
