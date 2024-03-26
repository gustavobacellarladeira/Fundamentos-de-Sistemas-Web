import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const MyNavbar = () => {
  const { authenticated, logout } = useAuth();

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      collapseOnSelect
      className="p-3"
    >
      <Navbar.Brand
        as={Link}
        to={authenticated ? "/" : "/home"}
        className="fw-bold fs-4"
        style={{
          color: "#f44336",
        }}
      >
        Pet Store
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* Adicione aqui os links para outras páginas */}
        </Nav>
        <Nav>
          {!authenticated ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Cadastro
              </Nav.Link>
            </>
          ) : (
            <>
              <NavDropdown title="Serviços" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/services/banho">
                  Banhos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/tosas">
                  Tosas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/avaliacao">
                  Avaliações
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/vacinas">
                  Vacinas
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/services">
                Escolha um serviço
              </Nav.Link>
              <Nav.Link as={Link} to="/pets">
                Cadastrar Pet
              </Nav.Link>

              <Nav.Link onClick={logout}>Sair</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
