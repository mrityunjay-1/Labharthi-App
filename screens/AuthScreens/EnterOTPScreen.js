import React, {useState, useContext} from 'react';
import {Text, View, TextInput, NativeModules, ActivityIndicator} from 'react-native';

import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const { SharedPreferenceModule, SQLiteDatabaseModule} = NativeModules;

const EnterOTPScreen = ({route}) => {
  // context data
  const { whenbootup, data, signIn } = useContext(AuthContext);
  
  const [isLoading, setIsLoading] = useState(false);
  
  // itp verification function
  const verify_otp = async (otp) => {
    setIsLoading(true);
    
    try{
      const res = await axios.post(data.link + "verify_otp", {
        contact: route.params.countryCode + route.params.contact, otp
      });
      
      SharedPreferenceModule.addItem("token", `${res.data.token}`);
      SharedPreferenceModule.addItem("user", `${res.data.contact}`);
      
      // console.log("res = ", res.data);
      
      // please Wait till then i will replicate all the data locally from my server
      if(res.data.data.length != 0){
        res.data.data.forEach((l) => {
          SQLiteDatabaseModule.addLabharthi(`insert into labharthi values("${l.uid}", "${l.name}", "${l.parent}", "${l.aadhaar}", "${l.contact}", "")`);
        });
      }
      
      // Maza aa gaya karne me
      signIn({token: res.data.token, user: res.data.contact, data: res.data.data});
      
    }catch(e){
      setIsLoading(false);
      alert(e);
    }
    
  }
  
  return (
    <>
      {
        isLoading ?
        <View style={{zIndex: 999, justifyContent: 'center', position: 'absolute', flex: 1, backgroundColor: 'white', width: '100%', height: '100%'}}>
          <ActivityIndicator size={85} color="indigo" />
        </View>
        : null
      }
    
      <Text style={{textAlign: 'center', fontSize: 18, marginTop: '10%', color: 'black'}}> Verify <Text style={{fontWeight: 'bold', color: 'indigo'}}> {route.params.countryCode} {route.params.contact}</Text></Text>
    
      <View style={{alignItems: 'center', marginTop: '30%'}}>
        <TextInput          
          onChangeText={(v) => {
            
            if(isNaN(v) || v.includes(" ") || v.includes(".")){
              alert("only number allowed!");
              return ;
            }

            if(v.length === 6){
              verify_otp(v);
            }
          }}
          
          
          maxLength={6}
          keyboardType="number-pad"
          style={{color: 'black', width: '40%', textAlign: 'center', fontSize: 35, borderBottomWidth: 5, borderColor: 'grey', padding: 0}}
          placeholder="******"
        />
      </View>
    </>
  );
};

export default EnterOTPScreen;