import { combineReducers } from 'redux'

import user from './user'
import network from './network'

export default combineReducers({ user, network })
