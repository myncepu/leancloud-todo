import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert'

import store from './config/store'
import { DropDownHolder }from './utils/DropDownHolder'
import initLeancloudStorage from './config/initLeancloudStorage'
import AppNavigator from './config/routes'

initLeancloudStorage()

export default () => (
  <View style={{width: '100%', height: '100%'}}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
  </View>
)