import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import betternow from "../../assets/img/betternow.png";

function NavbarMain() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={betternow}
            alt="logo"
            className="logo"
            style={{ width: "50px", heigth: "50px", borderRadius: "10px" }}
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/usuarios">Usuários</Nav.Link>
          <Nav.Link href="/peliculas">Películas</Nav.Link>
          <Nav.Link href="notificacoes">Notificações</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
