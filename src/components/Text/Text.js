import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

export const H1 = ({ children })  => {
  return (
    <Text style={styles.h1}>
      { children }
    </Text>
  )
}

H1.propTypes = {
  name: PropTypes.string,
}
