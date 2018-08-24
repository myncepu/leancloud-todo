import React from 'react'
import { StyleProvider } from 'native-base'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import getTheme from './native-base-theme/components'
import orange from './native-base-theme/variables/orange'

import AuthLoadingScreen from '../screens/AuthLoading'
import LoaddingScreen from '../screens/Loadding'
import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import HomeScreen from '../screens/Home'
import configurEStyleSheet from './theme'

configurEStyleSheet({ theme: 'orange', primaryColor: '#D57A66' })

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
}, {
  initialRouteName: 'Login'
})

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Loadding: {
    screen: LoaddingScreen,
  },
}, {
  initialRouteName: 'Home'
})

const AppNavigator = createSwitchNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen,
  },
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppStack,
  }
}, {
  initialRouteName: 'AuthLoading',
})

export default () => (
  <StyleProvider style={getTheme(orange)}>
    <AppNavigator />
  </StyleProvider>
)
