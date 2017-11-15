const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

export const openModal = () => ({
  type: OPEN_MODAL,
})

export const closeModal = () => ({
  type: CLOSE_MODAL,
})

export const updatePostText = newPostText => ({
  type: UPDATE_POST_TEXT,
  newPostText,
})

const initialState = {
  postText: '',
  isOpen: false,
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL:
      return {
        postText: '',
        isOpen: false,
      }
    case UPDATE_POST_TEXT:
      return {
        ...state,
        postText: action.newPostText,
      }
    default:
      return state
  }
}

export default modal
