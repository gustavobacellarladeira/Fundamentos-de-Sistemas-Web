import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/" className="logo">
            Pet Store
          </Link>
        </div>
        <div className="footer-nav">
          <div className="nav-links">
            <Link to="/services">Serviços</Link>
            <Link to="/about">Sobre Nós</Link>
            <Link to="/contact">Contato</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Pet Store. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
