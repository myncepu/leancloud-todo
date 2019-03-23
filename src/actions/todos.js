import AV from 'leancloud-storage/live-query'
import { eventChannel } from 'redux-saga'
import { take, select, put, call } from 'redux-saga/effects'

export const TODO_SUBSCRIPTION_ERROR = 'TODO_SUBSCRIPTION_ERROR'
export const TODO_CREATE = 'TODO_CREATE'
export const TODO_CREATE_SUCCESS = 'TODO_CREATE_SUCCESS'
export const TODO_CREATE_FAIL = 'TODO_CREATE_FAIL'
export const TODO_FETCH_ALL = 'TODO_FETCH_ALL'
export const TODO_NEW_FROM_SERVER = 'TODO_NEW_FROM_SERVER'
export const TODO_FETCH_ALL_SUCCESS = 'TODO_FETCH_ALL_SUCCESS'
export const TODO_FETCH_ALL_FAIL = 'TODO_FETCH_ALL_FAIL'
export const TODO_COMPLETE = 'TODO_COMPLETE'
export const TODO_DESTROY = 'TODO_DESTROY'
export const TODO_DESTROY_COMPLETED = 'TODO_DESTROY_COMPLETED'
export const TODO_TOGGLE = 'TODO_TOGGLE'
export const TODO_TOGGLE_SUCCESS = 'TODO_TOGGLE_SUCCESS'
export const TODO_TOGGLE_FAIL = 'TODO_TOGGLE_FAIL'
export const TODO_TOGGLE_COMPLETE_ALL = 'TODO_TOGGLE_COMPLETE_ALL'
export const TODO_UNDO_COMPLETE = 'TODO_UNDO_COMPLETE'
export const TODO_UPDATE_TEXT = 'TODO_UPDATE_TEXT'
export const TODO_USER_LOGOUT_CLEAR_ALL = 'TODO_USER_LOGOUT_CLEAR_ALL'
export const TODO_CLEAR_FINISHED = 'TODO_CLEAR_FINISHED'
export const TODO_CLEAR_FINISHED_SUCCESS = 'TODO_CLEAR_FINISHED_SUCCESS'
export const TODO_CLEAR_FINISHED_FAIL = 'TODO_CLEAR_FINISHED_FAIL'
export const TODO_START_CHANNEL = 'TODO_START_CHANNEL'
export const TODO_STOP_CHANNEL = 'TODO_STOP_CHANNEL'

// action creator
export const createTodo = newTodoName => ({
  type: TODO_CREATE,
  newTodoName,
})

export const fetchAll = () => ({
  type: TODO_FETCH_ALL,
})

export const toggleTodo = id => ({
  type: TODO_TOGGLE,
  id,
})

export const logOutClearAllTodos = () => ({
  type: TODO_USER_LOGOUT_CLEAR_ALL,
})

export const clearFinishedTodos = () => ({
  type: TODO_CLEAR_FINISHED,
})

export const startTodoChannel = () => ({
  type: TODO_START_CHANNEL,
})

export const stopTodoChannel = () => ({
  type: TODO_STOP_CHANNEL,
})

// This is how channel is created
const createSocketChannel = liveQuery =>
  eventChannel(emit => {
    const handler = data => {
      emit(data)
    }
    liveQuery.on('update', handler)
    liveQuery.on('create', handler)
    return () => {
      // liveQuery.off('update', updateTodoHandler)
      // liveQuery.off('create', updateTodoHandler)
      call(liveQuery.unsubscribe)
    }
  })

