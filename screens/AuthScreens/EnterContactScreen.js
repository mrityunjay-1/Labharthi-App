import React, {useState, useContext} from 'react';
import {ActivityIndicator, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform} from 'react-native';

import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const EnterContactScreen = ({navigation}) => {
  
  const { data } = useContext(AuthContext);
  
  // console.log(data);
  
  const [countryCode, setCountryCode] = useState("+91");
  const [contact, setContact] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  
  
  // verify contact
  
  const verify_contact = async () => {
    
    if(!countryCode.includes("+")){
      alert("Please enter valid country code!");
      return false;
    }
    
    if(contact.length != 10){
      alert("please Enter valid Phone Number!");
      return false;
    }
    
    
    
    setIsLoading(true);
    // make API request here
    
    
    try{
      const res = await axios.post(data.link + "verify_contact", {
        contact, countryCode
      });
      
      
      // console.log("number verification res = ", res.data);
      
      
      if(res.data.message === "okay"){
        if(Platform.OS === "android"){
          ToastAndroid.show("An OTP has been sent to your Phone Number.", ToastAndroid.SHORT);
        }
        
        navigation.navigate("OTP", { countryCode, contact });
      }
    
    }catch(e){
      setIsLoading(false);
      alert(e);
    }
    
  }
  
  return (
    <View style={{flex: 1, backgroundColor: 'indigo', alignItems: 'center'}}>
      <Text style={{color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold', marginTop: '9%'}}>Verify Your Phone Number</Text>
      <Text></Text>
      <Text style={{textAlign: 'center', width: '80%', color: 'lightgrey'}}>We will send you an SMS in order to verify your phone number.</Text>
      
      <View style={{height: '70%', elevation: 10, position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        
        
        
        
        {/* Contact number */}
        <View style={{marginTop: '20%', flexDirection: 'row', justifyContent: 'space-around', margin: 20}}>
          <TextInput
            value={countryCode}
            onChangeText={(v) => setCountryCode(v)}
            style={{fontSize: 20, fontWeight: 'bold', width: '15%', borderBottomWidth: 2, borderColor: 'indigo', padding: 1}}
          />
          
          <TextInput
            value={contact}
            onChangeText={(v) => setContact(v)}
            style={{fontSize: 20, fontWeight: 'bold', width: '55%', borderBottomWidth: 2, borderColor: 'indigo', padding: 1}}
            keyboardType="number-pad"
          />
      
      
        </View>
      
        <TouchableOpacity onPress={verify_contact} style={{ elevation: 10, position: 'absolute', right: '15%', backgroundColor: 'indigo',  borderRadius: 500, bottom: '20%'}}>
          {
            !isLoading ?
              <Text style={{width: 80, height: 80, textAlign: 'center', textAlignVertical: 'center', fontSize: 30,  color: 'white'}}>&rsaquo;</Text>
            :
                <ActivityIndicator size={80} color="white" />
          }
        </TouchableOpacity>
      
      </View>
      
      
      
      
    </View>
  );
};

export default EnterContactScreen;