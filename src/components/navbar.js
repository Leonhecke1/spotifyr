import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { handleLogin } from '../functions/login';

function Navibar() {
  return (
    <Navbar fixed="top"collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Spotifyr</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile">Your Profile</Nav.Link>
            <Nav.Link href="/top/artists">Create Festival</Nav.Link>
            <Nav.Link href="/top/genres">Charts</Nav.Link>
            
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={handleLogin}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;