import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Authenticate from 'components/Authenticate'
import auth from 'helpers/auth'

class AuthenticateContainer extends Component {
  handleAuth() {
    auth().then(user => {
      console.log(user)
    })
  }
  render() {
    return (
      <Authenticate isFetching={this.props.isFetching} error={this.props.error} onAuth={this.handleAuth} />
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

// https://stackoverflow.com/questions/34211076/destructuring-deep-properties
const mapStateToProps = ({ users: { isFetching, error } }) => ({
  isFetching,
  error,
})

// https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default connect(mapStateToProps)(AuthenticateContainer)
