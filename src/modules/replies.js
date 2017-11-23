const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'

const addReply = (postID, reply) => ({
  type: ADD_REPLY,
  postID,
  reply,
})

const addReplyError = error => {
  console.warn(error)
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply 😞 ',
  }
}

const removeReply = (postID, replyID) => ({
  type: REMOVE_REPLY,
  replyID,
})

const fetchingReplies = () => ({
  type: FETCHING_REPLIES,
})

const fetchingRepliesError = error => {
  console.warn(error)
  return {
    type: FETCHING_REPLIES_ERROR,
    error: 'Erorr fetching replies 😞 ',
  }
}

const fetchingRepliesSuccess = (postID, replies) => ({
  type: FETCHING_REPLIES_SUCCESS,
  replies,
  postID,
  lastUpdated: Date.now(),
})

export const addAndHandleReply = (postID, reply) => (dispatch, getState) => {}

const initialReply = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
}

const postReplies = (state = initialReply, action) => {
  switch (action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [action.reply.replyId]: action.reply,
      }
    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyId]: undefined,
      }
    default:
      return state
  }
}

const initialPostState = {
  lastUpdated: Date.now(),
  replies: {},
}

const repliesAndLastUpated = (state = initialPostState, action) => {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies,
      }
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        replies: postReplies(state.replies, action),
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

const replies = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_REPLIES_ERROR:
    case ADD_REPLY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.postID]: repliesAndLastUpated(state[action.postID], action),
      }
    default:
      return state
  }
}

export default replies
