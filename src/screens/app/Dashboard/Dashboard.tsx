import { Link } from "react-router-dom";
import "./styles.css";

export const Dashboard = () => {
  return (
    <div className="products-screen">
      <div className="product-layout">
        <div className="dog-image">
          <img
            src="https://blog.cobasi.com.br/wp-content/uploads/2020/07/boston-terrier-capa1.png"
            alt="Dog"
          />
        </div>
        <div className="product-options">
          <h2>Escolha uma opção</h2>
          <div className="product-cards">
            {/* <Link to="/meus-produtos" className="product-card">
              <div className="card-content">
                <h3>Produtos</h3>
                <p>Nosso catálogo de produtos...</p>
              </div>
            </Link> */}
            <Link to="/services" className="product-card">
              <div className="card-content">
                <h3>Serviços</h3>
                <p>Nossos serviços disponíveis...</p>
              </div>
            </Link>

            <Link to="/pets" className="product-card">
              <div className="card-content">
                <h3>Cadastrar Pet</h3>
                <p>Cadastre seu pet para agendar serviços...</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
