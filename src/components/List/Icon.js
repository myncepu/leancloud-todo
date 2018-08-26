import React from 'react'
import {View, Image} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const Icon = ({ visiable, checkmark, iconBackground = styles.$blue }) => {
  if (visiable) {
    return (
      <View style={[styles.iconContainer, {backgroundColor: iconBackground}]}>
        { checkmark &&
          <Image
            source={require('./images/check.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        }
      </View>
    )
  }

  return <View />
}

Icon.propTypes = {
  visiable: PropTypes.bool,
  checkmark: PropTypes.bool,
  iconBackground: PropTypes.string,
}

export default Icon
