import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const colorpicker = provider => {
  switch (provider) {
    case 'facebook':
      return {
        color: '#ffffff',
        background: '#3B5998',
      }
    case 'github':
      return {
        color: '#ffffff',
        background: '#333',
      }
    default:
      return {
        color: '#ffffff',
        background: '#aaaaaa',
      }
  }
}

const Button = styled.button`
  padding: 1rem;
  margin: 0.3rem 0;
  border-radius: 3px;
  border-width: 0;
  font-size: 20px;
  cursor: pointer;
`

const AuthButton = ({ provider, isFetching, onAuth }) => (
  <Button onClick={onAuth} style={colorpicker(provider)}>
    {isFetching === true ? 'Loading' : `Login with ${provider.toUpperCase()}`}
  </Button>
)

AuthButton.propTypes = {
  provider: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default AuthButton
