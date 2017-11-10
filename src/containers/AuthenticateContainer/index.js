import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Authenticate from 'components/Authenticate'
import * as userActions from 'modules/users'

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    // withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  handleAuth = async () => {
    await this.props.fetchAndHandleAuthedUser()
    this.props.history.push('/feed')
  }

  render() {
    return (
      <Authenticate isFetching={this.props.isFetching} error={this.props.error} onAuth={this.handleAuth} />
    )
  }
}

const mapStateToProps = ({ users: { isFetching, error } }) => ({ isFetching, error })
const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer))
