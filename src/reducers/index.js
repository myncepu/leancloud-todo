import { combineReducers } from 'redux'

import user from './user'
import network from './network'
import todos from './todos'
import theme from './theme'

export default combineReducers({ user, network, todos, theme })
