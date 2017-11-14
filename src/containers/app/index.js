import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Home from 'components/Home'
import Navigation from 'components/Navigation'
import Authenticate from 'containers/AuthenticateContainer'
import FeedContainer from 'containers/FeedContainer'
import LogoutContainer from 'containers/LogoutContainer'
import * as userActionsCreators from 'modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import { PublicRoute, PrivateRoute } from 'routeTypes.js'

const MainContainer = styled.div`
  width: 100%;
`

const InnerContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

class App extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    // withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  componentDidMount () {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userInfo = formatUserInfo(user.providerData[0])
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.props.history.push('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }
  render () {
    return this.props.isFetching === true ? null : (
      <div>
        <Navigation isAuthed={this.props.isAuthed} />
        <main>
          <MainContainer>
            <InnerContainer>
              <PublicRoute exact={true} authed={this.props.isAuthed} path="/login"
                component={Authenticate} />
              <PrivateRoute
                exact={true}
                authed={this.props.isAuthed}
                path="/logout"
                component={LogoutContainer}/>
              <PrivateRoute
                exact={true}
                authed={this.props.isAuthed}
                path="/feed"
                component={FeedContainer}/>
              <PublicRoute exact={true} authed={this.props.isAuthed} path="/"
                component={Home} />
            </InnerContainer>
          </MainContainer>
        </main>
      </div>
    )
  }
}

export default withRouter(
  connect(
    ({ users: { isAuthed, isFetching } }) => ({ isAuthed, isFetching }),
    dispatch => bindActionCreators(userActionsCreators, dispatch),
  )(App),
)
