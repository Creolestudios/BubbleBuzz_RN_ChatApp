import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {Text, View, ToastAndroid, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext();

const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (
          email: string,
          password: string,
          onSuccess: () => {},
          onFailure: () => {},
        ) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                onSuccess();
              })
              .catch(err => {
                onFailure();
              });
          } catch (e) {
            //console.log(e);
            ToastAndroid.show(
              'Email or Password is Incorrect',
              ToastAndroid.SHORT,
            );
          }
        },

        register: async (email: string, password: string) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                firestore()
                  .collection('Users')
                  .doc(auth().currentUser.email)
                  .set({
                    DateOfBirth: '',
                    emailid: email,
                    imageurl: null,
                    phonenuber: '',
                  })
                  .then(() => {
                    Alert.alert('Register successfully');
                  })
                  .catch(error => {
                    console.log('something went Wrong', error);
                  });
              })
              .catch(error => {
                console.log('something went Wrong', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
