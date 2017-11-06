import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Authenticate from 'components/Authenticate'
import auth from 'helpers/auth'
import * as userActions from 'modules/users'

const handleAuth = async ({ dispatch }) => {
  dispatch(userActions.fetchingUser())
  try {
    const user = await auth()
    dispatch(userActions.fetchingUserSuccess(user.uid, user, Date.now()))
    dispatch(userActions.authUser(user.uid))
  } catch (error) {
    userActions.fetchingUserFailure(error)
  }
}

const AuthenticateContainer = props => (
  <Authenticate isFetching={props.isFetching} error={props.error} onAuth={handleAuth.bind(null, props)} />
)

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

const mapStateToProps = ({ users: { isFetching, error } }) => ({
  isFetching,
  error,
})

// const mapStateToProps = state => {
//   console.log(state.users)
//   return {
//     isFetching: state.users.isFetching,
//     error: state.users.error,
//   }
// }

// https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default connect(mapStateToProps)(AuthenticateContainer)
