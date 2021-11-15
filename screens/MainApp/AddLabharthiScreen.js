import React, {useEffect, useState, useContext} from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, NativeModules, ScrollView } from 'react-native';

import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const { SQLiteDatabaseModule, SharedPreferenceModule } = NativeModules;


const AddLabharthiScreen = ({navigation, route}) => {
  
  const { data } = useContext(AuthContext);
  
  const [name, setName] = useState(route.params.name);
  const [parent, setParent] = useState(route.params.parent);
  const [aadhaar, setAadhaar] = useState(route.params.aadhaar);
  const [contact, setContact] = useState(route.params.contact);
  
  
  // console.log(route.params);
  
  const verify = () => {
    let x = "";
    if(name == ""){
      x += "Please Enter Name \n";
    }
    if(parent == ""){
      x += "Please Enter Parent Name \n";
    }
    if(aadhaar == "" || aadhaar.length !== 12){
      x += "Please Enter Aadhaar \n";
    }
    if(contact == "" || contact.length !== 10){
      x += "Please Enter Contact \n";
    }

    if(x.length != 0){
      alert(x);
      return false;
    }
    
    const uid = [name.split("").slice(0, 4).join(""), aadhaar.split("").slice(0, 10).join("")].join("");

    // saving locally if net is not connected!
    SQLiteDatabaseModule.getNetInfo((r) => {
      if(r == "false"){
        
        SharedPreferenceModule.getPendingLabharthi("pendingLabharthis", (l) => {
          l1 = JSON.parse(l);
          console.log("l1 = ", l1);
          
          l1 = [...l1, {uid, name, parent, contact, aadhaar}]
          
          // saving locally because internet not available
          SharedPreferenceModule.addPendingLabharthi(
            "pendingLabharthis",
            JSON.stringify(l1),
            (r) => { console.log("labharthi added as pending...") }  
          );
          
        });
      }else{
        
        // saving to the server internet is available
        // making an api request here
        
        console.log(data);
        
        
        axios({
          method: "POST",
          url: data.link + "addlabharthi",
          data: {uid, name, parent, aadhaar, contact},
          headers: {
            "Authorization": "bearer " + data.token
          }
           
        }).then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        
      }
    });
    
    return true;
  }
  
  
  
  const save = () => {
    if(verify()){
      
      // adding to the local database
      const uid = [name.split("").slice(0, 4).join(""), aadhaar.split("").slice(0, 10).join("")].join("");
      
      SQLiteDatabaseModule.addLabharthi(`insert into labharthi values("${uid}", "${name}", "${parent}", "${aadhaar}", "${contact}", "")`);
      
      
      alert("Labharthi Added successfully");

      setName("");
      setParent("");
      setAadhaar("");
      setContact("");

      navigation.navigate("Landing");
    }
  }
  
  
  
  
  const modify = () => {
      
      // modifying locally
      SQLiteDatabaseModule.updateLabharthi(`update labharthi set name="${name}", parent="${parent}", aadhaar="${aadhaar}", contact="${contact}" where id="${route.params.id}"`);
      
      
      // modifying on server
      axios({
        method: "POST",
        url: data.link + "updatelabharthi",
        data: {uid: route.params.id, name, parent, aadhaar, contact},
        headers: {
          "Authorization": "bearer " + data.token
        }
      }).then(res => console.log(res))
        .catch(err => console.log(err));
      
      
      // alert user about modified user
      alert("Labharthi Modified Successfully");
      
      setName("");
      setParent("");
      setAadhaar("");
      setContact("");
      navigation.navigate("Landing");
    
  }
  
  
  
  
  return (
    <ScrollView>
      <View style={{backgroundColor: 'white', elevation: 5, height: 55, flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{paddingLeft: 15, color: 'indigo', fontWeight: 'bold', fontSize: 20}}> 👩‍👩‍👧‍👧    {route.params.type} Labharthi</Text>
      </View>
    
    
      <View style={styles.v}>
        <Text style={{color: 'indigo', fontWeight: 'bold'}}>लाभार्थी का नाम</Text> 
        <TextInput
          value={name}
          onChangeText={(v) => setName(v)}
          style={styles.t}
          placeholder="लाभार्थी का नाम"
        />
      </View>
      
      
      
      <View style={styles.v}>
        <Text style={{color: 'indigo', fontWeight: 'bold'}}>माता / पिता का नाम</Text> 
        <TextInput
          value={parent}
          onChangeText={(v) => setParent(v)}
          style={styles.t}
          placeholder="माता / पिता का नाम"
        />
      </View>
      
      
      
      
      <View style={styles.v}>
        <Text style={{color: 'indigo', fontWeight: 'bold'}}>आधार नं० {aadhaar.length === 12 ? <Text style={{color: 'green'}}>       ✔ </Text> : <Text>       ❌ (should be 12 digits)</Text>} </Text> 
        <TextInput
          value={aadhaar}
          onChangeText={(v) => setAadhaar(v)}
          style={styles.t}
          placeholder="आधार नं०"
          keyboardType="number-pad"
        />
      </View>
      
      
      
      <View style={styles.v}>
        <Text style={{color: 'indigo', fontWeight: 'bold'}}>फोन नं०{contact.length === 10 ? <Text style={{color: 'green'}}>       ✔ </Text> : <Text>       ❌ (should be 10 digits)</Text>}</Text> 
        <TextInput
          value={contact}
          onChangeText={(v) => setContact(v)}
          style={styles.t}
          placeholder="फोन नं०"
          keyboardType="number-pad"
        />
      </View>
      
      
      
      {
        route.params.type == "Add"
        ?
          
          <TouchableOpacity onPress={save}>
            <Text style={{margin: 15, fontWeight: 'bold', padding: 10, borderRadius: 3, backgroundColor: 'indigo', color: 'white', textAlign: 'center'}}>Save</Text>
          </TouchableOpacity>
        :  
          <TouchableOpacity onPress={modify}>
            <Text style={{margin: 15, fontWeight: 'bold', padding: 10, borderRadius: 3, backgroundColor: 'indigo', color: 'white', textAlign: 'center'}}>Modify</Text>
          </TouchableOpacity>
      }
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  v: {
    borderColor: 'indigo', borderWidth: 1, margin: 15, marginBottom: 0, borderRadius: 5, padding: 15, elevation: 5, backgroundColor: 'white'
  },
  t: {
    color: 'black', padding: 3, fontSize: 16, borderBottomWidth: 0.3, borderColor: 'indigo', borderRadius: 3, marginTop: 10
  }
})


export default AddLabharthiScreen;