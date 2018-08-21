import React from 'react'
import PropTypes from 'prop-types'
import {SafeAreaView} from 'react-navigation'
import {TouchableWithoutFeedback, Keyboard, View} from 'react-native'

import styles from './styles'

class Container extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    backgroundColor: PropTypes.string,
  }

  render() {
    const containerStyle = [styles.container]
    if (this.props.backgroundColor) {
      containerStyle.push({ backgroundColor: this.props.backgroundColor })
    }
    return (
      <SafeAreaView style={containerStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}

export default Container
