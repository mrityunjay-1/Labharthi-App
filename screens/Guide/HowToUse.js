import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const HowToUse = ({navigation}) => {
  return (
    <>
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