import React from 'react'
import { StyleProvider } from 'native-base'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import getTheme from './native-base-theme/components'
import orange from './native-base-theme/variables/orange'

import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import HomeScreen from '../screens/Home'
import configurEStyleSheet from './theme'

configurEStyleSheet({ theme: 'orange', primaryColor: '#D57A66' })

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
}, {
  initialRouteName: 'Login'
})

const AppNavigator = createSwitchNavigator({
  LoginStack: {
    screen: LoginStack,
  },
  Home: {
    screen: HomeScreen,
  }
}, {
  initialRouteName: 'LoginStack',
})

export default () => (
  <StyleProvider style={getTheme(orange)}>
    <AppNavigator />
  </StyleProvider>
)
