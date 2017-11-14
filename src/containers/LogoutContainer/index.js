import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAndUnauth } from 'modules/users'
import { Redirect } from 'react-router-dom'

class LogoutContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  }
  render () {
    return <Redirect to={{ pathname: '/' }} />
  }
}

export default connect()(LogoutContainer)
