import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


// AuthContext
import AuthContext, { AuthModule } from './screens/Context/AuthContext';



// welcome and auth screens
import WelcomeScreen from './screens/AuthScreens/WelcomeScreen';
import EnterContactScreen from './screens/AuthScreens/EnterContactScreen';
import EnterOTPScreen from './screens/AuthScreens/EnterOTPScreen';

// customenavs
import CustomDrawerContent from './screens/CustomNavigation/CustomDrawerContent';

// MainApp
import LandingScreen from './screens/MainApp/LandingScreen';
import AddLabharthiScreen from './screens/MainApp/AddLabharthiScreen';
import GetOTPScreen from './screens/MainApp/GetOTPScreen';

// Other Drawer Screens
import FeedbackScreen from './screens/FeedbackScreen';
import ExportInExcelScreen from './screens/ExportInExcelScreen';

// guide
import HowToUse from './screens/Guide/HowToUse';
import GuideDetails from './screens/Guide/GuideDetails';


// ImportantLinkStack Screens
import ImportantLinksScreen from './screens/MainApp/ImpLinks/ImportantLinksScreen';
import LinkWebViewScreen from './screens/MainApp/ImpLinks/LinkWebViewScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const LaStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Add" component={AddLabharthiScreen} initialParams={{type: "add", name: "", parent: "", aadhaar: "", cnotact: ""}}/>
    </Stack.Navigator>      
  );
}

const GuideStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HowToUse" component={HowToUse} />
      <Stack.Screen name="GuideDetails" component={GuideDetails} />
    </Stack.Navigator> 
  );
};


const ImpLinksStack = () => {
  return (
    <Stack.Navigator initialRouteName="ImportantLink" screenOptions={{headerShown: false}}>
      <Stack.Screen name="ImportantLink" component={ImportantLinksScreen} />
      <Stack.Screen name="LinkWebView"  component={LinkWebViewScreen} />
    </Stack.Navigator>
  );
}


const MainApp = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
        <Tab.Screen name="Home" component={LaStack} options={{tabBarIcon: () => <Text style={{fontSize: 20}}> 🏡 </Text>}}  />
        <Tab.Screen name="GetOTP" component={GetOTPScreen}
          options={{tabBarIcon: () => <Text style={{fontSize: 20}}> 📢 </Text>}}
          initialParams={{item: {id: "", name: "", parent: "", aadhaar: "", contact: ""}}}
        />
        <Tab.Screen name="ImporatantLinks" component={ImpLinksStack} options={{tabBarIcon: () => <Text style={{fontSize: 20}}>🔗</Text>}}  />
        
      </Tab.Navigator>
    </>
  );
}



const App = () => {
  const {data} = useContext(AuthContext);
  
  return (
    <>
      {
        data.isLoggedIn
        ?
        
        <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} /> }>
            <Drawer.Screen name="MainApp"
              component={MainApp}
              options={{headerShown: false}}
                
            />
            <Drawer.Screen name="Feedback" component={FeedbackScreen} options={{headerShown: false}} />
            <Drawer.Screen name="Guide" component={GuideStack} options={{headerShown: false}} />
            <Drawer.Screen name="ExportInExcelScreen" component={ExportInExcelScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
        
        :
        
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Contact" component={EnterContactScreen} />
            <Stack.Screen name="OTP" component={EnterOTPScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
};

export default () => {
  return (
    <AuthModule>
      <App />
    </AuthModule>
  );  
};