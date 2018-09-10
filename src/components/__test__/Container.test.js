import React from 'react'
import renderer from 'react-test-renderer'
import { Container, styles } from '../Container'

it('renders successfully without children', () => {
  const rendered = renderer.create(<Container />).toJSON()
  console.log('rendered', rendered)
  expect(rendered).toBeTruthy()
})

it('exports a styles object', () => {
  expect(typeof styles).toBe('object')
})
