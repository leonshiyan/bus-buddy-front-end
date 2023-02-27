// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'
//compoenents
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
      <Container>
        <Navbar.Brand href="/">
          <img
              alt=""
              src="/bus.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
          />{' '}
          BusBuddy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user ?
          <Nav className="me-auto">
            <Nav.Link href="/stops">My Bus Stops</Nav.Link>
            <Nav.Link href="/profiles">Profiles</Nav.Link>
            <Nav.Link href="/change-password">Change Password</Nav.Link>
            <Nav.Link href="" onClick={handleLogout}>LOG OUT</Nav.Link>
          </Nav>
          :
          <Nav className="me-auto">
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
