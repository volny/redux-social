import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import Home from 'components/home'
import Navigation from 'components/navigation'
import Authenticate from 'components/authenticate'

const MainContainer = styled.div`
  width: 100%;
`

const InnerContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const App = () => (
  <div>
    <Navigation isAuthed={false} />
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

export default App
