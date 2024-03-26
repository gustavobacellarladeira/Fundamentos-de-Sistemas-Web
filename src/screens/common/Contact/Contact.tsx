import "./styles.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Entre em Contato</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          efficitur velit quis purus lacinia, ac convallis nisi tincidunt.
          Vestibulum consequat turpis vitae elit viverra, et aliquet eros
          fringilla.
        </p>
        <p>
          Para mais informações sobre nossos serviços ou para agendar uma
          consulta, entre em contato conosco através dos seguintes meios:
        </p>
        <ul>
          <li>
            Telefone: <a href="tel:+1234567890">(12) 3456-7890</a>
          </li>
          <li>
            Email:{" "}
            <a href="mailto:contato@petstore.com">contato@petstore.com</a>
          </li>
          <li>
            Endereço: Rua dos Animais, 123 - Centro, Cidade - UF, CEP: 12345-678
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
