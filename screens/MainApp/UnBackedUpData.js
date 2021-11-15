import React, {useState, useContext} from 'react';
import { NativeModules, Text, View, ActivityIndicator } from 'react-native';

const { SharedPreferenceModule } = NativeModules;

import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const UnBackedUpData = (props) => {
  
  const {data} = useContext(AuthContext);
  
  const [displayBox, setDisplayBox] = useState(true);
  const [pendingData, setPendingData] = useState(false);
  const [showSpinIcon, setShowSpinIcon] = useState(false);
  const [pData, setPData] = useState([]);
  
  // console.log("UnBackedUpData = ", SharedPreferenceModule);


  const backupdata = async () => {
    setShowSpinIcon(true);
    
    // sending data to my server
    try{
      
      const res = await axios({
        method: "POST",
        url: data.link + "backup",
        data: pData,
        headers: {
          "Authorization": "bearer " + data.token
        }
      });
      
      console.log(res);
      
      // after taking backup to my server vanishing data in SharedPreferences
      SharedPreferenceModule.vanishLabharthi("pendingLabharthis", (r) => {
        setPendingData(false);
        setShowSpinIcon(false);
        
        alert("All Data has been Backed Up!");
      })
      
    }catch(e){
      alert(e);
    }
    
  }
  
  
  
  React.useEffect(() => {

    SharedPreferenceModule.getPendingLabharthi("pendingLabharthis", (r) => {
      console.log("data available = ", r);
      
      let p = JSON.parse(r);
      setPData(p);
      p.length != 0 ? setPendingData(true) : setPendingData(false) ;
    });
    
  }, []);
  
  
  return (
    <>
      {
      displayBox 
      ?
        <>
          {
            pendingData ?
              <>
                {
                  showSpinIcon ?
                  <Text> Backing up data <ActivityIndicator size={30} color="white" /> </Text> :
                  <View style={{margin: 10, backgroundColor: 'red', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{ color: 'white', padding: 10}} onPress={backupdata}> Data Available for Backup. Start Backup... </Text>
                    <Text style={{ color: 'white', textAlignVertical: 'center', fontSize: 25}} onPress={() => setDisplayBox(false)} > &times;  </Text>
                  </View>
                }
              </>
              :
              <View style={{margin: 10, backgroundColor: 'green', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ color: 'white', padding: 10}}> All Data Backed up. </Text>
                <Text style={{ color: 'white', textAlignVertical: 'center', fontSize: 25}} onPress={() => setDisplayBox(false)} > &times;  </Text>
              </View>
          }
        </>
      :
        null
      }
        
    </>
  );
};

export default UnBackedUpData;