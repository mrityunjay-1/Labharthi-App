import React from 'react';
import { Text, View, Pressable, FlatList } from 'react-native';


const links = [
  {
    name: "Add Labharthi",
    hindi: "नया लाभार्थी जोड़ें",
    desc: "",
    link: "http://164.100.251.19/AanganPublic/APP/Registration.aspx"
  },
  {
    name: "Labharthi Login",
    hindi: "लाभार्थी लॉगिन",
    desc: "",
    link: "http://164.100.251.19/AanganPublic/Login.aspx"
  },
  {
    name: "Change Labharthi Phone Number",
    hindi: "लाभार्थी का फोन नंबर बदलें",
    desc: "",
    link: "http://164.100.251.19/AanganPublic/changeMobile.aspx"
  }
];

const ImportantLinksScreen = ({navigation}) => {
  return (
    <>
      <View style={{padding: '3%', height: 60, justifyContent: 'center', elevation: 10, backgroundColor: 'white'}}>
        <Text style={{fontSize: 20,  color: 'black', fontWeight: 'bold', paddingLeft: 20}}>🔗  Important Links </Text>
      </View>
      
      <View style={{ padding: '3%', marginTop: 10, flexDirection: 'row', backgroundColor: 'yellow', alignItems: 'center'}}>
        <Text style={{width: '10%', textAlign: 'center', fontSize: 30 }}>⚠</Text>
        <View style={{width: '90%', }}>
          <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}> सरकारी अधिकारिक वेबसाइट पर काम करने हेतु </Text>
          <Text style={{color: 'black', fontSize: 12, textAlign: 'center'}}> Working on Government Official Website  </Text>
        </View>
      </View>
    
      <FlatList
        data={links}
        renderItem={({item}) => {
          return (
            <>
              <Pressable onPress={() => navigation.navigate("LinkWebView", {link: item.link})}
               style={{marginTop: 10, padding: 15, backgroundColor: 'lightblue', marginRight: 10, borderRadius: 5}}
              >
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}> {item.hindi} </Text>
                <Text> {item.name} </Text>
              </Pressable>
            </>
          );
        }}
      />
    </>
  );
};

export default ImportantLinksScreen;