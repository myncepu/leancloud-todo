import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connectStyle, Item, Input, Label, Icon, Button, Text } from 'native-base'
import {
  NetInfo,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  View
} from 'react-native'

import { loginRequest, registerRequest } from '../actions/user'
import { changeConectionStatus } from '../actions/network'
import { DropDownHolder }from '../utils/DropDownHolder'
import { LogoText } from '../components/Text'
import { Container } from '../components/Container'

const {width} = Dimensions.get('window')

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      logining: false,
    }
  }

  static propTypes = {
    logined: PropTypes.bool,
    loginRequest: PropTypes.func,
    error: PropTypes.string,
    isConnected: PropTypes.bool,
  }

  static navigationOptions = ({ navigation }) => {
    const isConnected = navigation.getParam('isConnected', false)
    const WarnButton = () => (
      <Button
        onPress={this.handleLogin}
        transparent
        style={{ flex: 1, marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon name="ios-warning" />
      </Button>
    )
    return {
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerLeft: isConnected ? null : <WarnButton />,
    }
  }

  handleLogin = () => {
    this.setState({ logining: true })
    if (this.state.username && this.state.password) {
      const { username, password } = this.state
      this.props.loginRequest(username, password)
    }
  }

  handleRegister = () => {
    this.props.navigation.navigate('Register')
  }

  componentDidMount = () => {
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange)
    if (this.props.isConnected) {
      this.props.navigation.setParams({ isConnected: this.props.isConnected })
    }
  }

  componentWillUnmount = () => {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange)
  }

  handleConnectivityChange = (connectionInfo) => {
    this.props.changeConectionStatus(connectionInfo)
  }

  componentDidUpdate(prevProps) {
    if (this.props.logined) {
      this.props.navigation.navigate('Home')
      this.setState({ logining: false })
    }
    if (this.props.error && prevProps.error != this.props.error) {
      DropDownHolder.getDropDown().alertWithType('error', 'Error', this.props.error)
      this.setState({ logining: false })
    }
    if (this.props.isConnected && prevProps.isConnected != this.props.isConnected) {
      this.props.navigation.setParams({ isConnected: this.props.isConnected })
      this.setState({ logining: false })
    }
  }

  render() {
    return (
      <Container>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{ flex: 1, width, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ paddingBottom: 100 }}>
            <LogoText>LeanTodo</LogoText>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, backgroundColor: '#FFFFFF' }}>
            <Item floatingLabel>
              <Label>用户名</Label>
              <Input
                onChangeText={username => this.setState({username})}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label>密码</Label>
              <Input
                onChangeText={password => this.setState({password})}
                autoCapitalize="none"
                secureTextEntry
              />
            </Item>
          </View>
          <View style={{ width, flexDirection: 'row', paddingTop: 50 }}>
            <Button
              onPress={this.handleLogin}
              style={{ flex: 1, marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}
            >
              { this.state.logining && <ActivityIndicator color="white"/> }
              <Text>登陆</Text>
            </Button>
            <Button bordered onPress={this.handleRegister} style={{ flex: 1, marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Text>注册</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    logined: state.user.logined,
    error: state.user.error,
    isConnected: state.network.isConnected,
  }
}

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) => {
    dispatch(loginRequest(username, password))
  },
  registerRequest: (username, password) => {
    dispatch(registerRequest(username, password))
  },
  changeConectionStatus: connectionInfo => {
    dispatch(changeConectionStatus(connectionInfo))
  },
})

const StyledHomeScreen = connectStyle('')(LoginScreen)
export default connect(mapStateToProps, mapDispatchToProps)(StyledHomeScreen)
