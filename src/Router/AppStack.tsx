import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import TabNav from './TabNav';
import AddRoomScreen from '../Screens/Room/AddRoomScreen';
import ChatScreen from '../Screens/Room/ChatScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="AddRoomScreen" component={AddRoomScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
