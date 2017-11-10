import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Authenticate from 'components/Authenticate'
import * as userActions from 'modules/users'

const AuthenticateContainer = ({ isFetching, error, fetchAndHandleAuthedUser }) => (
  <Authenticate isFetching={isFetching} error={error} onAuth={() => fetchAndHandleAuthedUser()} />
)

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
}

const mapStateToProps = ({ users: { isFetching, error } }) => ({
  isFetching,
  error,
})

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
