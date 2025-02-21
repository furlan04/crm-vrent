import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">CRM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Tabella clienti</Nav.Link>
            <Nav.Link href="/Analitica">Analitica</Nav.Link>
            <Nav.Link href="/createAgente">Aggiungi agente</Nav.Link>
            <Nav.Link href="/createCliente">Aggiungi cliente</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;