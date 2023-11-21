import { View, Text, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../Services'
import Colors from '../Utils/Colors';
import Gold from './../../assets/images/gold-medal.png'
import Silver from './../../assets/images/silver-medal.png'
import Bronze from './../../assets/images/bronze-medal.png'

export default function LeaderBoard() {

  const [userList,setUserList]=useState([]);

  useEffect(()=>{
    GetAllUserDetails();
  },[])

  const GetAllUserDetails=()=>{

    GetAllUsers().then(resp=>{
      console.log(resp); 
      resp&&setUserList(resp?.userDetails)
    })
  }
  return (
    <View>
      <View style={{height:160,backgroundColor:Colors.PRIMARY,
      padding:30,}}>
      <Text style={{fontFamily:'outfit-bold',
    color:Colors.WHITE,
    fontSize:30}}>LeaderBoard</Text>
      </View>

      <View style={{marginTop:-40,height: "85%"}}>
        <FlatList
          data={userList}       
          renderItem={({item,index})=>(
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',
            justifyContent:'space-between',
            padding:20,backgroundColor:Colors.WHITE,margin:8,marginRight:15,
            marginLeft:15,borderRadius:15}}>
            <View style={{display:'flex',flexDirection:'row',
            gap:10,alignItems:'center'}}>
              <Text style={{fontFamily:'outfit-bold',fontSize:24,
            color:Colors.GRAY}}>{index+1}</Text>
                <Image source={{uri:item.profileImage}}
                style={{width:60,height:60,borderRadius:99}}
                />
                <View>
                  <Text style={{fontFamily:'outfit-medium',
                fontSize:20}}>{item.userName}</Text>
                  <Text style={{fontFamily:'outfit',
                fontSize:16,color:Colors.GRAY}}>{item.point} Points</Text>
                </View>
            </View>
            {index<3?
            <Image source={index+1==1?Gold
            :index+1==2?Silver:Bronze}
            
            style={{width:40,height:40}}/>
            :null}
            </View>
          )}
        />
      </View>
      
    </View>
  )
}