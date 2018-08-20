import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Card, CardItem, Text, Body } from 'native-base'
import { connect } from 'react-redux'

class HomeScreen extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object,
    username: PropTypes.string,
    // createdAt: PropTypes.date,
    // updatedAt: PropTypes.date,
    emailVerified: PropTypes.bool,
    mobilePhoneVerified: PropTypes.bool,
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
    mobilePhoneVerified
  } = state.user.userInfo

  return {
    username,
    createdAt,
    updatedAt,
    emailVerified,
    mobilePhoneVerified,
  }
}

export default connect(mapStateToProps)(HomeScreen)
