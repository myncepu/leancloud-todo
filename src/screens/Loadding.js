import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Spinner } from 'native-base'

class LoaddingScreen extends React.Component {
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
