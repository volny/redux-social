import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

import { PageSubTitle } from 'styles/sharedStyles'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledSpinner = styled(Spinner)`
  margin: 0.5rem 0 0 1rem;
`

const Fetching = () => (
  <Container>
    <PageSubTitle>{'Fetching'}</PageSubTitle>
    <StyledSpinner name="circle" color="#0592ff" />
  </Container>
)

export default Fetching
