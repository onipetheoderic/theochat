import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, TouchableHighlight, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar, SegmentedControlIOSComponent} from 'react-native';

import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

import { CounterContext } from "../../store";

import ChatCard from '../components/ChatCard';
import * as Contacts from 'expo-contacts';
import { BASEURL, IMAGEURL } from '../constant/constants'
import Wrapper from '../components/wrapper'

export default function ChatListScreen(props) {

    const [value, onChangeText] = useState("");

    const [offline, setOffline] = useState([]);
    
    const globalState = useContext(CounterContext);
    const {state, dispatch } = globalState;  
  
  
  


    return (
       <Wrapper>
          <StatusBar translucent={true} backgroundColor="transparent"/>
                 <View style={styles.overallCont}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatText}>Chat</Text>
            <Feather name="more-vertical" style={{color:'#2569fd', alignSelf:'center'}} size={25} />
          </View>

          <View style={styles.chatField}>
          <Feather name="search" 
          style={{color:'#55566c', alignSelf:'center', marginLeft:15}} size={15} />
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="Search"
                placeholderTextColor='#55566c'
            />
          </View>
        <View style={styles.circleBox}>
   <Feather name="plus" 
          style={{color:'white', alignSelf:'center'}} size={25} />
        </View>
          <View style={styles.chatSection}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {state.users.map((user)=> {
                  console.log(`${user._id}`,"OOO")
                  return (
                  <ChatCard
                  chatroomId={`${state.requester}-${user._id}`} 
                  navigation={props.navigation} 
                  id={user._id} 
                  name={user.name} 
                  message={user.status} 
                  dp={`${BASEURL}${user.image}`} 
                  key={user._id}/>
                )})}
           
                    </ScrollView>
          </View>
         

        </View>
        </Wrapper>

    );
  }
  
  
const styles = StyleSheet.create({
    circleBox: {
        justifyContent:'center', 
        alignItems:'center',position:'absolute', backgroundColor:'#2569fd',
        height:60, width:60, 
        borderRadius:50,  bottom:20, right:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 15,
    },
    chatSection: {
        width:'90%',
        alignSelf:'center', 
        marginTop:20,
         marginBottom:125
    },
    textInput: {
        marginLeft:15,
        width:'100%',
        color:'#C5C5C4',
        fontFamily: 'Comfortaa_700Bold',
    },
    chatField: {
        marginTop:20,
        backgroundColor:'#1e1c26',
        height:50,
        flexDirection:'row',
        alignSelf:'center', 
        width:'89%', 
        borderRadius:5,
        shadowColor: "#151834",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        
        elevation: 5,
            
    },
    chatHeader:{
        marginTop:20,
       width:'90%',
       alignSelf:'center',
       justifyContent:'space-between',
        flexDirection: 'row'
    },
    chatText: {
        fontSize:25, 
        color:'white',
        fontFamily: 'Comfortaa_700Bold',
    },
  overallCont: {
    flex:1, 
    backgroundColor:'#151834'
  },
  textCont: {
      
      flex: 1,
      alignItems:'center'
  },
  freeText: {
      fontFamily: 'Comfortaa_700Bold',
      color:'white',
      fontSize:17
  }
});