import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, SafeAreaView, View } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Item, Input, Label, Button, Text } from 'native-base'

import { registerRequest } from '../actions/user'
import { DropDownHolder }from '../utils/DropDownHolder'

const {width} = Dimensions.get('window')

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password1: null,
      password2: null,
    }
  }

  static navigationOptions = {
    title: '注册',
  }

  static propTypes = {
    logined: PropTypes.bool,
    error: PropTypes.string,
  }

  handleRegister = () => {
    const { username, password1, password2 } = this.state
    if (password1 != password2) {
      DropDownHolder
        .getDropDown()
        .alertWithType('error', '错误', '两次输入的密码不一致，请重新输入')
      return
    }
    this.props.registerRequest(username, password1)
    if (this.props.error) {
      DropDownHolder.getDropDown().alertWithType('error', '错误', this.props.error)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      DropDownHolder.getDropDown().alertWithType('error', '错误', this.props.error)
    }
    if (this.props.registered) {
      DropDownHolder
        .getDropDown()
        .alertWithType('success', '注册成功', '注册成功，返回登陆界面')
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <SafeAreaView>
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
              onChangeText={password1 => this.setState({password1})}
              autoCapitalize="none"
              secureTextEntry
            />
          </Item>
          <Item floatingLabel>
            <Label>再次输入密码</Label>
            <Input
              onChangeText={password2 => this.setState({password2})}
              autoCapitalize="none"
              secureTextEntry
            />
          </Item>
        </View>
        <View style={{ width, flexDirection: 'row', paddingTop: 50 }}>
          <Button onPress={this.handleRegister} style={{ flex: 1, marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text>注册</Text>
          </Button>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    logined: state.user.logined,
    error: state.user.error,
    registered: state.user.registered,
  }
}

const mapDispatchToProps = dispatch => ({
  registerRequest: (username, password) => {
    dispatch(registerRequest(username, password))
  },
})

const StyledHomeScreen = connectStyle('')(RegisterScreen)
export default connect(mapStateToProps, mapDispatchToProps)(StyledHomeScreen)
