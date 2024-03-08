import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import InputBoxs from '../../Components/InputBoxs';
import IButton from '../../Components/IButton';
import {images} from '../../assets';
import {Colors} from '../../Utils/Constants';

export default function AddRoomScreen({navigation}: any) {
  const [roomName, setRoomName] = useState<String>('');

  function handleButtonPress() {
    if (roomName.length > 0) {
      var ciphertext = `You have joined the room ${roomName}.`;

      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: ciphertext,
            createdAt: new Date().getTime(),
          },
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: ciphertext,
            createdAt: new Date().getTime(),
            system: true,
          });
          navigation.navigate('Home');
        });
    }
  }
  return (
    <SafeAreaView style={styles.rootContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButtonContainer}>
        <Image
          source={images.IC_BACK}
          style={{height: 25, width: 25}}
          tintColor={Colors.orange}
        />
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create a new chat room</Text>
        <InputBoxs
          placeholder={roomName}
          onChangeText={text => setRoomName(text)}
          image={images.APP_LOGO}
          value={roomName}
        />
        <IButton title="Create" onPress={() => handleButtonPress()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  closeButtonContainer: {paddingHorizontal: 1},
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});
