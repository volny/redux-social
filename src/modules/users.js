// Ducks Redux Pattern
//https://github.com/erikras/ducks-modular-redux

// ACTIONS

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

// ACTION CREATORS

export const authUser = uid => ({
  type: AUTH_USER,
  uid,
})

export const unauthUser = () => ({
  type: UNAUTH_USER,
})

export const fetchingUser = () => ({
  type: FETCHING_USER,
})

export const fetchingUserFailure = error => {
  console.warn(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  }
}

export const fetchingUserSuccess = (uid, user, timestamp) => {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

// REDUCER

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedID: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedID: action.uid,
      }
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedID: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
            ...state,
            isFetching: false,
            error: '',
          }
        : {
            ...state,
            isFetching: false,
            error: '',
            [action.uid]: user(state[action.uid], action),
          }
    default:
      return state
  }
}

export default reducer
