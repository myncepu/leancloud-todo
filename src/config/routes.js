import React from 'react'
import { StyleProvider } from 'native-base'
import { createSwitchNavigator } from 'react-navigation'
import getTheme from '../native-base-theme/components'
import orange from '../native-base-theme/variables/orange'

import LoginScreen from '../screens/Login'
import HomeScreen from '../screens/Home'
import configurEStyleSheet from './theme'

configurEStyleSheet({ theme: 'orange', primaryColor: '#D57A66' })

const AppNavigator = createSwitchNavigator({
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  }
}, {
  initialRouteName: 'Login',
})

export default () => (
  <StyleProvider style={getTheme(orange)}>
    <AppNavigator />
  </StyleProvider>
)
