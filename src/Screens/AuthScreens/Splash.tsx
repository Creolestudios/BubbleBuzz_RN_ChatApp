import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../Utils/Constants';
import {AuthContext} from '../../Router/AuthProvider';

const Splash = (props: any) => {
  const {setUser, logout}: any = useContext(AuthContext);
  const [inisiallizing, setInisiallizing] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    setUser(user);
    if (user) {
      props.navigation.replace('AppStack');
    } else {
      props.navigation.replace('Login');
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.black} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
