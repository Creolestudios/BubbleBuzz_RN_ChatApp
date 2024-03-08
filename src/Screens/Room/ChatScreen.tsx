import React, {useState, useContext, useEffect} from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
  Actions,
  ActionsProps,
} from 'react-native-gifted-chat';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';

import {AuthContext} from '../../Router/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {images} from '../../assets';
import {Colors} from '../../Utils/Constants';
import {useAppSelector} from '../../hooks/Hooks';
import {getCurrentUser} from '../../redux/auth/authActions';

export default function ChatScreen({route}: any) {
  const [messages, setMessages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const {thread} = route.params;

  // const  = user.toJSON();
  const currentUser = useAppSelector((state: any) => state.auth.currentUser);
  // const  = getCurrentUser();

  async function handleSend(messages: any) {
    const text = messages[0].text;
    var ciphertext = text;

    firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text: ciphertext,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.ID,
          email: currentUser.Email,
        },
      });

    await firestore()
      .collection('THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text: ciphertext,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }
  async function handleImageSend(image: any) {
    firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        image,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.ID,
          email: currentUser.Email,
        },
      });
  }

  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            image: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.orange,
          },
          left: {
            backgroundColor: '#999',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Image source={images.SEND} style={{height: 40, width: 40}} />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <Image source={images.DOWN_ARROW} style={{height: 25, width: 25}} />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  //***************************************************************************888 */
  function renderActions(props) {
    return (
      <Actions
        {...props}
        options={{
          ['Camera']: handlePickImage,
          ['Gallery']: handleGalleryImage,
        }}
        // icon={() => <Ionicons name="camera" size={28} color="#000" />}
        onSend={args => console.log(args)}
      />
    );
  }
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App Needs Camera Permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const handlePickImage = async () => {
    const options = {
      title: 'Select Pic',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a Photo',
      maxWidth: 256,
      maxHeight: 256,
      allowsEditing: true,
      noData: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          // do nothing
        } else if (response.error) {
          // alert error
        }
        const uri = response.uri;
        submitPhoto(uri);
      });
    }
  };
  const handleGalleryImage = async () => {
    const options = {
      title: 'Select Pic',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a Photo',
      maxWidth: 256,
      maxHeight: 256,
      allowsEditing: true,
      noData: true,
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        // do nothing
      } else if (response.error) {
        // alert error
      } else {
        const uri = response.uri;
        submitPhoto(uri);
      }
    });
  };
  const submitPhoto = async imageUri => {
    const uploadUri = imageUri;
    var parts = uploadUri.split('/');
    let fileName = parts[parts.length - 1];
    const storageRef = storage().ref(`chatPic/${fileName}`);
    const task = storageRef.putFile(uploadUri);
    try {
      //await storage().ref(fileName).putFile(uploadUri);
      await task;
      const url = await storageRef.getDownloadURL();
      handleImageSend(url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  //***************************************************************************888 */
  return (
    <SafeAreaView style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{_id: currentUser.ID, avatar: currentUser.imageurl}}
        placeholder="Type your message here..."
        alwaysShowSend
        showUserAvatar
        scrollToBottom
        renderBubble={renderBubble}
        renderLoading={renderLoading}
        renderSend={renderSend}
        // renderActions={renderActions}
        scrollToBottomComponent={scrollToBottomComponent}
        renderSystemMessage={renderSystemMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: Colors.orange,
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
