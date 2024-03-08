import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import {Colors} from '../../Utils/Constants';
import IButton from '../../Components/IButton';

export default function Home({navigation}: any) {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads: any = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  const RenderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.rowItem}
        onPress={() => navigation.navigate('ChatScreen', {thread: item})}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {_.startCase(item.name)}
        </Text>
        <Text style={styles.listDescription} numberOfLines={1}>
          {item.latestMessage.text}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderEmptyComponent = () => {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.listTitle}>No Rooms.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item: any) => item._id}
        renderItem={({item}) => RenderItem({item})}
        style={{paddingHorizontal: 15, paddingTop: 15}}
        ListEmptyComponent={() => RenderEmptyComponent()}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />

      <View style={styles.btnContainer}>
        <IButton
          title="Add Room"
          onPress={() => navigation.navigate('AddRoomScreen')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  rowItem: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 4, height: 4},
    elevation: 1,
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 10,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 14,
  },
  noDataContainer: {alignItems: 'center'},
  btnContainer: {paddingHorizontal: 15, marginBottom: 10},
});
