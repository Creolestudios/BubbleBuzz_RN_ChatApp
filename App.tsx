import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import Router from './src/Router/Router';
import AuthProvider from './src/Router/AuthProvider';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default App;
