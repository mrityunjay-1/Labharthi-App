import React, { useState, createContext } from 'react';
import { NativeModules } from 'react-native';

const { SharedPreferenceModule, SQLiteDatabaseModule } = NativeModules;

const AuthContext = createContext();

const AuthModule = ({children}) => {
  
  const initialData = {
    link: process.env.NODE_ENV == "develoment" ? "https://labharthiapp.herokuapp.com/": "https://labharthiapp.herokuapp.com/",
    isLoggedIn: false,
    user: "",
    token: "",
    data: []
  };
  
  const [data, setData] = useState(initialData);
  
  
  const signIn = (cred) => {
    try{
      setData({...data, token: cred.token, user: cred.user, data: cred.data, isLoggedIn: true});
    }catch(e){
      alert(e);
    }
  }
  
  const logOut = () => {
    try{
      SharedPreferenceModule.vanish(r => console.log(r));
      
      // wipe out the local database
      SQLiteDatabaseModule.updateLabharthi("delete from labharthi");
      
      setData({...data, isLoggedIn: false, token: "", user: "", data: []});
    }catch(e){
      alert(e);
    }
  }
  
  const whenbootup = async () => {
    
    let result = false;
    
    // getting token
    SharedPreferenceModule.getItem("token", (token) => {
      
      SharedPreferenceModule.getItem("user", (user) => {
        
        if(token != "" && token.length != 0 && user != "" && user.length != 0){
          
          console.log("passed!");
          
          setData({...data, token, user, isLoggedIn: true});
          result = true;
        }
      });
      
    });
    
    console.log(result);
    
    return result;
    
  }
  
  
  return (
    <>
      <AuthContext.Provider value={{whenbootup, signIn, logOut, data}}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
export { AuthModule };