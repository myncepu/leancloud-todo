import {
  TODO_FETCH_ALL_SUCCESS,
  TODO_FETCH_ALL_FAIL,
  TODO_CREATE_SUCCESS,
  TODO_NEW_FROM_SERVER,
  TODO_CREATE_FAIL,
  TODO_TOGGLE_SUCCESS,
  TODO_TOGGLE_FAIL,
  TODO_USER_LOGOUT_CLEAR_ALL,
  TODO_CLEAR_FINISHED_SUCCESS,
  TODO_CLEAR_FINISHED_FAIL,
  TODO_SUBSCRIPTION_ERROR,
  // TODO_START_CHANNEL,
  // TODO_STOP_CHANNEL,
} from '../actions/todos'

const initialState = {
  items: [],
  error: '',
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_FETCH_ALL_SUCCESS:
      return {
        items: action.todos,
        error: '',
      }
    case TODO_SUBSCRIPTION_ERROR:
    case TODO_FETCH_ALL_FAIL:
      return {
        items: state.items,
        error: action.errorMessage,
      }
    case TODO_CREATE_SUCCESS:
    case TODO_NEW_FROM_SERVER: {
      const isNotNewTodo = state.items
        .map(todo => todo.id)
        .includes(action.todo.id)
      const isNewTodo = !isNotNewTodo

      const updateExistedTodo = state.items.map(todo => {
        return todo.id === action.todo.id ? action.todo : todo
      })

      return {
        items: isNewTodo ? [action.todo, ...state.items] : updateExistedTodo,
        error: '',
      }
    }
    case TODO_CREATE_FAIL:
      return {
        ...state,
        error: action.errorMessage,
      }
    case TODO_TOGGLE_SUCCESS:
      return {
        items: action.toggledTodos,
        error: '',
      }
    case TODO_TOGGLE_FAIL:
      return {
        ...state,
        error: action.errorMessage,
      }
    case TODO_CLEAR_FINISHED_SUCCESS:
      return {
        items: action.todosAfterClear,
        error: '',
      }
    case TODO_CLEAR_FINISHED_FAIL:
      return {
        ...state,
        error: action.errorMessage,
      }
    case TODO_USER_LOGOUT_CLEAR_ALL:
      return initialState
    default:
      return state
  }
}

export default todosReducer
