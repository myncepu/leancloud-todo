import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import rootReducer from '../reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [ sagaMiddleware ]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export default createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

sagaMiddleware.run(rootSaga)
