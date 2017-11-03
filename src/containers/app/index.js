import React from 'react'
import { Route, Link } from 'react-router-dom'
import Headroom from 'react-headroom'

import Home from 'components/home'

const App = () => (
  <div>
    <Headroom style={{ minHeight: '80px', background: '#e5e5e5' }}>
      <Link to="/">Home</Link>
    </Headroom>
    <main>
      <Route exact path="/" component={Home} />
    </main>
  </div>
)

export default App
