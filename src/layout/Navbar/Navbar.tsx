import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./styles.css";

interface MyNavbarProps {}

export const MyNavbar: React.FC<MyNavbarProps> = () => {
  const { authenticated, logout } = useAuth();

  if (!authenticated) {
    return (
      <nav className="navbar">
        <Link className="logo" to="/">
          Pet Store
        </Link>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Cadastro</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        Pet Store
      </Link>

      <div className="nav-links">
        <Link to="/pets">Cadastrar Pet</Link>

        {/* <Link to="/meus-produtos">Produtos</Link> */}
        <Link to="/services">Serviços</Link>

        <Link to="/services/banho">Banhos</Link>

        <Link to="/services/tosas">Tosas</Link>

        <Link to="/services/avaliacao">Avaliações</Link>

        <Link to="/services/vacinas">Vacinas</Link>

        <div onClick={logout} className="button_logout">
          Sair
        </div>
      </div>
    </nav>
  );
};
