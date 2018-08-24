import React from 'react'
import { AsyncStorage, StyleSheet, SafeAreaView } from 'react-native'
import { Spinner } from 'native-base'

class LoaddingScreen extends React.Component {
  constructor() {
    super()
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const sessionToken = await AsyncStorage.getItem('sessionToken')
    this.props.navigation.navigate(sessionToken ? 'Auth' : 'Auth')
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

export default LoaddingScreen
