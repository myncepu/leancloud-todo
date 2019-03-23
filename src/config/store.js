import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers'
import rootSaga from './sagas'

// persistedReducer
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['network'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Middleware
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ diff: true })
  middlewares.push(logger)
}

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middlewares))
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}
