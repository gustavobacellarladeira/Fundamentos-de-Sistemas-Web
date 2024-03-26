import { Link } from "react-router-dom";
import "./styles.css";

export const ServicesScreen = () => {
  return (
    <div className="services">
      <div className="service-layout">
        <div className="service-image">
          <img
            src="https://blog.cobasi.com.br/wp-content/uploads/2020/07/boston-terrier-capa1.png"
            alt="Dog"
          />
        </div>
        <div className="service-options">
          <h2>Opções de Serviços</h2>
          <div className="service-cards">
            <Link to="/services/banho" className="product-card">
              <div className="card-content">
                <h3>Banho</h3>
                <p>Agende um banho para o seu pet...</p>
              </div>
            </Link>
            <Link to="/services/vacinas" className="product-card">
              <div className="card-content">
                <h3>Vacinas</h3>
                <p>Agende uma vacina para o seu pet...</p>
              </div>
            </Link>
            <Link to="/services/avaliacao" className="product-card">
              <div className="card-content">
                <h3>Avaliação</h3>
                <p>Agende uma avaliação para o seu pet...</p>
              </div>
            </Link>

            <Link to="/services/tosas" className="product-card">
              <div className="card-content">
                <h3>Tosa</h3>
                <p>Agende uma tosa para o seu pet...</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
