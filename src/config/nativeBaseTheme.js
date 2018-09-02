import React from 'react'
import { StyleProvider } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AppNavigator from './routes'
import getTheme from './native-base-theme/components'
import myTheme from './native-base-theme/variables/myTheme'
import material from './native-base-theme/variables/material'

class ThemedAppNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: {
        myTheme,
        material
      },
    }
  }

  static propTypes = {
    theme: PropTypes.oneOf(['myTheme', 'material']),
  }

  render() {
    const theme = this.state.theme[this.props.themeName]
    return (
      <StyleProvider style={getTheme(this.props.themeName === 'myTheme' ? myTheme : material)}>
        <AppNavigator />
      </StyleProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    themeName: state.theme.name
  }
}

export default connect(mapStateToProps)(ThemedAppNavigator)
