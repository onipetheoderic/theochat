import React, {useContext, useState} from 'react';
import {StyleSheet, AsyncStorage, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import io from "socket.io-client";
import { CounterContext } from "../../store";
import { BASEURL, IMAGEURL } from '../constant/constants'

export default function Wrapper(props) {
    const globalState = useContext(CounterContext);

    const {state, dispatch } = globalState;  
    let socket = state.socket;
    const setupSocket = async () => {
      const tokenz = await AsyncStorage.getItem("CC_Token");
     
        dispatch({ type: 'setToken', payload:tokenz})
       
        if(tokenz && !socket){
            const newSocket = io("http://192.168.43.60:8000",{
              query: {
                token: tokenz
              }
            });
      
            newSocket.on("disconnect", () => {
              dispatch({ type: 'setSocket', payload:{socket:null}})
            
              setTimeout(setupSocket, 3000);//so that we can reconnect after 3 seconds
              console.log("socket disconnected")
            })
            newSocket.on("connect", () => {
              console.log("socket connected")
              
            })
            newSocket.on("newUser", (users) => {
                console.log(users, "newAllUserfrom wrapper")
                dispatch({type:"saveUsers", payload: users.users})
            })
         
              dispatch({ type: 'setSocket', payload:{socket:newSocket}})
        }
       
    }
  
    React.useEffect(()=> {
      setupSocket()
      //eslint-disable-next-line
    }, [])
    return (
        // more-vertical
        <>
          {props.children}
        </>
      
    );
  }
  