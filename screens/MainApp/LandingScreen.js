import React, {useEffect, useState, useContext} from 'react';
import {Text, View, NativeModules, StyleSheet, FlatList, Image, Linking, TextInput, TouchableOpacity} from 'react-native';

import UnBackedUpData from './UnBackedUpData';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';

const { SQLiteDatabaseModule } = NativeModules;

const LandingPage = ({navigation}) => {
  
  const {data: authData} = useContext(AuthContext);
  const [data, setData] = useState({count: 0, data: []});
  const [dupData, setDupData] = useState({count: 0, data: []});
  
  
  const calll = async (no) => {
    await Linking.openURL("tel:"+no);
  }
  
  
  const getall = () => {
    SQLiteDatabaseModule.getAllLabharthi((res) => {
      res = res.replace('},]}', '}]}');
      setData(JSON.parse(res));
      setDupData(JSON.parse(res));
    });
  }
  
  const deletel = (id) => {
    SQLiteDatabaseModule.deleteLabharthi(`delete from labharthi where id="${id}"`);
    getall();
    
    
    // making request on my server to delete one labharthi from my db
    axios({
      url: authData.link + "deletelabharthi",
      method: "POST",
      data: {uid: id},
      headers: {
        "Authorization": "bearer " + authData.token
      }
    }).then((res) => console.log("delete in server = ", res))
      .catch((err) => console.log(err));
    
    alert("Labharthi Deleted!");
  }
  
  
  const modifyl = (item) => {
    navigation.navigate("Add", {type: "Modify", ...item});
  }
  
  
  
  useEffect(() => {
    const uns = navigation.addListener("focus", () => {
      getall();
    });
  }, [])
  
  
  return (
    <>
    
    {/* Header Area */}
    <View style={{flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', paddingLeft: 20, elevation: 5, height: 60}}>
      <Text  onPress={() => navigation.toggleDrawer()} style={{color: 'black', width: 30, fontSize: 22}}>&#9776; </Text>
      
      <Image style={{width: 50, height: 35}} source={require("../../assets/bene.png")} resizeMode="contain" />
      <Text style={{color: 'indigo', fontSize: 20, fontWeight: 'bold'}}>Labharthi Manager</Text>
    </View>
    
    
    
    {/* Labharthi Search Area */}
    
    <View style={styles.tv}>
      <Text style={{color: 'black', fontSize: 21}}> 🔍 </Text>
      <TextInput
        placeholder={`Search among ${data.count} labharthi data.`}
        onChangeText={(v) => {
          
          if(v.length == 0){
            setDupData(data);
            return ;
          }
          
          let result = data.data.filter((l) => {
            let e = v.toLowerCase();
            let a = l.name.toLowerCase().includes(e);
            let b = l.parent.toLowerCase().includes(e);
            let c = l.aadhaar.toLowerCase().includes(e);
            let d = l.contact.toLowerCase().includes(e);
            
            return a || b || c || d;
          });
          
          setDupData({count: result.length, data: result});
        }}
        style={styles.t}
      />
    </View>
      
    {/* Labharthi search area ends here */}
      
      
      
      
      
    {/* UnBackedUpData Data area */}
    { dupData.data.length != 0 ? <UnBackedUpData /> : null }
        
      
      
      
      
    {/* Actual Content Area */}
    <FlatList
      data={dupData.data}
      refreshing={false}
      onRefresh={() => getall()}
      renderItem={({item, index}) => {
        return (
          <View style={styles.v}>
            
            <View style={{width: '75%'}}>
              <Text style={{fontSize: 20, color: 'black'}}>{item.name}</Text>
              <Text style={{color: 'grey'}}>{item.parent}</Text>
              <Text style={{color: 'indigo', fontWeight: 'bold', fontSize: 16, paddingVertical: 5}}>{item.aadhaar}</Text>
              <Text style={{color: 'green', fontSize: 15}} onPress={() => calll(item.contact)}>📞 +91 {item.contact}</Text>
            
              
              {/* <Text style={styles.otp}>Token</Text> */}
            </View>
            
            <View style={{width: '25%', height: 90, paddingRight: 4, flexDirection: 'column', justifyContent: 'space-between'}}>
              <Text onPress={() => navigation.navigate("GetOTP", {item})} style={styles.token}>Token &rsaquo;</Text>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black', fontSize: 19}} onPress={() => modifyl(item)}>📝</Text>
                <Text style={{color: 'black', fontSize: 19}} onPress={() => deletel(item.id)}>🗑</Text>
              </View>
            </View>
            
          </View>
        );
      }}
      
    />
    
    {/* Actual Content Area Ends Here */}
    
      
      
      
    {/* Bottom Add button */}
    <TouchableOpacity 
      onPress={() => navigation.navigate("Add", {type: "Add", name: "", contact: "", aadhaar: "", parent: ""})} 
      style={{alignItems: 'center'}}>
      
      <Text style={{ width: '40%', borderRadius: 3, marginVertical: 5, padding: 10,  textAlign: 'center', backgroundColor: 'indigo', color: 'white'}}> +   Add</Text>
    </TouchableOpacity>
      
      
    </>
  );
};



const styles = StyleSheet.create({
  v: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 3,
    elevation: 3,
  
  },
  token: {
    backgroundColor: 'indigo',
    paddingVertical: 5, color: 'white', borderRadius: 2,
    textAlign: 'center'
  },
  tv: {
    borderColor: 'grey',
    borderWidth: 0.5,
    margin: 10,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 0
  },
  t: {
    padding: 7,
    color: 'black',
    width: '85%'
  },
  otp: {
    marginTop: 5,
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 500,
    padding: 2,
    width: 100
  }
})

export default LandingPage;