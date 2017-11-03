import React from 'react'
import { Route, Link } from 'react-router-dom'
import Headroom from 'react-headroom'
import styled from 'styled-components'

import Home from 'components/home'

const MainContainer = styled.div`
  width: 100%;
`

const InnerContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const App = () => (
  <div>
    <Headroom style={{ minHeight: '80px', background: '#e5e5e5' }}>
      <Link to="/">Home</Link>
    </Headroom>
    <main>
      <MainContainer>
        <InnerContainer>
          <Route exact path="/" component={Home} />
        </InnerContainer>
      </MainContainer>
    </main>
  </div>
)

export default App
