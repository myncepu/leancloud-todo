import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'

class LoaddingScreen extends React.Component {
  static propTypes = {
    sessionToken: PropTypes.string,
  }

  _bootstrapAsync = () => {
    const sessionToken = this.props.sessionToken
    if (sessionToken != '') {
      this.props.navigation.navigate(sessionToken ? 'Auth' : 'Auth')
    }
  }

  componentDidMount() {
    this._bootstrapAsync()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  let sessionToken = ''
  if (state.user && state.user.userInfo) {
    sessionToken = state.user.userInfo.sessionToken
  }

  return {
    sessionToken
  }
}

export default connect(mapStateToProps)(LoaddingScreen)
