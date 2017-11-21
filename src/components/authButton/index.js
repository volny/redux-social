import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ActionButton } from 'styles/sharedStyles'

const Button = styled.button`
  color: #ffffff;
  background: #aaaaaa;
  padding: 1rem;
  margin: 0.3rem 0;
  border-radius: 6px;
  border-width: 2px;
  border-color: #dddddd;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: #dddddd;
    color: #777777;
  }
`

const StyledButton = styled(ActionButton)`
  margin: 0.3rem 0;
  width: 20rem;
  padding: 1rem;
`

const AuthButton = ({ provider, isFetching, onAuth }) => (
  <StyledButton onClick={onAuth}>
    {isFetching === true ? 'Loading' : `Login with ${provider.toUpperCase()}`}
  </StyledButton>
)

AuthButton.propTypes = {
  provider: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default AuthButton
