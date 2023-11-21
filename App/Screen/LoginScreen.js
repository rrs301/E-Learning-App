import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import app from './../../assets/images/app.png'
import Colors from '../Utils/Colors'
import { useOAuth } from "@clerk/clerk-expo";

import google from './../../assets/images/google.png'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 

  return (
    <View style={{display:'flex',alignItems:'center'}}>
      <Image source={app}
      style={{width:250,height:500,
      objectFit:'contain',marginTop:70}} />
      <View style={{
        height:400,
        backgroundColor:Colors.PRIMARY,
        width:'100%',
        marginTop:-100,
        padding:20
      }}>
        <Text style={{textAlign:'center',
    fontSize:35,color:Colors.WHITE,
    fontFamily:'outfit-bold',marginTop:30}}>CODEBOX</Text>
     <Text style={{textAlign:'center',
    fontSize:20,marginTop:20,
    color:Colors.LIGHT_PRIMARY,
    fontFamily:'outfit'}}>Your Ultimate Programming Learning Box</Text>
     
     <TouchableOpacity 
     onPress={onPress}
     style={{backgroundColor:Colors.WHITE,
    display:'flex',flexDirection:'row',
    alignItems:'center',gap:10,
    justifyContent:'center',
    padding:10,
    borderRadius:99,marginTop:25}}>
        <Image source={google} 
        style={{width:40,height:40}}/>
        <Text style={{fontSize:20,
        color:Colors.PRIMARY,
        fontFamily:'outfit'}}>Sign In with Google</Text>
     </TouchableOpacity>
      </View>
    </View>
  )
}