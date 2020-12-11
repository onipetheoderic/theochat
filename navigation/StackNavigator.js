import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from '../src/screens/ChatListScreen';
import OptionScreen from '../src/screens/OptionScreen';
import ContactListScreen from '../src/screens/ContactListScreen';
import ChatScreen from '../src/screens/ChatScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
       <Stack.Screen name="OptionScreen" component={OptionScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ContactListScreen" component={ContactListScreen} />     
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
    </Stack.Navigator>
  );
}


