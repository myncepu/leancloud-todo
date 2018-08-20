import { createSwitchNavigator } from 'react-navigation'

import LoginScreen from '../screens/Login'
import HomeScreen from '../screens/Home'

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
