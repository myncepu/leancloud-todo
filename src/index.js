import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import DropdownAlert from 'react-native-dropdownalert'

import LoaddingScreen from './screens/Loadding'
import configureStore from './config/store'
import { DropDownHolder }from './utils/DropDownHolder'
import initLeancloudStorage from './config/initLeancloudStorage'
import AppNavigator from './config/routes'

initLeancloudStorage()

const { store, persistor } = configureStore()
export default () => (
  <View style={{width: '100%', height: '100%'}}>
    <Provider store={store}>
      <PersistGate loading={<LoaddingScreen />} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
    <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
  </View>
)
