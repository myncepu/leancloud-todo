import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
import Accordion from 'react-native-collapsible/Accordion'

import styles from './styles'

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...'
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...'
  }
]

class AccordionView extends Component {
  _renderSectionTitle(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    )
  }

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    )
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    )
  }

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    )
  }
}

export default AccordionView
