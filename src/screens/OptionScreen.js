import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet,AsyncStorage, TouchableOpacity, TouchableHighlight, ActivityIndicator, TextInput, Button, Alert, SafeAreaView, ScrollView, Image, Text, View, RefreshControl, FlatList, StatusBar} from 'react-native';
import AuthButton from '../components/AuthButton';
import PlainButton from '../components/PlainButton'
import { LinearGradient } from 'expo-linear-gradient';
import { countryCode } from '../constant/countryCode';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import {Toast} from 'native-base';
import { CounterContext } from "../../store";
import { BASEURL, IMAGEURL } from '../constant/constants'

// https://get.geojs.io/v1/ip/country.js
export default function OptionScreen(props) {
  
  const [loginScreen, changeScreen] = useState("options");
  const [value, onChangeText] = useState("");
  const [countryNumber, changeCountry] = useState("")

  const globalState = useContext(CounterContext);

  const {state, dispatch } = globalState;  


  const [register, changeRegister] = useState({
    phone:"",
    name:"",
    password:""
  })

  const [login, changeLogin] = useState({
    phone:"",
    password:""
  })

  const changeLoginFormDetails = (name, value) => {
    changeLogin({...login,
      [name]:value
  })
  }

  const changeRegisterFormDetails = (name, value) => {
    changeRegister({...register,
      [name]:value
  })
  }

  const loginUser = () => {
    let {phone, password} = login

    let final = `${countryNumber}${phone.replace(/^0+/, '')}`
  if(phone.length<=11){
    Toast.show({
      text: "The phone number should be more than 11 characters",
      textStyle: { color: "yellow" },
      duration: 4000
    })
  }
  if(password.length<=5){
    Toast.show({
      text: "The password should be more than 5 characters",
      textStyle: { color: "yellow" },
      duration: 4000
    })
  }

    axios.post(`${BASEURL}user/login`, {
        phone:phone,
        password
    }).then(response => {
      AsyncStorage.setItem("CC_Token", response.data.token)
      dispatch({type:"setToken", payload: response.data.token})
      if(response.data.completed === false ){
        props.navigation.navigate("ImageUploadPage")
      }
      else {
        props.navigation.navigate("ChatListScreen")
      }
      Toast.show({
        text: response.data.message,
        textStyle: { color: "yellow" },
        duration: 4000
      })
    }).catch(err=>{
        if (
            err && 
            err.response && 
            err.response.data && 
            err.response.data.message
            )
            Toast.show({
              text: err.response.data.message,
              textStyle: { color: "yellow" },
              duration: 4000
            })
    })
}

const registerUser = () => {
  let {phone, password, name} = register
let final = `${countryNumber}${phone.replace(/^0+/, '')}`
if(phone.length<=11){
  Toast.show({
    text: "The phone number should be more than 11 characters",
    textStyle: { color: "yellow" },
    duration: 4000
  })
}
if(password.length<=5){
  Toast.show({
    text: "The password should be more than 5 characters",
    textStyle: { color: "yellow" },
    duration: 4000
  })
}
if(name.length<=3){
  Toast.show({
    text: "The nickname should be more than 5 characters",
    textStyle: { color: "yellow" },
    duration: 4000
  })
}
  axios.post(`${BASEURL}user/register`, {
      phone:phone,
      password,
      name
  }).then(response => {
    
    AsyncStorage.setItem("CC_Token", response.data.token)
    dispatch({type:"setToken", payload: response.data.token})
    if(response.data.completed === false ){
      props.navigation.navigate("ImageUploadPage")
    }
    else {
      props.navigation.navigate("ChatListScreen")
    }
   
    Toast.show({
      text: response.data.message,
      textStyle: { color: "yellow" },
      duration: 4000
    })
    
  }).catch(err=>{
      if (
          err && 
          err.response && 
          err.response.data && 
          err.response.data.message
          )
          Toast.show({
            text: err.response.data.message,
            textStyle: { color: "yellow" },
            duration: 4000
          })
  })
}


const getCountryCode = () => {
    axios.get("https://get.geojs.io/v1/ip/country.json", {
    })
    .then((response)=> {
      const { country } = response.data
      const upperCased = country.toUpperCase()
      
      changeCountry("+"+countryCode[upperCased])
    }).catch(err => {
    });
};

React.useEffect(()=> {
  getCountryCode();
}, []);


    return (
        <View style={styles.overallCont}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <LinearGradient style={{ 
          height:50,width:'50%', justifyContent:'center'}} 
          colors={['#2fcf87','#007dff', '#007dff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            </LinearGradient>
            <LinearGradient style={{ 
          height:105,width:50, justifyContent:'center'}} colors={['#2fcf87','#007dff', '#007dff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            </LinearGradient>
            <Text style={{position:'absolute', fontFamily: 'Comfortaa_700Bold',
             right:80, top:'50%',
            fontSize:30, color:'white', transform: [{ rotate: "-20deg" }]}}>Chat</Text>
            </View>
            {loginScreen == "login" &&
             <View style={styles.textCont}>
             <Text style={styles.freeText}>Sign in to your Account</Text>
            <View style={styles.chatField}>
            <View style={styles.innerCont}>
                <Text style={styles.code}>{countryNumber}</Text>
            </View>
              <TextInput
                  style={styles.textInput2}
                  onChangeText={text => changeLoginFormDetails("phone", text)}
                  value={login.phone}
                  placeholder="Phone number"
                  keyboardType='numeric'
                  placeholderTextColor='white'
              />
            </View>
            <View style={styles.chatField}>
            <View style={styles.innerCont}>
                  <Feather name="user" 
                  style={{color:'#55566c'}} size={20} />
                  </View>
              <TextInput
                  style={styles.textInput2}
                  onChangeText={text => changeLoginFormDetails("password", text)}
                  value={login.password}
                  placeholder="Password"
                  placeholderTextColor='white'
                  secureTextEntry={true}
              />
            </View>

            <AuthButton title="Sign in" onPress={()=>loginUser()} marginVertical={10}/>
            <View style={{flexDirection:'row',}}>
                    <TouchableOpacity onPress={()=>changeScreen("options")}>
                    <Feather name="home" 
                      style={{color:'#2fcf87', marginHorizontal:10}} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>changeScreen("register")}>
                      <Feather name="lock" 
                      style={{color:'#007dff', marginHorizontal:10}} size={20} />
                    </TouchableOpacity>
                  </View>
            </View>

            
            
              }
            {
              loginScreen == "options" &&
              <View style={styles.textCont}>
                <Text style={styles.freeText}>Create a free account</Text>
                <AuthButton onPress={()=>changeScreen("register")} title="Create an account" marginVertical={20}/>
                <PlainButton onPress={()=>changeScreen("login")} title="Login" marginVertical={0}/>
              </View>

              }
  {loginScreen=="register" &&
              <View style={styles.textCont}>
                <Text style={styles.freeText}>Create a free account</Text>
                  
                  <View style={styles.chatField}>
                  <View style={styles.innerCont}>
                      <Text style={styles.code}>{countryNumber}</Text>
                  </View>
                    <TextInput
                        style={styles.textInput2}
                        onChangeText={text => changeRegisterFormDetails("phone",text)}
                        value={register.phone}
                        placeholder="07039148866"
                        placeholderTextColor='white'
                    />
                  </View>
                  
                

                  <View style={styles.chatField}>
                  <View style={styles.innerCont}>
                  <Feather name="user" 
                  style={{color:'#55566c'}} size={20} />
                  </View>
                 
                    <TextInput
                        style={styles.textInput2}
                        onChangeText={text => changeRegisterFormDetails("name",text)}
                        value={register.name}
                        placeholder="Nick name"
                        placeholderTextColor='white'
                       
                    />
                  </View>

                  <View style={styles.chatField}>
                  <View style={styles.innerCont}>
                  <Feather name="lock" 
                  style={{color:'#55566c'}} size={20} />
                  </View>
                 
                    <TextInput
                        style={styles.textInput2}
                        onChangeText={text => changeRegisterFormDetails("password",text)}
                        value={register.password}
                        placeholder="Password"
                        placeholderTextColor='white'
                        secureTextEntry={true}
                    />
                  </View>
                  <AuthButton title="Next" marginVertical={10} onPress={()=>registerUser()}/>
                  <View style={{flexDirection:'row',}}>
                    <TouchableOpacity onPress={()=>changeScreen("options")}>
                    <Feather name="home" 
                      style={{color:'#2fcf87', marginHorizontal:10}} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>changeScreen("login")}>
                      <Feather name="lock" 
                      style={{color:'#007dff', marginHorizontal:10}} size={20} />
                    </TouchableOpacity>
                  </View>
                 
                  
              </View>

            }
            
        </View>
      
    );
  }
  
  
const styles = StyleSheet.create({
  code: {
    color:'white',
    fontSize:15,
    fontFamily: 'Comfortaa_700Bold',
  },
  innerCont: {
    alignItems:'center',
    justifyContent:'center',
    width:'23%', 
    borderRadius:30,
    position:'absolute',
    height:50,
    zIndex:10,
    flexDirection:'row',
    backgroundColor:'#2fcf87',
  },
  textInput2: {
    marginLeft:85,
    width:'100%',
    color:'white',
    fontFamily: 'Comfortaa_700Bold',
},
  textInput: {
    marginLeft:15,
    width:'100%',
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
  },
  chatField: {
    marginTop:10,
    backgroundColor:'#007dff',
    height:50,
    flexDirection:'row',
    alignSelf:'center', 
    width:'89%', 
    borderRadius:30,
   
        
},
});