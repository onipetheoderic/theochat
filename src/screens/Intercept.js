import React, {useContext, useState} from 'react';
import {StyleSheet, AsyncStorage, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import io from "socket.io-client";
import { CounterContext } from "../../store";
import { BASEURL, IMAGEURL } from '../constant/constants'

export default function ChatListScreen(props) {

    const [value, onChangeText] = useState("");
    const [token, setToken] = React.useState("")
    
    const globalState = useContext(CounterContext);

    const {state, dispatch } = globalState;  
    const setupSocket = async () => {
      const tokenz = await AsyncStorage.getItem("CC_Token");
     
        dispatch({ type: 'setToken', payload:tokenz})
       
      
        if(tokenz===null){
            props.navigation.navigate('OptionScreen')
        }
        else {
            props.navigation.navigate('ChatListScreen')
            // props.navigation.navigate('ImageUploadPage')
        }
    }
  
    React.useEffect(()=> {
      setupSocket()
      //eslint-disable-next-line
    }, [])
    return (
        // more-vertical
        <View style={styles.overallCont}>
          
        </View>
      
    );
  }
  
  
const styles = StyleSheet.create({
    senderText: {
        fontSize:11, 
        color: '#b5b4bc', 
        fontFamily: 'Comfortaa_700Bold', 
        paddingVertical:10, 
        paddingHorizontal:10
    },
    recieverText: {
        fontSize:11, 
        color: 'white', 
        fontFamily: 'Comfortaa_700Bold', 
        paddingVertical:10, 
        paddingHorizontal:10
    },
    sender: {
        borderRadius:10, 
        marginVertical:5, 
        backgroundColor: '#343145', 
        alignSelf: 'flex-start'
    },
    reciever: {
        borderRadius:10, 
        marginVertical:5, 
        backgroundColor: '#2263fc', 
        alignSelf: 'flex-end'
    },
    chatLists: {
        width:'90%',
        alignSelf:'center',
        marginBottom:100
    },
    chatBox: {
        backgroundColor:'#343145',
        borderRadius:10,

        minHeight:40,
       
    },
    chatSection: {
        marginTop:40,
    },
    textInput: {
        marginLeft:15,
        width:'70%',
        color:'#C5C5C4',
        fontFamily: 'Comfortaa_700Bold',
    },
    chatField: {
       position:'absolute',
       bottom:0,
        backgroundColor:'#1e1c26',
        height:60,
        flexDirection:'row',
        alignSelf:'center', 
        width:'100%', 
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
        marginTop:30,
       width:'90%',
       alignSelf:'center',
       justifyContent:'space-between',
        flexDirection: 'row'
    },
    chatText: {
        fontSize:15, 
        color:'white',
        fontFamily: 'Comfortaa_700Bold',
        alignSelf:'center'
    },
    chatTextMain: {
        fontSize:12, 
        marginVertical:8,
        color:'#55566c',
        fontFamily: 'Comfortaa_700Bold',
        alignSelf:'center'
    },
  overallCont: {
    flex:1, 
    backgroundColor:'#151834'
  },
  textCont: {
      
      flex: 1,
      alignItems:'center'
  },
 
});