import { createSwitchNavigator } from 'react-navigation'

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

export default AppNavigator
