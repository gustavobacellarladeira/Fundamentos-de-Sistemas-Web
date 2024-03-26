import { Link } from "react-router-dom";
import "./styles.css";

export const Home = () => {
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
            <Link to="/signup" className="product-card">
              <div className="card-content">
                <h3>Cadastrar Úsuario</h3>
                <p>Cadastre e tenha acesso a todos os serviços...</p>
              </div>
            </Link>

            <Link to="/login" className="product-card">
              <div className="card-content">
                <h3>Entrar como Úsuario</h3>
                <p>Entre e tenha acesso a todos os serviços...</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
