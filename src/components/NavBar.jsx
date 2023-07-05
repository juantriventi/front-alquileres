import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function OffcanvasExample() {
  return (
    <>
    <Navbar expand="lg" className="navbarbg">
      <Container>
        <Navbar.Brand  className='text-white' href="/">Hoyo 3 Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='text-white' href="/">Inicio</Nav.Link>
            <Nav.Link className='text-white' href="/reservas">Reservas</Nav.Link>
            <Nav.Link className='text-white' href="/tareas">Tareas</Nav.Link>
            <NavDropdown className='text-white' title="Pagos" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Expensas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"> Bancos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sueldos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  );
}

export default OffcanvasExample;