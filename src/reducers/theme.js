import { SET_THEME } from '../actions/theme'

const initialState = {
  name: 'material'
}

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        name: action.theme,
      }
    default:
      return state
  }
}

export default themeReducer
