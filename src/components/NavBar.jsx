import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth0 } from "@auth0/auth0-react";
import { Login } from './Login';
import { Logout } from './Logout';

function OffcanvasExample() {

  const { isAuthenticated } = useAuth0();

  return (
    <>
    <Navbar expand="lg" className="navbarbg">
      <Container>
        <Navbar.Brand  className='text-white' href="/">Hoyo 3 Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {isAuthenticated ? <Nav.Link className='text-white' href="/">Inicio</Nav.Link> : ""}
          {isAuthenticated ? <Nav.Link className='text-white' href="/reservas">Reservas</Nav.Link>  : ""}
          {isAuthenticated ? <Nav.Link className='text-white' href="/tareas">Tareas</Nav.Link>  : ""}
          {isAuthenticated ? <Logout /> : <Login />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  );
}

export default OffcanvasExample;