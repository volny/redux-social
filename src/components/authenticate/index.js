import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ContentContainer, PageTitle, PageSubTitle, ErrorMessage } from 'styles/sharedStyles'
import AuthButton from 'components/AuthButton'

const ButtonContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`

const Authenticate = ({ error, isFetching, onAuth }) => (
  <ContentContainer>
    <PageTitle>{'Login'}</PageTitle>
    <PageSubTitle>{'Choose your favorite way to Login'}</PageSubTitle>
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
