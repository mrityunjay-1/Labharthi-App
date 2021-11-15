import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';

const GuideDetails = () => {
  return (
    <ScrollView>
    <View style={{margin: 10}}>
      <Text style={{textAlign: 'center', paddingTop: 20}}>How To Add Labharthi</Text>
      <Text style={{textAlign: 'center', paddingBottom: 20}}>लाभार्थी कैसे जोड़ें ? </Text>

      <Text style={{color: 'white', padding: 15, backgroundColor: 'red', marginVertical: 10}}>Step 1</Text>
      <Image
        source={{uri: "https://raw.githubusercontent.com/mrityunjay-1/projects-images/main/guide_add_labharthi_img1.jpg"}}
        style={{width: '100%', height: 500}}
        resizeMode="contain"
      />


      <Text style={{color: 'white', padding: 15, backgroundColor: 'red', marginVertical: 10}}>Step 2</Text>
      <Image
        source={{uri: "https://raw.githubusercontent.com/mrityunjay-1/projects-images/main/guide_add_labharthi_img2.jpg"}}
        style={{width: '100%', height: 500}}
        resizeMode="contain"
      />
      
      
      <Text style={{color: 'white', padding: 15, backgroundColor: 'red', marginVertical: 10}}>Step 3</Text>
      <Image
        source={{uri: "https://raw.githubusercontent.com/mrityunjay-1/projects-images/main/guide_add_labharthi_img3.jpg"}}
        style={{width: '100%', height: 500}}
        resizeMode="contain"
      />
      
      
    </View>
    
      <Text style={{textAlign: 'center', color: 'indigo', marginVertical: 20}}>Congrats! You Successfully Added your Labharthi..</Text>
    
    
    </ScrollView>
  );
};

export default GuideDetails;