import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Screens
import Login from '../Screens/AuthScreens/Login';
import Register from '../Screens/AuthScreens/Register';
import Splash from '../Screens/AuthScreens/Splash';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
