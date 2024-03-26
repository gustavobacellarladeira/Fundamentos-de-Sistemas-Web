import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import "./styles.css";

export const Login = () => {
  const { login, loading } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      window.alert(
        "Ocorreu um erro durante o login. Por favor, tente novamente."
      );
    }
    setFieldError("general", "Email ou senha inválidos");
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Entrar</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ErrorMessage
                      name="general"
                      component="div"
                      className="text-danger"
                    />
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        placeholder="Email"
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Senha</label>
                      <Field
                        placeholder="Senha"
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="w-100 text-center mt-2">
              Não tem uma conta?{" "}
              <Link to="/signup" className="linkj-login">
                Cadastrar-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
