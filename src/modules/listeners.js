const ADD_LISTENER = 'ADD_LISTENER'

export const addListener = listenerID => ({
  type: ADD_LISTENER,
  listenerID,
})

const listeners = (state = {}, action) => {
  switch (action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenerID]: true,
      }
    default:
      return state
  }
}

export default listeners
