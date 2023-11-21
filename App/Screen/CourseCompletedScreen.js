import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import coins from './../../assets/images/coin.png'
import { useNavigation, useRoute } from '@react-navigation/native'
export default function CourseCompletedScreen() {
   const param=useRoute().params;
    const navigation=useNavigation();

    return param?.coins&&(
        <View>
            <View
                style={{
                    backgroundColor: Colors.PRIMARY,
                    height: '60%',
                   
                }}>

                <View style={{
                    backgroundColor:Colors.WHITE,
                    padding:20,
                    margin:20,
                    marginTop:100,
                    alignItems:'center',
                    borderRadius:15,
                }}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 30, marginTop: 40
                    }}>Congratulation</Text>
                    <Image source={coins}
                        style={{
                            width: 200,
                            height: 200
                        }} />
                    <Text
                        style={{
                            fontSize: 22,
                            fontFamily: 'outfit-medium',
                            color: Colors.GRAY
                        }}>You just earn {param.coins} Points</Text>
                <TouchableOpacity style={{backgroundColor:Colors.PRIMARY,
                padding:15,borderRadius:15,
                width:'100%',marginTop:25
                }}
                onPress={()=>navigation.goBack()}
                >
                    <Text style={{textAlign:'center',
                fontFamily:'outfit',
                color:Colors.WHITE,
                fontSize:17}}
                >Go Back to Course</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}