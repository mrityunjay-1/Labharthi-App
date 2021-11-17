import React, {useEffect} from 'react';
import { Text, View, PermissionsAndroid, Button, NativeModules } from 'react-native';
import RNFS from 'react-native-fs';

const {SQLiteDatabaseModule} = NativeModules;

const ExportInExcelScreen = ({navigation}) => {
  
  const path =  RNFS.DownloadDirectoryPath + "/labharthi_list.csv";
  
  
  // console.log("path = ", path);
  
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
  
  
  
  // Getting all Labharthi Data
  function save_file () {
    let data = `id,name,parent_name,aadhaar,contact\n`;

    SQLiteDatabaseModule.getAllLabharthi((res) => {
      res = res.replace('},]}', '}]}');
      const l = JSON.parse(res);
      
      
      l.data.forEach((a) => {
        data += `${a.id},${a.name},${a.parent},${a.aadhaar},${a.contact}\n`;
      });
      
      
      
      RNFS.writeFile(path, data)
      .then(() => {  alert("File Successfully saved!"); navigation.goBack(); })
      .catch(err => console.log("error while generating excel file...", err));

    });
  }
  
  
  
  useEffect(() => {
    
    navigation.addListener("focus", () => {
    
    (
      async () => { 
        const res = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if(!res){
          try{
            await take_permission();
            await save_file();
          }catch(e){
            alert("Allow Storage Permission to save file!");
          }
        }else{
          save_file();
        }  
      
      }
    )();
    
    });
    
  });
  
  
  return (
    <>
      <Text style={{textAlign: 'center', padding: 20}}> 📁 File Exported Successfully... </Text>
      
      
      <View style={{padding: 20}}>
        <Button title="Show in Folder..." />
      </View>
    </>
  );
};

export default ExportInExcelScreen;