import React, {useContext} from 'react';
import {Text, View, Image, Pressable, StyleSheet, Share} from 'react-native';

import AuthContext from '../Context/AuthContext';

const CustomDrawerContent = (props) => {
  
  const {logOut} = useContext(AuthContext);
  
  return (
    <>
      
      <Image source={require("../../assets/icdslogo.png")}
        resizeMode="contain"
        style={{height: 100, margin: 10}}
      />
      <Text style={styles.appname}>Labharthi App</Text>
      <Text style={{marginVertical: 8, borderTopWidth: 1, borderColor: 'lightgrey'}}></Text>
      
      
      <Pressable onPress={() => props.navigation.navigate("Home")} >
        <Text style={styles.n}> 🏡  Home</Text>
      </Pressable>
      
      
      <Pressable onPress={() => props.navigation.navigate("Feedback")} >
        <Text style={styles.n}> 🗨  Feedback</Text>
      </Pressable>
      
      
      <Pressable onPress={() => props.navigation.navigate("Guide")} >
        <Text style={styles.n}> 🔰 Guide</Text>
      </Pressable>
      
      <Pressable onPress={() => props.navigation.navigate("ExportInExcelScreen")} >
        <Text style={styles.n}> 📁 Export Labharthi Data</Text>
      </Pressable>
      
      <Pressable onPress={async () => await Share.share({message: "https://mrityunjay-1.github.io/portfolio"})} >
        <Text style={styles.share}> 📣  Share  </Text>
      </Pressable>
      
      
      
      <Pressable onPress={logOut} style={{position: 'absolute', bottom: 0, padding: 20}}>
        <Text style={{fontSize: 20, color: 'indigo'}}>Logout ➡</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  n: {
    backgroundColor: 'lightblue', color: 'black', margin: 10, borderRadius: 3, padding: 12
  },
  appname: {
    paddingLeft: 12, paddingBottom: 12, fontSize: 30, color: 'brown', fontWeight: 'bold', fontFamily: 'roboto'
  },
  share: {
    fontSize: 20, textAlign: 'center', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', marginHorizontal: 60, marginTop: 20, borderRadius: 500, padding: 10
  }
})

export default CustomDrawerContent;