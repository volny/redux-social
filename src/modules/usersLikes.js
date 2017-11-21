export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

const addLike = postID => ({
  type: ADD_LIKE,
  postID,
})

const removeLike = postID => ({
  type: REMOVE_LIKE,
  postID,
})

const fetchingLikes = () => ({
  type: FETCHING_LIKES,
})

const fetchLikesError = error => {
  console.warn(error)
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes',
  }
}

const fetchingLikesSuccess = likes => ({
  type: FETCHING_LIKES_SUCCESS,
  likes,
})

const initialState = {
  isFetching: false,
  error: '',
}

const usersLikes = (state = initialState, { type, error, likes, postID }) => {
  switch (type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error,
      }
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...likes,
        isFetching: false,
        error: '',
      }
    case ADD_LIKE:
      return {
        ...state,
        [postID]: true,
      }
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter(currPostID => currPostID !== postID)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default:
      return state
  }
}

export default usersLikes
