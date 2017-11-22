const FETCHING_USERS_POSTS = 'FETCHING_USERS_POSTS'
const FETCHING_USERS_POSTS_ERROR = 'FETCHING_USERS_POSTS_ERROR'
const FETCHING_USERS_POSTS_SUCCESS = 'FETCHING_USERS_POSTS_SUCCESS'
const ADD_SINGLE_USERS_POST = 'ADD_SINGLE_USERS_POST'

const fetchingUsersPosts = uid => ({
  type: FETCHING_USERS_POSTS,
  uid,
})

const fetchingUsersPostsError = error => {
  console.warn(error)
  return {
    type: FETCHING_USERS_POSTS_ERROR,
    error: 'Error fetching users post ids 😞 ',
  }
}

const fetchingUsersPostsSuccess = (uid, postIDs, lastUpdated) => ({
  type: FETCHING_USERS_POSTS_SUCCESS,
  uid,
  postIDs,
  lastUpdated,
})

export const addSingleUsersPost = (uid, postID) => ({
  type: ADD_SINGLE_USERS_POST,
  uid,
  postID,
})

const initialUsersPostState = {
  lastUpdated: 0,
  postIDs: [],
}

const usersPost = (state = initialUsersPostState, action) => {
  switch (action.type) {
    case ADD_SINGLE_USERS_POST:
      return {
        ...state,
        postIDs: state.postIDs.concat([action.postID]),
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

const usersPosts = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USERS_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USERS_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          postIDs: action.postIDs,
        },
      }
    case ADD_SINGLE_USERS_POST:
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersPost(state[action.uid], action),
        }
    default:
      return state
  }
}

export default usersPosts
