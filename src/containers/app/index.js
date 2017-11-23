import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Navigation from 'components/Navigation'
import Authenticate from 'containers/AuthenticateContainer'
import FeedContainer from 'containers/FeedContainer'
import LogoutContainer from 'containers/LogoutContainer'
import PostDetailsContainer from 'containers/PostDetailsContainer'
import * as userActions from 'modules/users'
import * as usersLikesActions from 'modules/usersLikes'
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
    setUsersLikes: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  componentDidMount () {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userInfo = formatUserInfo(user.providerData[0])
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
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
            <PublicRoute exact={true} authed={this.props.isAuthed} path="/"
              component={Authenticate} />
            <InnerContainer>
              <PrivateRoute
                exact={true}
                authed={this.props.isAuthed}
                path="/feed"
                component={FeedContainer}/>
              <PrivateRoute
                exact={true}
                authed={this.props.isAuthed}
                path="/post/:postID"
                component={PostDetailsContainer}/>
              <PrivateRoute
                exact={true}
                authed={this.props.isAuthed}
                path="/logout"
                component={LogoutContainer}/>
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
    dispatch => bindActionCreators({ ...userActions, ...usersLikesActions }, dispatch),
  )(App),
)
