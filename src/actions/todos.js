import AV from 'leancloud-storage'
import { select, put } from 'redux-saga/effects'

export const TODO_CREATE = 'TODO_CREATE'
export const TODO_CREATE_SUCCESS = 'TODO_CREATE_SUCCESS'
export const TODO_CREATE_FAIL = 'TODO_CREATE_FAIL'
export const TODO_FETCH_ALL = 'TODO_FETCH_ALL'
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

// generator function
export function* createTodoGenerator(action) {
  try {
    const Todo = AV.Object.extend('Todo')
    const todo = new Todo()
    todo.set('name', action.newTodoName)
    todo.set('complete', false)
    const user = yield AV.User.currentAsync()
    todo.set('user', user)
    const todoFromServer = yield todo.save()
    const todoRedux = {
      name: todoFromServer.attributes.name,
      complete: todoFromServer.attributes.complete,
      id: todoFromServer.id,
      user: {
        username: todoFromServer.attributes.user.attributes.username,
        id: todoFromServer.attributes.user.id,
        updatedAt: todoFromServer.attributes.user.updatedAt,
        createdAt: todoFromServer.attributes.user.createdAt,
      }
    }
    yield put({ type: TODO_CREATE_SUCCESS, todo: todoRedux })
  } catch(e) {
    yield put({ type: TODO_CREATE_FAIL, errorMessage: e.message })
  }
}

export function* fetchAllGenerator() {
  try {
    const currentUser = yield AV.User.currentAsync()
    const query = new AV.Query('Todo')
    query.equalTo('user', currentUser)
    const todosFromServer = yield query.find()
    const todosRedux = todosFromServer.map(todoFromServer => ({
      name: todoFromServer.attributes.name,
      complete: todoFromServer.attributes.complete,
      id: todoFromServer.id,
      user: {
        id: todoFromServer.attributes.user.id,
      }
    }))
    yield put({ type: TODO_FETCH_ALL_SUCCESS, todos: todosRedux })
  } catch(e) {
    yield put({ type: TODO_FETCH_ALL_FAIL, errorMessage: e.message })
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
  } catch(e) {
    yield put({ type: TODO_TOGGLE_FAIL, errorMessage: e.message })
  }
}
