import { changeConectionStatus } from '../network'

describe('changeConectionStatus', () => {
  it('creates a properly formatted action', () => {
    expect(changeConectionStatus()).toMatchSnapshot()
  })
})
