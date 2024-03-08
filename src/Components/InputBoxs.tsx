import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import {Colors} from '../Utils/Constants';

interface Props {
  value: any;
  image: any;
  onChangeText: (text: String) => void;
  placeholder?: any;
  keyboardType?: any;
  maxLength?: number;
  secureTextEntry?: any;
}

const InputBoxs: React.FC<Props> = ({
  value,
  image,
  onChangeText,
  keyboardType,
  maxLength,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={{height: 25, width: 25}} />
      <TextInput
        value={value}
        onChangeText={(text: string) => onChangeText(text)}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        style={styles.inputStyle}
        autoCapitalize={'none'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderColor: Colors.gray,
    borderWidth: 0.9,
    marginVertical: 10,
  },
  inputStyle: {
    width: '100%',
    color: Colors.black,
    fontSize: 14,
    marginLeft: 10,
  },
});

export default InputBoxs;
