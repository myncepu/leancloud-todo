import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Button, Card, CardItem, Text, Body } from 'native-base'
import { connect } from 'react-redux'
import { User } from 'leancloud-storage'

import { logOut } from '../actions/user'
import { DropDownHolder }from '../utils/DropDownHolder'

class HomeScreen extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object,
    username: PropTypes.string,
    // createdAt: PropTypes.date,
    // updatedAt: PropTypes.date,
    emailVerified: PropTypes.bool,
    mobilePhoneVerified: PropTypes.bool,
    sessionToken: PropTypes.string,
    logOut: PropTypes.func,
  }

  handleLogout = () => {
    this.props.logOut()
    this.props.navigation.navigate('Login')
  }

  logInWithSessionToken = async (sessionToken) => {
    try {
      await User.become(sessionToken)
    } catch (e) {
      DropDownHolder.getDropDown().alertWithType('error', '错误', e.message)
      this.props.navigation.navigate('Login')
    }
  }

  componentDidMount() {
    this.logInWithSessionToken(this.props.sessionToken)
  }

  render() {
    const {
      username,
      createdAt,
      updatedAt,
      emailVerified,
      mobilePhoneVerified,
    } = this.props

    return (
      <View style={styles.container}>
        <Card style={{ width: '100%' }}>
          <CardItem header>
            <Text>{username.toUpperCase()}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                { `created at ${createdAt}` }
              </Text>
              <Text>
                { `updated at ${updatedAt}` }
              </Text>
              <Text>
                { `emailVerified: ${emailVerified}` }
              </Text>
              <Text>
                { `mobilePhoneVerified: ${mobilePhoneVerified}` }
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>John soft</Text>
          </CardItem>
        </Card>
        <Button
          onPress={this.handleLogout}
          style={{ margin: 10, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>退出登陆</Text>
        </Button>
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
  const {
    username,
    createdAt,
    updatedAt,
    emailVerified,
    mobilePhoneVerified,
    sessionToken,
  } = state.user.userInfo

  return {
    username,
    createdAt,
    updatedAt,
    emailVerified,
    mobilePhoneVerified,
    sessionToken,
  }
}

const mapDispatchToProps = dispatch => ({
  logOut: () => {
    dispatch(logOut())
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
