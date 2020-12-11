import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CounterContext } from "../../store";
    

export default function ChatCard(props) {

  const globalState = useContext(CounterContext);
    const {state, dispatch } = globalState;

  const offlineExist = state.offline.some(arrVal => arrVal._id === props.id)
  const onlineStatus = !offlineExist ?
  <FontAwesome name="circle" style={{color:'green',marginLeft:10, alignSelf:'flex-end'}} size={15} />
  :
  <FontAwesome name="circle-o" style={{color:'red',marginLeft:10, alignSelf:'flex-end'}} size={15} />
  return (
   
        <TouchableOpacity onPress={()=>props.navigation.navigate("ChatScreen", {
          id:props.id, chatroomId:props.chatroomId, name:props.name})} style={{width:'100%', marginVertical:13, flexDirection:'row'}}>
            <View style={{width:50, height:50, borderRadius:25, backgroundColor:'#151834'}}>
            <Image source={{uri: props.dp}} 
            style={{ alignSelf:'center',width:'100%', height:50, borderRadius:50,
            
            }} />
            </View>
            <View style={{flexDirection:'column', marginLeft:13, marginTop:2, marginRight:48}}>
              <View style={{flexDirection:'row'}}>
              <Text style={{color:'#c3c3c7', fontSize:14, fontFamily: 'Comfortaa_700Bold',}}>{props.name}</Text>
              {onlineStatus}
              </View>
                
                <Text style={{color:'#424255', fontSize:11, fontFamily: 'Comfortaa_500Medium'}}>{props.message}</Text>
            </View>
        </TouchableOpacity>
    
  );
}
