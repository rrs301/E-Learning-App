import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { ClerkProvider,SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import LoginScreen from './App/Screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import * as SecureStore from "expo-secure-store";
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { useState } from 'react';
import { UserPointsContext } from './App/Context/UserPointsContext';
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function App() {
  const [isChapterComplete,setIsChapterComplete]=useState(false);
  const [userPoints,setUserPoints]=useState();
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey={"Your Clerk Key"}>
      <UserPointsContext.Provider value={{userPoints,setUserPoints}}>
   <CompleteChapterContext.Provider value={{isChapterComplete,setIsChapterComplete}}>
    <View style={styles.container}>
     
      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
          
        </SignedIn>
        <SignedOut>
        <LoginScreen/>
        </SignedOut>
    </View>

    </CompleteChapterContext.Provider>
    </UserPointsContext.Provider>
    </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:20
   
  },
});
