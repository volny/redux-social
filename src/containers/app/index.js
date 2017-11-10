import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Home from 'components/Home'
import Navigation from 'components/Navigation'
import Authenticate from 'containers/AuthenticateContainer'

const MainContainer = styled.div`
  width: 100%;
`

const InnerContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const App = ({ isAuthed }) => (
  <div>
    <Navigation isAuthed={isAuthed} />
    <main>
      <MainContainer>
        <InnerContainer>
          <Route exact path="/login" component={Authenticate} />
          <Route exact path="/" component={Home} />
        </InnerContainer>
      </MainContainer>
    </main>
  </div>
)

App.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default connect(({ users: { isAuthed } }) => ({ isAuthed }))(App)
