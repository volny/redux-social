import React from 'react'
import PropTypes from 'prop-types'

import { ContentContainer, PageTitle, PageSubTitle } from 'sharedStyles'

const Authenticate = ({ error, isFetching, onAuth }) => (
  <ContentContainer>
    <PageTitle>Login</PageTitle>
    {error ? <p>{error}</p> : null}
  </ContentContainer>
)

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default Authenticate
