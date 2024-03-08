import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../Utils/Constants';

interface Props {
  onPress: () => void;
  loading?: Boolean;
  title: String;
}

const IButton: React.FC<Props> = ({onPress, loading, title}) => {
  return (
    <TouchableOpacity style={styles.Btn} onPress={() => onPress()}>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.white} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default IButton;

const styles = StyleSheet.create({
  Btn: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 7,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
