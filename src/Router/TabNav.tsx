import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../Utils/Constants';
//Screens
import Home from '../Screens/BottomTabs/Home';
import Profile from '../Screens/BottomTabs/Profile';

type TabButtons = {
  img?: any;
  color?: any;
  text?: String;
  focused?: Boolean;
};

const Tab = createBottomTabNavigator();

const TabButton = (TabButtons: TabButtons) => {
  return (
    <View style={[styles.image_titleContainer]}>
      <Image
        source={TabButtons.img}
        style={{height: 24, width: 24, marginBottom: 3}}
        resizeMode="contain"
        tintColor={TabButtons.color}
      />
      <Text
        style={{
          ...styles.textStyle,
          color: TabButtons.focused ? Colors.orange : Colors.black,
        }}>
        {TabButtons.text}
      </Text>
    </View>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.orange,
        tabBarStyle: {
          height: '10%',
          backgroundColor: Colors.white,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{rightNavButtons: []}}
        options={{
          tabBarIcon: ({color, focused}) => (
            <TabButton
              img={images.HOME}
              focused={focused}
              color={color}
              text={'Home'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, focused}) => (
            <TabButton
              img={images.USER}
              focused={focused}
              color={color}
              text={'Profile'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image_titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    paddingTop: Platform.OS == 'android' ? 0 : '12%',
  },

  textStyle: {
    color: Colors.black,
    fontSize: 12,
  },
});

export default TabNav;
