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
import { CircularProgress, GradientCircularProgress } from "react-native-circular-gradient-progress";
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { BASEURL, IMAGEURL } from '../constant/constants'


// https://get.geojs.io/v1/ip/country.js
export default function OptionScreen(props) {
  
  const [loginScreen, changeScreen] = useState("options");
  const [status, changeStatus] = useState("");
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
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
    (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
}, []);

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setPhoto(result);
    }
  };

  const fileExtensionMaker = (extension) => {
    if(extension=="jpeg" || extension=="png" || extension=="gif" || extension=="jpg" || extension == "bmp"){
      return `image/${extension}`
    }
    else if(extension=="mp4" || extension=="avi" || extension=="mpeg"){
      return `video/${extension}`
    }
    else return false
  }

  const uploadImage = () => {
    if(status.length<=2){
      Toast.show({
        text: "Status content must be more than 2 characters",
        textStyle: { color: "yellow" },
        duration: 4000
      })
    }
    if(image!=null && status.length>=3){
      console.log("the token",state.token)
      const data = new FormData();
      data.append('status', status)
      data.append('image',{
        uri: image,
        type: fileExtensionMaker(image.substring(image.lastIndexOf(".") + 1)), // or photo.type
        name: "profileimage"
      })
      axios({
        method: 'post',
        url: `${BASEURL}user/upload`,
        data: data,
        headers: {
          'Authorization': 'Bearer '+ state.token,
          'Content-Type' : 'application/octet-stream',
        }
      }).then((response)=> {    
            console.log("the response", response.data)
            if(response.data.success){
              props.navigation.navigate("Intercept")
              Toast.show({
                text: "Profile Picture Upload successfully",
                textStyle: { color: "yellow" },
                duration: 4000
              })
            }
            else return;
        }).catch(err => {
            console.log("error from axios",err)

        });
    }
    else {
      Toast.show({
        text: "An Image must be selected to proceed",
        textStyle: { color: "yellow" },
        duration: 4000
      })
    }
   
    };
  

    return (
        <View style={styles.overallCont}>
            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
            <GradientCircularProgress
    startColor="#007dff"
    middleColor="#2fcf87"
    endColor="#007dff"
    size={230}
    progress={!image?70:100}
  >
     <TouchableOpacity style={{color:'white', top:-165, left:75}}
     onPress={()=>pickImage()}>
    {image && <Image source={{ uri: image }} style={{left:-45, top:-34,borderWidth:2,borderColor:'#007dff', width: 170, height: 170, borderRadius:100 }} />}
    {!image && 
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" 
      >
   
    

     <Feather name="camera"color='white' size={80} />
      <Text style={{color:'white',fontFamily: 'Comfortaa_700Bold', left:-5}}>Select Image</Text>
  
      </Animatable.View>
    }
     
      
      </TouchableOpacity>
    
     
      </GradientCircularProgress>
            </View>
          
             <View style={styles.textCont}>
               {!image &&
                <Text style={styles.freeText}>Click the Select Image to Select the 
                Profile Image you want to use for your profile </Text>
               }

              {image &&
                <Text style={styles.freeText}>Image Selected, if you are satisfied with the image click the finish button below </Text>
               }
              <View style={styles.chatField}>
                  <View style={styles.innerCont}>
              <Text style={styles.counter}>{status.length}/50</Text>
                  </View>
                 
                    <TextInput
                        style={styles.textInput2}
                        onChangeText={text => changeStatus(text)}
                        value={status}
                        maxLength={50}
                        placeholder="status message"
                        placeholderTextColor='white'
                       
                    />
                  </View>
             <AuthButton title="Finish" marginVertical={20}
              onPress={()=>uploadImage()}/>
           
            
                </View>
            
        </View>
      
    );
  }
  
  
const styles = StyleSheet.create({
  code: {
    color:'white',
    fontSize:15,
    fontFamily: 'Comfortaa_700Bold',
  },
  counter: {
    color:'white',
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
    width:'65%',
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
      
      flex: 2,
      alignItems:'center'
  },
  freeText: {
      fontFamily: 'Comfortaa_700Bold',
      color:'white',
     
      textAlign:'center',
      fontSize:14,
      paddingHorizontal:20
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