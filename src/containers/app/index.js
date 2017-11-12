import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Home from 'components/Home'
import Navigation from 'components/Navigation'
import Authenticate from 'containers/AuthenticateContainer'
import FeedContainer from 'containers/FeedContainer'

const MainContainer = styled.div`
  width: 100%;
`

const InnerContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

function PrivateRoute ({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}/>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired,
  location: PropTypes.object,
}

function PublicRoute ({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/feed', state: { from: props.location } }} />
        )}/>
  )
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired,
  location: PropTypes.object,
}

class App extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    // withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  render () {
    return (
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

export default withRouter(connect(({ users: { isAuthed } }) => ({ isAuthed }))(App))
