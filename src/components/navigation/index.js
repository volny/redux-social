import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Headroom from 'react-headroom'
import styled from 'styled-components'

import ModalContainer from 'containers/ModalContainer'
import { ActionButton } from 'styles/sharedStyles'

const NavBar = styled(Headroom)`
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
  max-width: 800px;
`

const NavListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding: 0 0.5rem;
`

const LogoutButton = styled(ActionButton)`
  background: #aaaaaa;
  &:hover {
    background: #888888;
  }
`

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
`

const TitleLogo = styled.img`
  width: 60px;
  height: 60px;
`

const NavLinks = () => (
  <NavList>
    <NavListItem>
      <Link to="/">
        <TitleLogo
          src="http://fowley.net/wp-content/uploads/2016/04/logo-tweeten-300x300.png"
          alt="Twitter"/>{' '}
      </Link>
    </NavListItem>
  </NavList>
)

const ActionLinks = ({ isAuthed }) =>
  isAuthed === true ? (
    <NavList>
      <NavListItem>
        <ModalContainer />
      </NavListItem>
      <NavListItem>
        <Link to="/logout">
          <LogoutButton>{'Logout'}</LogoutButton>
        </Link>
      </NavListItem>
    </NavList>
  ) : (
    <NavList>
      <NavListItem>
        <Link to="/login">
          <ActionButton>{'Login'}</ActionButton>
        </Link>
      </NavListItem>
    </NavList>
  )

const Navigation = ({ isAuthed }) => (
  <NavBar>
    <NavContainer>
      <NavLinks />
      <ActionLinks isAuthed={isAuthed} />
    </NavContainer>
  </NavBar>
)

Navigation.propTypes = ActionLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default Navigation
