import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RenderHtml from 'react-native-render-html';
import Colors from '../../Utils/Colors';

export default function ContentItem({description,output}) {
    const { width } = useWindowDimensions();
    const [isRun,setIsRun]=useState(false);
    const descriptionSource={
        html:description
    }
    const outputSource={
      html:output
    }

  return description&&(
    <View>
      {/* <Text>{description}</Text> */}
      <RenderHtml
      contentWidth={width}
      source={descriptionSource}
      tagsStyles={tagsStyles}
    />
    {output!=null?<TouchableOpacity 
    onPress={()=>setIsRun(true)}
    style={{marginTop:-20,marginBottom:20}}>
      <Text style={{padding:12,backgroundColor:Colors.PRIMARY,
      borderRadius:10,fontFamily:'outfit',
      width:100,
      fontSize:15,color:Colors.WHITE,textAlign:'center'}}>Run</Text>
    </TouchableOpacity>:null}

    {isRun?
    <>
    <Text style={{fontFamily:'outfit-medium',fontSize:17,
    marginBottom:10}}>Output</Text>
    <RenderHtml
      contentWidth={width}
      source={outputSource}
      tagsStyles={outputStyles}
    />
    </>
    :null}
   
    </View>
  )
}

const tagsStyles = {
    body: {
      fontFamily : 'outfit',
      fontSize:17,
      color:'#5B5B5B',
      lineHeight:25
    },
    code:{
        backgroundColor:Colors.BLACK,
        color:Colors.WHITE,
        padding:20,
        borderRadius:15,
        
    }
  
  };

  const outputStyles = {
    body: {
      fontFamily : 'outfit',
      fontSize:17,
      backgroundColor:Colors.BLACK,
      color:Colors.WHITE,
      padding:20,
      borderRadius:15
    },
    code:{
        backgroundColor:Colors.BLACK,
        color:Colors.WHITE,
        padding:20,
        borderRadius:15
    }
  
  };
  