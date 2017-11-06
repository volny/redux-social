import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Authenticate from 'components/Authenticate'
import auth from 'helpers/auth'
import * as userActions from 'modules/users'

const handleAuth = async ({ fetchingUser, fetchingUserSuccess, authUser }) => {
  fetchingUser()
  try {
    const user = await auth()
    fetchingUserSuccess(user.uid, user, Date.now())
    authUser(user.uid)
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
  authUser: PropTypes.func.isRequired,
  fetchingUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
}

const mapStateToProps = ({ users: { isFetching, error } }) => ({
  isFetching,
  error,
})

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
