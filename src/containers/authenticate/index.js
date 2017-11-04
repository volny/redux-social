import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Authenticate from 'components/authenticate'
import auth from 'helpers/auth'

class AuthenticateContainer extends Component {
  handleAuth() {
    auth().then(user => {
      console.log(user)
    })
  }
  render() {
    return <Authenticate isFetching={false} error="" onAuth={this.handleAuth} />
  }
}

export default AuthenticateContainer
