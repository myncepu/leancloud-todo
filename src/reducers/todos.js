import {
  TODO_FETCH_ALL_SUCCESS,
  TODO_FETCH_ALL_FAIL,
  TODO_CREATE_SUCCESS,
  TODO_CREATE_FAIL,
  TODO_TOGGLE_SUCCESS,
  TODO_TOGGLE_FAIL,
  TODO_USER_LOGOUT_CLEAR_ALL,
  TODO_CLEAR_FINISHED_SUCCESS,
  TODO_CLEAR_FINISHED_FAIL,
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
    case TODO_FETCH_ALL_FAIL:
      return {
        items: [],
        error: action.errorMessage,
      }
    case TODO_CREATE_SUCCESS:
      return {
        items: [
          ...state.items,
          action.todo,
        ],
        error: '',
      }
    case TODO_CREATE_FAIL:
      return {
        ...state,
        error: action.errorMessage
      }
    case TODO_TOGGLE_SUCCESS:
      return {
        items: action.toggledTodos,
        error: '',
      }
    case TODO_TOGGLE_FAIL:
      return {
        ...state,
        error: action.errorMessage
      }
    case TODO_CLEAR_FINISHED_SUCCESS:
      return {
        items: action.todosAfterClear,
        error: '',
      }
    case TODO_CLEAR_FINISHED_FAIL:
      return {
        ...state,
        error: action.errorMessage
      }
    case TODO_USER_LOGOUT_CLEAR_ALL:
      return initialState
    default:
      return state
  }
}

export default todosReducer
