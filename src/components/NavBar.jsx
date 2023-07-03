import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function OffcanvasExample() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Hoyo 3</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/reservas">Reservas</Nav.Link>
            <Nav.Link href="/tareas">Tareas</Nav.Link>
            <NavDropdown title="Pagos" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Expensas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               Bancos
              </NavDropdown.Item>
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