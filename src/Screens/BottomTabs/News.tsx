import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const News = () => {
  return (
    <View style={styles.container}>
      <Text>News</Text>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
