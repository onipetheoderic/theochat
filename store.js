import React, { useState, createContext, useReducer } from "react";
import {AsyncStorage, } from 'react-native';

// Create Context Object
const initialState = {
    currentLanguage:"en",
    token:"",
    socket:null,
    users: [],
    messages:[],
    offline:[],
    requester:""
};


export const CounterContext = createContext(initialState);


export const CounterContextProvider = props => {
   
  
    

  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
        
        case 'changeLanguage':
            return {...state, currentLanguage: action.payload.preferredlanguage}

        case 'setToken':
            return {...state, token: action.payload}

        case 'setSocket':
            return {...state, socket: action.payload.socket}

        case 'saveUsers':
            return {...state, users: action.payload}

        case 'saveMessages':
          console.log("store, from", action.payload)
            return {...state, messages: action.payload}
        
        case 'saveRequester':
          return {...state, requester: action.payload}

        case 'setOffline': 
            return {...state, offline: action.payload}

        default:
            throw new Error();
        };
  },initialState)
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CounterContext.Provider>
  );
};