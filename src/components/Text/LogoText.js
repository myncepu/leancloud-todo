import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { connectStyle } from 'native-base'

class LogoText extends Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.string,
  }

  render() {
    return (
      <Text style={this.props.style.textContent}>
        {this.props.children}
      </Text>
    )
  }
}

const styles = {
  textContent: {
    fontSize: 20,
    color: 'red',
  },
}

export default connectStyle('NativeBase.LogoText', styles)(LogoText)
