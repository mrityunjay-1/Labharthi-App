import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const HowToUse = ({navigation}) => {
  return (
    <>
      {/* Header Area */}
      <View style={{flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', paddingLeft: 20, elevation: 5, height: 60}}>
        <Text  onPress={() => navigation.toggleDrawer()} style={{color: 'black', width: 30, fontSize: 22}}>&#9776; </Text>
        
        <Text style={{color: 'indigo', fontSize: 20, fontWeight: 'bold'}}> 🔰 Guide </Text>
      </View>
    
    
      <View>
        
        <TouchableOpacity onPress={() => navigation.navigate("GuideDetails")} style={{borderRadius: 3, backgroundColor: 'lightblue', padding: 15, margin: 8, marginLeft: 0}}>
          <Text>How To Add Labharthi </Text>
          <Text>लाभार्थी कैसे जोड़ें ? </Text>
        </TouchableOpacity>
                
      </View>
    </>
  );
};

export default HowToUse;