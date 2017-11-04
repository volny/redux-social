import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Headroom from 'react-headroom'
import styled from 'styled-components'

const NavBar = styled(Headroom)`
  min-height: 80px;
  background: #e5e5e5;
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

const NavLink = styled(Link)`
  color: #222222;
  font-size: 20px;
  text-decoration: none;
  &:hover {
    color: #a1b56c;
  }
`

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
`

const NavListItem = styled.li`
  list-style-type: none;
  padding: 0 0.5rem;
`

const NavLinks = ({ isAuthed }) =>
  isAuthed === true ? (
    <NavList>
      <NavListItem>
        <NavLink to="/">Home</NavLink>
      </NavListItem>
    </NavList>
  ) : null

const ActionLinks = ({ isAuthed }) =>
  isAuthed === true ? (
    <NavList>
      <NavListItem>
        <NavLink to="/">{'New Post'}</NavLink>
      </NavListItem>
      <NavListItem>
        <NavLink to="/logout">{'Logout'}</NavLink>
      </NavListItem>
    </NavList>
  ) : (
    <NavList>
      <NavListItem>
        <NavLink to="/login">Login</NavLink>
      </NavListItem>
    </NavList>
  )

const Navigation = ({ isAuthed }) => (
  <NavBar>
    <NavContainer>
      <NavLinks isAuthed={isAuthed} />
      <ActionLinks isAuthed={isAuthed} />
    </NavContainer>
  </NavBar>
)

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

export default Navigation
