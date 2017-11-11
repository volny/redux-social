import React from 'react'
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

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}
    />
  )
}

const App = ({ isAuthed }) => (
  <div>
    <Navigation isAuthed={isAuthed} />
    <main>
      <MainContainer>
        <InnerContainer>
          <Route exact path="/login" component={Authenticate} />
          <PrivateRoute exact authed={isAuthed} path="/feed" component={FeedContainer} />
          <Route exact path="/" component={Home} />
        </InnerContainer>
      </MainContainer>
    </main>
  </div>
)

App.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default withRouter(connect(({ users: { isAuthed } }) => ({ isAuthed }))(App))
