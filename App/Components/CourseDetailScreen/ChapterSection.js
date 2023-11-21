import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { CompleteChapterContext } from '../../Context/CompleteChapterContext';
export default function ChapterSection({chapterList,
  userEnrolledCourse}) {

    const {isChapterComplete,setIsChapterComplete}=
    useContext(CompleteChapterContext)

  const navigation=useNavigation();

  const OnChapterPress=(chapter)=>{
    if(userEnrolledCourse.length==0)
    {
      ToastAndroid.show('Please Enroll Course!',ToastAndroid.LONG)
      return ;
    }
    else{
      setIsChapterComplete(false);
      navigation.navigate('chapter-content',{
        content:chapter.content,
        chapterId:chapter.id,
        userCourseRecordId:userEnrolledCourse[0]?.id
      })
    }
  }

  const checkIsChapterCompleted=(chapterId)=>{
    if(userEnrolledCourse[0]?.completedChapter?.length<=0)
    {
      return false;
    }
    const resp=userEnrolledCourse[0]?.completedChapter
    .find(item=>item.chapterId==chapterId)

    return resp;
  }
  return chapterList&&(
    <View style={{padding:10,
    backgroundColor:Colors.WHITE,marginTop:20,
    borderRadius:15,marginBottom:27}}>
        <Text style={{fontFamily:'outfit-medium',
    fontSize:22}}>Chapters</Text>
        {chapterList.map((item,index)=>(
            <TouchableOpacity 
            style={[checkIsChapterCompleted(item.id)
              ?styles.CompleteChapter
              :styles.inCompleteChapter]} 
            onPress={()=>OnChapterPress(item)}>
            <View style={{display:'flex',flexDirection:'row',
            alignItems:'center',gap:10}}>
             {checkIsChapterCompleted(item.id)?
             <Ionicons name="checkmark-circle" size={30} color={Colors.GREEN}/>
             :  <Text style={{fontFamily:'outfit-medium',
            fontSize:27,color:Colors.GRAY}}>{index+1}</Text>}
                <Text style={{fontFamily:'outfit',
            fontSize:21,color:Colors.GRAY}}>{item.title}</Text>
            </View>
          {userEnrolledCourse.length==0?
            <Ionicons name="md-lock-closed" size={25} color={Colors.GRAY} />
            :
            <Ionicons name="play" size={25} color={checkIsChapterCompleted(item.id)?Colors.GREEN: Colors.GRAY} />
          }
            </TouchableOpacity>
        ))}
    </View>
  )
}


const styles = StyleSheet.create({
  inCompleteChapter:{
    display:'flex',flexDirection:'row',
            alignItems:'center',justifyContent:'space-between',
            padding:15,borderWidth:1,borderRadius:10,marginTop:10,
            borderColor:Colors.GRAY
  },
  CompleteChapter:{
    display:'flex',flexDirection:'row',
    backgroundColor:Colors.LIGHT_GREEN,
            alignItems:'center',justifyContent:'space-between',
            padding:15,borderWidth:1,borderRadius:10,marginTop:10,
            borderColor:Colors.GREEN
  }
})