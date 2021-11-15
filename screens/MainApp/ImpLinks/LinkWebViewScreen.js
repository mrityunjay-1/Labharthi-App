import React from 'react';
import {Text, StatusBar, View, ActivityIndicator} from 'react-native';

import {WebView} from 'react-native-webview';

const LinkWebViewScreen = ({navigation, route}) => {
  
  const [hidden, setHidden] = React.useState(false);
  
  const [progressBar, setProgressBar] = React.useState(false);
  
  React.useEffect(() => {
    const uns = navigation.addListener("focus", () => {
      setHidden(true);
    });
  });
  
  return (
    <>
      <StatusBar hidden={true} />
      
      
      {/* progress bar */}
      
      {
      progressBar
      ?
        <View style={{position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
          <ActivityIndicator color="indigo" size={80} />
        </View>
      :  
        null
      }

      {/* Webview */}
      
      <WebView
        source={{uri: route.params.link}}
        
        onLoadStart={() => setProgressBar(true) }
        onLoadEnd={() => setProgressBar(false)}
        
        injectedJavaScript={`
        document.getElementsByClassName("container")[0].style.padding="0px";
        document.getElementsByClassName("container")[0].style.overflow="hidden";
        
        var parenta = document.getElementById("aspnetForm");
        var childa = document.getElementsByClassName("scrollToTop")[0];
        
        parenta.removeChild(childa);
        
        
        var parentb = document.getElementsByClassName("container")[0];
        var childb = document.getElementById("footer");
        
        parentb.removeChild(childb);
        `}
      />
    </>
  );
};

export default LinkWebViewScreen;