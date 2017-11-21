import { ADD_LIKE, REMOVE_LIKE } from 'modules/usersLikes'
const FETCHING_COUNT = 'FETCHING_COUNT'
const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR'
const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS'

const fetchingCount = () => ({
  type: FETCHING_COUNT,
})

const fetchingCountError = error => {
  console.warn(error)
  return {
    type: FETCHING_COUNT_ERROR,
    error: "Error fetching post's like count",
  }
}

const fetchingCountSuccess = (postID, count) => ({
  type: FETCHING_COUNT_SUCCESS,
  postID,
  count,
})

const count = (state = 0, { type }) => {
  switch (type) {
    case ADD_LIKE:
      return state + 1
    case REMOVE_LIKE:
      return state - 1
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

const likeCount = (state = initialState, action) => {
  const { type, error, postID, count } = action
  switch (type) {
    case FETCHING_COUNT:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_COUNT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: error,
      }
    case FETCHING_COUNT_SUCCESS:
      return {
        ...state,
        ...initialState,
        [postID]: count,
      }
    case ADD_LIKE:
    case REMOVE_LIKE:
      return typeof state[postID] === 'undefined'
        ? state
        : {
          ...state,
          [postID]: count(state[postID], action),
        }
    default:
      return state
  }
}

export default likeCount
