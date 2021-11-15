import React from 'react';
import {Text, View, NativeModules} from 'react-native';
import {WebView} from 'react-native-webview';

const {SQLiteDatabaseModule} = NativeModules;

const GetOTPScreen = ({navigation, route}) => {
  
  let webview = React.useRef();
  const [otp, setOtp] = React.useState();
  
  // console.log("route.params.item = ", route.params.item);
  
  // updating otp in labharthi form
  const updateotp = () => {
    SQLiteDatabaseModule.update(`update labharthi set otp="${otp}" where id="${route.params.item.id}"`);
  }
  
  
  
  React.useEffect(() => {
    const uns = navigation.addListener("focus", () => {
      webview.current.reload();
      webview.current.clearHistory();
      
      // console.log(route.params.aadhaar);      
      // console.log("reloaded");
    })
    
    return uns;
  }, []);
  
  
  
  return (
    <>
    
      <View style={{elevation: 5, padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text onPress={() => webview.current.goBack()} style={{color: 'indigo', fontSize: 20, paddingLeft: 15}}>&lsaquo; Back</Text>
        <Text onPress={() => webview.current.goForward  ()} style={{color: 'indigo', fontSize: 20, paddingRight: 15}}>&rsaquo; Next</Text>
      </View>
    
      <WebView
        startInLoadingState={true}
        originWhitelist={['*']}
        ref={webview}
        source={{uri: "http://164.100.251.19/AanganPublic/GetToken.aspx"}}
        injectedJavaScript={ `document.getElementById("ctl00_MainContent_txtAadhar").value = ${route.params.item.aadhaar}`}
        
        // injectedJavaScriptBeforeContentLoaded={}
        
        onMessage={(res) => setOtp(res.nativeEvent.data) }
        
        onNavigationStateChange={() => {
          
          webview.current.injectJavaScript(`
          let token = "";
          
          let tr1 = document.getElementsByTagName("tr");
          for(let i = 1; i < tr1.length; i++){
            token += tr1[i].getElementsByTagName("td")[7].innerText.split(":")[2] + ", ";
          }
          
          // let x = document.getElementsByTagName("tr")[2].getElementsByTagName("td")[7].innerText.split(':')[2];
          
          window.ReactNativeWebView.postMessage(token);
          
          `);          
        }}
      
      />
      
      
      
    </>
  );
};

export default GetOTPScreen;