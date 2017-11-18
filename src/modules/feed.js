const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_POST_ID_TO_FEED = 'ADD_NEW_POST_ID_TO_FEED'
const RESET_NEW_POSTS_AVAILABLE = 'RESET_NEW_POSTS_AVAILABLE'

const settingFeedListener = () => ({
  type: SETTING_FEED_LISTENER,
})

const settingFeedListenerError = error => ({
  type: SETTING_FEED_LISTENER_ERROR,
  error: 'Error fetching feeds',
})

const settingFeedListenerSuccess = postIDs => ({
  type: SETTING_FEED_LISTENER_SUCCESS,
  postIDs,
})

const addNewPostIDToFeed = postID => ({
  type: ADD_NEW_POST_ID_TO_FEED,
  postID,
})

export const resetNewPostsAvailable = () => ({
  type: RESET_NEW_POSTS_AVAILABLE,
})

const initialState = {
  newPostsAvailable: false,
  newPostsToAdd: [],
  isFetching: false,
  error: '',
  postIDs: [],
}

const feed = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_FEED_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        postIDs: action.postIDs,
        newPostsAvailable: false,
      }
    case ADD_NEW_POST_ID_TO_FEED:
      return {
        ...state,
        newPostsToAdd: [action.postID, ...state.newPostsToAdd],
        newPostsAvailable: true,
      }
    case RESET_NEW_POSTS_AVAILABLE:
      return {
        ...state,
        postIDs: [...state.newPostsToAdd, ...state.postIDs],
        newPostsToAdd: [],
        newPostsAvailable: false,
      }
    default:
      return state
  }
}

export default feed
