import { savePost, fetchPost } from 'helpers/api'
import { closeModal } from 'modules/modal'
import { addSingleUsersPost } from 'modules/usersPosts'

const FETCHING_POST = 'FETCHING_POST'
const FETCHING_POST_ERROR = 'FETCHING_POST_ERROR'
const FETCHING_POST_SUCCESS = 'FETCHING_POST_SUCCESS'
const ADD_POST = 'ADD_POST'
const ADD_MULTIPLE_POSTS = 'ADD_MULTIPLE_POSTS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

const fetchingPost = () => ({
  type: FETCHING_POST,
})

const fetchingPostError = error => {
  console.warn(error)
  return {
    type: FETCHING_POST_ERROR,
    error: 'Error fetching Post 😞 ',
  }
}

const fetchingPostSuccess = post => ({
  type: FETCHING_POST_SUCCESS,
  post,
})

export const removeFetching = () => ({
  type: REMOVE_FETCHING,
})

const addPost = post => ({
  type: ADD_POST,
  post,
})

export const postFanout = post => async (dispatch, getState) => {
  const uid = getState().users.authedID
  try {
    const postWithID = await savePost(post)
    dispatch(addPost(postWithID))
    dispatch(closeModal())
    dispatch(addSingleUsersPost(uid, postWithID.postID))
  } catch (error) {
    console.warn(error)
  }
}

export const addMultiplePosts = posts => ({
  type: ADD_MULTIPLE_POSTS,
  posts,
})

export const fetchAndHandlePost = postID => async dispatch => {
  dispatch(fetchingPost())
  try {
    const post = await fetchPost(postID)
    dispatch(fetchingPostSuccess(post))
  } catch (error) {
    dispatch(fetchingPostError(error))
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_POST:
      return {
        ...state,
        isFetching: true,
      }
    case ADD_POST:
    case FETCHING_POST_SUCCESS:
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.post.postID]: action.post,
      }
    case FETCHING_POST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING:
      return {
        ...state,
        error: '',
        isFetching: false,
      }
    case ADD_MULTIPLE_POSTS:
      return {
        ...state,
        ...action.posts,
      }
    default:
      return state
  }
}

export default posts
