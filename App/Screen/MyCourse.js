import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { GetAllProgressCourse } from '../Services';
import CourseItem from '../Components/HomeScreen/CourseItem';
import CourseProgressItem from '../Components/MyCourse/CourseProgressItem';

export default function MyCourse() {
  const {user}=useUser();
    const navigation=useNavigation();
    const [progressCourseList,setProgressCourseList]=useState();
    useEffect(()=>{
        user&&GetAllProgressCourseList()
    },[user])
    const GetAllProgressCourseList=()=>{
        GetAllProgressCourse(user.primaryEmailAddress.emailAddress)
        .then(resp=>{
            setProgressCourseList(resp.userEnrolledCourses)
        })
    }
  return (
    <View>
       <View style={{height:160,backgroundColor:Colors.PRIMARY,
      padding:30,}}>
      <Text style={{fontFamily:'outfit-bold',
    color:Colors.WHITE,
    fontSize:30}}>My Course</Text>
      </View>
      <FlatList
                data={progressCourseList}
                style={{marginTop:-50}}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={{margin:8,padding:5}}
                    onPress={()=>navigation.navigate('couse-detail',{
                        course:item.course
                    })}
                    >
                        <CourseProgressItem item={item.course}
                        completedChapter={item?.completedChapter?.length}
                        />
                    </TouchableOpacity>

                )}
            />
    </View>
  )
}