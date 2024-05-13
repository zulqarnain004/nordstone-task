import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from './screens/Login';
import Register from './screens/Register';
import Notification from './screens/Notification';
import Calculator from './screens/Calculator';
import TextScreen from './screens/TextScreen';
import {auth} from './firebase';
import Camera from './screens/Camera';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  const [user, setUser] = useState(null); // State to manage user authentication status

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      setUser(authUser);
      SplashScreen.hide();
    });

    return unsubscribe;
  }, []);

  const MainStack = () => (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
  const MainTabs = () => (
    <Tab.Navigator>
      <Tab.Screen name="notify" component={Notification} />
      <Tab.Screen name="camera" component={Camera} />
      <Tab.Screen name="snapshot" component={TextScreen} />
      <Tab.Screen name="abacus" component={Calculator} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
