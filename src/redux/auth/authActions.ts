import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserLoginCredentials} from '../../types/UserLoginCredentials';
import {onLogin} from './index';

export const LogUserIn = (userCredentials: UserLoginCredentials) => {
  return async (dispatch: any) => {
    try {
      await auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password,
        )
        .then((value: FirebaseAuthTypes.UserCredential) => {
          const payload = {
            Email: value.user.email,
            ID: value.user.uid,
          };
          dispatch(onLogin(payload));
          userCredentials.onSuccess();
        })
        .catch(err => {
          userCredentials.onFailure(err);
        });
    } catch (error) {
      console.log('Error!', error);
      userCredentials.onFailure(error);
    }
  };
};

export const RegisterUser = (userCredentials: UserLoginCredentials) => {
  return async (dispatch: any) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password,
        )
        .then((value: FirebaseAuthTypes.UserCredential) => {
          firestore()
            .collection('Users')
            .doc(value.user.email || undefined)
            .set({
              DateOfBirth: '',
              emailid: userCredentials.email,
              imageurl: null,
              phonenuber: '',
            })
            .then(() => {
              userCredentials.onSuccess();
            })
            .catch(error => {
              console.log('something went Wrong', error);
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            userCredentials.onFailure('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            userCredentials.onFailure('That email address is invalid!');
          }

          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const LogoutUser = (userCredentials: UserLoginCredentials) => {
  return async (dispatch: any) => {
    try {
      await auth()
        .signOut()
        .then(() => {
          userCredentials.onSuccess();
        })
        .catch(err => {
          console.log('Error in sign out', err);
          userCredentials.onFailure('Something went wrong');
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCurrentUser = () => {
  return async (dispatch: any) => {
    try {
      const user =  auth().currentUser;
      return {
        email : user?.email,
        uid: user?.uid
      }
    } catch (error) {
      
    }
  }
}
