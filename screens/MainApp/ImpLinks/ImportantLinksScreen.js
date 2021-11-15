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
      <View style={{height: 50, justifyContent: 'center', elevation: 10, marginBottom: 10}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', paddingLeft: 20}}>🔗  Important Links </Text>
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