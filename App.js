import React from 'react';
import {StyleSheet,AsyncStorage, } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { AppLoading } from 'expo';
import { CounterContextProvider } from "./store";
import { Root } from "native-base";
import ChatListScreen from './src/screens/ChatListScreen';
import Intercept from './src/screens/Intercept';
import OptionScreen from './src/screens/OptionScreen';
import ContactListScreen from './src/screens/ContactListScreen';
import ChatScreen from './src/screens/ChatScreen';
import ImageUploadPage from './src/screens/ImageUploadPage';



import {
  useFonts,
  Nunito_400Regular,
  Lato_400Regular,
  Inter_900Black,
  Pacifico_400Regular,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Bangers_400Regular,
  Kalam_400Regular,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/dev';

const Stack = createStackNavigator();

function Nav() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intercept" component={Intercept} />
      <Stack.Screen name="OptionScreen" component={OptionScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ContactListScreen" component={ContactListScreen} />     
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
      <Stack.Screen name="ImageUploadPage" component={ImageUploadPage} />
      
    </Stack.Navigator>
  );
}
export default function App(props) {
  

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Lato_400Regular,
    Inter_900Black,
    Pacifico_400Regular,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Bangers_400Regular,
    Kalam_400Regular,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
  return (
    <CounterContextProvider >
    <Root>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
    </Root>
  </CounterContextProvider>
  )
    }
}