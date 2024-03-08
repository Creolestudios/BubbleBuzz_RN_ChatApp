import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, Alert} from 'react-native';

import {images} from '../../assets';
import InputBoxs from '../../Components/InputBoxs';
import {Colors} from '../../Utils/Constants';
import {Strings} from '../../Utils/Strings';
import IButton from '../../Components/IButton';
import {LogUserIn} from '../../redux/auth/authActions';
import {useAppDispatch} from '../../hooks/Hooks';

interface Props {
  props: any;
  navigation: any;
}

const Login = (props: any) => {
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const dispatch = useAppDispatch();

  const isValidEmail = (email: String) => {
    var regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email.toLowerCase());
  };

  const Checking = () => {
    setLoading(true);
    if (!email) {
      Alert.alert('User Name Required!');
      setLoading(false);
    } else if (!password) {
      Alert.alert('Please Enter Password!');
      setLoading(false);
    } else if (!isValidEmail(email)) {
      Alert.alert('Invalid Email');
      setLoading(false);
    } else {
      dispatch(
        LogUserIn({
          email,
          password,
          onFailure: onFailure,
          onSuccess: onSuccess,
        }),
      );
    }
  };

  const onSuccess = () => {
    setLoading(false);
    Alert.alert('Success Login');
    props.navigation.replace('AppStack');
  };
  const onFailure = () => {
    setLoading(false);
    Alert.alert(`${Strings.loginFailed}`);
  };

  const onRegister = () => {
    props.navigation.navigate('Register');
  };

  const InputContainer = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={{height: 30}} />
        <Image source={images.APP_LOGO} style={{height: 80, width: 80}} />
        <View style={{height: 40}} />

        <InputBoxs
          image={images.USER}
          value={email}
          onChangeText={(t: String) => setEmail(t)}
          placeholder={Strings.emailAddress}
        />
        <InputBoxs
          image={images.LOCK}
          value={password}
          secureTextEntry
          onChangeText={(t: String) => setPassword(t)}
          placeholder={Strings.password}
        />
        <Text style={styles.forgotText}>{Strings.forgotPassword}</Text>
        <View style={{height: 20}} />
        <IButton
          onPress={() => Checking()}
          title={Strings.signIn}
          loading={loading}
        />
        <View style={{height: 20}} />
        <Text style={{...styles.forgotText, alignSelf: 'center'}}>
          <Text style={{color: Colors.black}}>{Strings.noAccount}</Text>{' '}
          <Text onPress={() => onRegister()}>{Strings.registerHere}</Text>
        </Text>
        <View style={{height: 20}} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>{InputContainer()}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Off_White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 4, height: 4},
    elevation: 1,
    shadowOpacity: 0.2,
    width: '90%',
  },
  forgotText: {
    color: Colors.orange,
    alignSelf: 'flex-end',
    marginTop: 10,
    fontSize: 12,
  },
  Btn: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 7,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