// generator function
export function* createTodoGenerator(action) {
  try {
    // create a todo
    const Todo = AV.Object.extend('Todo')
    const todo = new Todo()
    todo.set('name', action.newTodoName)
    todo.set('complete', false)
    todo.set('cleared', false)
    const user = yield AV.User.currentAsync()
    todo.set('user', user)
    // create a ACL instance
    var acl = new AV.ACL()
    acl.setReadAccess(user, true)
    acl.setWriteAccess(user, true)
    // set ACL on todo
    todo.setACL(acl)

    const todoFromServer = yield todo.save()
    const todoRedux = {
      name: todoFromServer.attributes.name,
      complete: todoFromServer.attributes.complete,
      cleared: todoFromServer.attributes.cleared,
      id: todoFromServer.id,
      user: {
        username: todoFromServer.attributes.user.attributes.username,
        id: todoFromServer.attributes.user.id,
        updatedAt: todoFromServer.attributes.user.updatedAt,
        createdAt: todoFromServer.attributes.user.createdAt,
      },
    }
    yield put({ type: TODO_CREATE_SUCCESS, todo: todoRedux })
  } catch (e) {
    yield put({ type: TODO_CREATE_FAIL, errorMessage: e.message })
  }
}

const serverTodoToReduxStoreTodo = todoFromServer => ({
  ...todoFromServer.attributes,
  id: todoFromServer.id,
  user: {
    id: todoFromServer.attributes.user.id,
  },
})

export function* fetchAllGenerator() {
  try {
    const currentUser = yield AV.User.currentAsync()
    const query = new AV.Query('Todo')
    query.equalTo('user', currentUser)
    const todosFromServer = yield query.find()
    const todosRedux = todosFromServer.map(serverTodoToReduxStoreTodo)
    yield put({ type: TODO_FETCH_ALL_SUCCESS, todos: todosRedux })
  } catch (e) {
    yield put({ type: TODO_FETCH_ALL_FAIL, errorMessage: e.message })
  }
}

export function* watchOnTodosUpdate() {
  try {
    // eslint-disable-next-line no-console
    console.log('watchOnTodosUpdate')
    const query = new AV.Query('Todo')
    const liveQuery = yield call([query, 'subscribe'])
    // eslint-disable-next-line no-console
    console.log('after liveQuery.subscribe')
    const socketChannel = createSocketChannel(liveQuery)
    while (true) {
      const payload = yield take(socketChannel)
      // eslint-disable-next-line
      console.log('payload', payload)
      yield put({
        type: 'TODO_NEW_FROM_SERVER',
        todo: serverTodoToReduxStoreTodo(payload),
      })
      // yield fork(pong, socket)
    }
  } catch (e) {
    yield put({
      type: TODO_SUBSCRIPTION_ERROR,
      errorMessage: e.message,
    })
    // eslint-disable-next-line no-console
    console.log('watchOnTodosUpdate error.message', e.message)
    // eslint-disable-next-line no-console
    console.log('watchOnTodosUpdate error', e)
  }
}

export function* toggleTodoGenerator(action) {
  try {
    const todos = yield select(state => state.todos.items)
    const todo = AV.Object.createWithoutData('Todo', action.id)
    const complete = todos.find(todo => todo.id === action.id).complete
    todo.set('complete', !complete)
    const todoSaved = yield todo.save()
    const toggledTodos = todos.map(todo => {
      if (todo.id === action.id) {
        return {
          ...todo,
          complete: todoSaved.attributes.complete,
        }
      } else {
        return todo
      }
    })
    yield put({ type: TODO_TOGGLE_SUCCESS, toggledTodos })
  } catch (e) {
    yield put({ type: TODO_TOGGLE_FAIL, errorMessage: e.message })
  }
}

export function* clearFinishedTodosGenerator() {
  try {
    const todos = yield select(state => state.todos.items)

    const todosAfterClear = []
    for (let todoInStore of todos) {
      const todo = AV.Object.createWithoutData('Todo', todoInStore.id)
      todo.set('cleared', todoInStore.complete)
      const todoSaved = yield todo.save()
      todosAfterClear.push({
        ...todoInStore,
        cleared: todoSaved.attributes.cleared,
      })
    }

    yield put({ type: TODO_CLEAR_FINISHED_SUCCESS, todosAfterClear })
  } catch (e) {
    yield put({ type: TODO_CLEAR_FINISHED_FAIL, errorMessage: e.message })
  }
}
