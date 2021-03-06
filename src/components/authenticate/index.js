import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ContentContainer, ErrorMessage } from 'styles/sharedStyles'
import AuthButton from 'components/AuthButton'
import Logo from 'logo.png'

const ButtonContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`

const TitleImage = styled.img`
  margin-bottom: 2rem;
`

const Authenticate = ({ error, isFetching, onAuth }) => (
  <ContentContainer>
    <TitleImage src={Logo} alt="TWTR" />
    <ButtonContainer>
      <AuthButton provider="github" isFetching={isFetching} onAuth={onAuth} />
      <AuthButton provider="email" isFetching={isFetching} onAuth={onAuth} />
    </ButtonContainer>
    {error ? <ErrorMessage>{error}</ErrorMessage> : null}
  </ContentContainer>
)

Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default Authenticate
