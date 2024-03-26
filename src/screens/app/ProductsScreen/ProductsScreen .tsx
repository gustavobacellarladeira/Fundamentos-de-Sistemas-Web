import { Link } from "react-router-dom";
import "./styles.css"; // Importe os estilos específicos desta tela

export const ProductsScreen = () => {
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
          <h2>Opções de Produtos</h2>
          <div className="product-cards">
            <Link to="/products/caes" className="service-card">
              <div className="service-card-content">
                <h3>Cães</h3>
                <p>Descrição do serviço para cães...</p>
              </div>
            </Link>
            <Link to="/products/gatos" className="service-card">
              <div className="service-card-content">
                <h3>Gatos</h3>
                <p>Descrição do serviço para gatos...</p>
              </div>
            </Link>
            <Link to="/products/diversoes" className="service-card">
              <div className="service-card-content">
                <h3>Diversões</h3>
                <p>Descrição do serviço de diversões...</p>
              </div>
            </Link>
            <Link to="/products/brinquedos" className="service-card">
              <div className="service-card-content">
                <h3>Brinquedos</h3>
                <p>Descrição do serviço de brinquedos...</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
