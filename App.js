import React from 'react'
import AppNavigator from './SRC/AppNavigator/AppNavigator'
import Toast from "react-native-toast-message"
import { Provider } from 'react-redux'
import { store } from './SRC/Redux/Store/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <>
      <GestureHandlerRootView>
        <Provider store={store}>
          <AppNavigator></AppNavigator>
          <Toast></Toast>
        </Provider>
      </GestureHandlerRootView>

    </>
  )
}

export default App

