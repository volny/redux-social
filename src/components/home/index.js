import React from 'react'
import styled from 'styled-components'

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 1rem 0;
`

const Title = styled.h1`
  color: #ab4642;
  font-size: 5rem;
  font-weight: 100;
  margin: 0;
  padding: 0.25rem 0;
`

const SubTitle = styled.h2`
  color: #7cafc2;
  font-size: 2rem;
  font-weight: 100;
  margin: 0;
  padding: 0;
`

const Home = props => (
  <HomeContainer>
    <Title>App Title</Title>
    <SubTitle>Much Awesome</SubTitle>
  </HomeContainer>
)

export default Home
