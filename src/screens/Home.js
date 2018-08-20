import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import { loginRequest } from '../actions/user'
import { DropDownHolder }from '../utils/DropDownHolder'

const TEMP_USERNAME = 'yan'
const TEMP_PASSWORD = 'yan'
class HomeScreen extends React.Component {

  static propTypes = {
    logined: PropTypes.bool,
    loginRequest: PropTypes.func,
    loginError: PropTypes.string,
  }

  handleLogin = () => {
    this.props.loginRequest(TEMP_USERNAME, TEMP_PASSWORD)
    if (this.props.loginError) {
      DropDownHolder.getDropDown().alertWithType('error', 'Error', this.props.loginError)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="username"
          style={{ width: '100%', height: 30, borderWidth: 1, margin: 5, paddingHorizontal: 5 }}
        />
        <TextInput
          placeholder="password"
          style={{ width: '100%', height: 30, borderWidth: 1, margin: 5, paddingHorizontal: 5 }}
          secureTextEntry
        />
        <TouchableOpacity
          style={{ marginTop: 20, padding: 10, borderRadius: 5, alignSelf: 'flex-start', backgroundColor: 'green' }}
          onPress={this.handleLogin}
        >
          <Text style={{ color: 'white' }}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  return {
    logined: state.user.logined,
    loginError: state.user.error,
  }
}

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) => {
    dispatch(loginRequest(username, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
