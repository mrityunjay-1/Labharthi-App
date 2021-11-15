import React, {useState, useContext} from 'react';
import {Text, View, Image} from 'react-native';

import AuthContext from '../Context/AuthContext';
import axios from 'axios';

const WelcomeScreen = ({navigation}) => {
  
  const {whenbootup} = useContext(AuthContext);  
  
  React.useEffect(() => {
    
    try{
      axios.get("https://labharthiapp.herokuapp.com/")
        .then(res => console.log("Welcome!"))
        .catch(err => console.log(err));
        
    }catch(e){
      console.log(e);
    }
      
        
    (
      async () => {
        await whenbootup();
      }
    )();
  }, []);
  
  
  return (
    <>
      <Text style={{color: 'indigo', fontSize: 70, fontWeight: 'bold', textAlign: 'center', marginTop: 50}}>Welcome</Text>
      <Text onPress={() => navigation.navigate("Contact")} style={{position: 'absolute', bottom: 0, margin: '10%', textAlign: 'center', padding: 14, borderRadius: 5, backgroundColor: 'indigo', color: 'white', fontWeight: 'bold', width: '80%'}}> Let's Start </Text>
    </>
  );
};

export default WelcomeScreen;