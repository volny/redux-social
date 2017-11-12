import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAndUnauth } from 'modules/users'
import Logout from 'components/Logout'

class LogoutContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  }
  render () {
    return <Logout />
  }
}

export default connect()(LogoutContainer)
