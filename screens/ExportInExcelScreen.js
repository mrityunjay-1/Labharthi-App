import React, {useEffect} from 'react';
import { Text, View, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';

const ExportInExcelScreen = ({navigation}) => {
  
  const path =  RNFS.DownloadDirectoryPath + "/labharthi_list.csv";
  
  
  console.log("path = ", path);
  
  const take_permission = async () => {
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Labharthi App File Storage Permission",
          message: "Allow To Store Excel File In Android App Locally",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      if(granted == PermissionsAndroid.RESULTS.GRANTED){
        return true;
      }else{
        return false;
      }
      
      
    }catch(e){
      console.log("Error while getting permission ", e);
      return false;
    }
  }
  
  
  useEffect(() => {
    
    // take permissio
    
    take_permission()
      .then(res => {
        if(res){
          RNFS.writeFile(path, "id,name,parent_name,aadhaar,contact", "utf8")
            .then((res) => {
              
              alert("File Successfully saved!");
              navigation.goBack();
              
            })
            .catch(err => console.log("error while generating excel file...", err));
        }
      })
      .catch(err => {
        alert("Something Went Wrong!");
      })
    
  }, []);
  
  
  return (
    <>
      <Text> abc </Text>
    </>
  );
};

export default ExportInExcelScreen;