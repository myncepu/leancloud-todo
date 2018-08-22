import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Item, Input, Label, Button, Text } from 'native-base'

import { loginRequest, registerRequest } from '../actions/user'
import { DropDownHolder }from '../utils/DropDownHolder'
import { LogoText } from '../components/Text'
import { Container } from '../components/Container'

const TEMP_USERNAME = 'yan'
const TEMP_PASSWORD = 'yan'

const {width} = Dimensions.get('window')

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
    }
  }

  static propTypes = {
    logined: PropTypes.bool,
    loginRequest: PropTypes.func,
    error: PropTypes.string,
  }

  handleLogin = () => {
    let username = TEMP_USERNAME
    let password = TEMP_PASSWORD
    if (this.state.username && this.state.password) {
      username = this.state.username
      password = this.state.password
    }
    this.props.loginRequest(username, password)
  }

  handleRegister = () => {
    const { username, password } = this.state
    this.props.registerRequest(username, password)
    if (this.props.error) {
      DropDownHolder.getDropDown().alertWithType('error', 'Error', this.props.error)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      DropDownHolder.getDropDown().alertWithType('error', 'Error', this.props.error)
    }
    if (this.props.logined) {
      this.props.navigation.navigate('Home')
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
            <Button onPress={this.handleLogin} style={{ flex: 1, marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
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
  }
}

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) => {
    dispatch(loginRequest(username, password))
  },
  registerRequest: (username, password) => {
    dispatch(registerRequest(username, password))
  },
})

const StyledHomeScreen = connectStyle('')(HomeScreen)
export default connect(mapStateToProps, mapDispatchToProps)(StyledHomeScreen)
