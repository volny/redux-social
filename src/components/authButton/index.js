import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ActionButton } from 'styles/sharedStyles'

const StyledButton = styled(ActionButton)`
  margin: 0.3rem 0;
  width: 20rem;
  padding: 1rem;
`

const AuthButton = ({ provider, isFetching, onAuth }) => (
  <StyledButton onClick={onAuth}>{`Login with ${provider.toUpperCase()}`}</StyledButton>
)

AuthButton.propTypes = {
  provider: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default AuthButton
