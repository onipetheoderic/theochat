import React, {useContext, useState, useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, TouchableHighlight, 
  ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView,
  Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { BASEURL, IMAGEURL } from '../constant/constants'
import { CounterContext } from "../../store";
import Wrapper from '../components/wrapper'
import {Base64} from 'js-base64';

import { AnimatedEmoji } from 'react-native-animated-emoji';


export default function ChatListScreen({ route, navigation }) {
  const [offset,setOffset] = useState(0);
    const [chatroomId, setChatroomId] = useState("")
    const [message, onChangeText] = useState("");
    const [name, setName] = useState("");
    const [reciever, setReciever] = useState("");
    const [inputHeight, setInputHeight] = useState(60);
    const globalState = useContext(CounterContext);
    const {state, dispatch } = globalState;
    const [userId, setUserId] = React.useState("");

    const [messages, setMessages] = React.useState([]);
    

    const getMessages = (id) => {
        // console.log(state.token,"iii")
        axios.get(`${BASEURL}message/messages/${id}`, {
          headers: {
            Authorization: 'Bearer ' + state.token //the token is a variable which holds the token
          }
        })
        .then((response)=> {
            console.log("the response", response.data)
           setMessages(response.data)
           
        }).catch(err => {
          console.log(err,"HHHH")
        });
      
      };
    
      useEffect(() => {
        const payload = JSON.parse(Base64.atob(state.token.split('.')[1]))
        setUserId(payload.id.toString())
        const { id, chatroomId, name } = route.params;
        setReciever(id);
        getMessages(id);
        setName(name);
        setChatroomId(chatroomId);
    }, []);
    
    useEffect(() => {
      const y = offset + 10000480;
      scrollViewRef.current.scrollTo({x: 0, y, animated: true});
      setOffset(y);
      if(state.socket){
        state.socket.on('private_chat',function(msg){
          setMessages([...messages, msg])
        });
      }


    }, [messages]);
   
    
console.log(state.messages,"RRRRRR")

    const sendMessage = () => {
        if(message.length>=1){
         
            if(state.socket){
              console.log("its working")
                state.socket.emit('private_chat',{
                    to : reciever,
                    message : message
                });
                onChangeText("")
            }
        }
        else return;
      }
      const scrollViewRef = useRef();

      const slowlyScrollDown = () => {
        
      }
    return (
       <Wrapper>
          <StatusBar translucent={true} backgroundColor="transparent"/>
        <View style={styles.overallCont}>
      
          <View style={styles.chatHeader}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Feather name="arrow-left" style={{color:'#2569fd', alignSelf:'center'}} size={25} />
              </TouchableOpacity>
      
            <Text style={styles.chatText}>{name}</Text>
            <Feather name="more-vertical" style={{color:'#2569fd', alignSelf:'center'}} size={25} />
          </View>
          <ScrollView ref={scrollViewRef}>
         
        <View style={styles.chatSection}>
            <Text style={styles.chatTextMain}>Tuesday 05.02.2020</Text>
        </View>
       
        <View style={styles.chatLists}>
{messages.map((msg,index) => {
  console.log(userId, msg.to,"cp")
return(
    <View style={userId == msg.to ? styles.sender : styles.reciever}>
      <Text style={userId == msg.to ? styles.senderText : styles.recieverText} >
        {msg.content}
      </Text>
    </View>
)})}

           


        </View>
        </ScrollView>

        <View style={[styles.chatField,{height: (Math.max(60, inputHeight))}]}>
         
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                value={message}
                multiline={true}
                placeholder="Type something..."
                placeholderTextColor='#55566c'
                onContentSizeChange={(event) => {
                    setInputHeight(event.nativeEvent.contentSize.height)
                }}
            />
            <View style={{ flex:1,flexDirection:'row', justifyContent:'center',}}>
<TouchableOpacity onPress={()=>sendMessage()} style={{ alignSelf:'center'}}>
    <Feather name="send" style={{color:'#2569fd'}} size={25} />
</TouchableOpacity>

            <Feather name="paperclip" 
          style={{color:'#2569fd', alignSelf:'center', marginLeft:15}} size={22} />
          <Feather name="smile" 
          style={{color:'#2569fd', alignSelf:'center', marginLeft:15}} size={22} />

            </View>



          </View>
         
         

        </View>
        </Wrapper>
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
        fontSize:15,
        width:'65%',
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
        marginTop:40,
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