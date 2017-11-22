// Ducks Redux Pattern
// https://github.com/erikras/ducks-modular-redux

import auth, { logout, saveUser } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'

// ACTIONS

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

// ACTION CREATORS

export const authUser = uid => ({
  type: AUTH_USER,
  uid,
})

const fetchingUser = () => ({
  type: FETCHING_USER,
})

const fetchingUserFailure = error => {
  console.warn(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user 😞 ',
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

export const fetchAndHandleAuthedUser = () => async dispatch => {
  dispatch(fetchingUser())
  try {
    const { user } = await auth()
    const userInfo = formatUserInfo(user.providerData[0])
    await dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
    saveUser(user)
    dispatch(authUser(user.uid))
  } catch (error) {
    dispatch(fetchingUserFailure(error))
  }
}

export const unauthUser = () => ({
  type: UNAUTH_USER,
})

export const logoutAndUnauth = () => dispatch => {
  logout()
  dispatch(unauthUser())
}

export const removeFetchingUser = () => ({
  type: REMOVE_FETCHING_USER,
})

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
  isFetching: true,
  error: '',
  isAuthed: false,
  authedID: '',
}

const users = (state = initialState, action) => {
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
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}

export default users
