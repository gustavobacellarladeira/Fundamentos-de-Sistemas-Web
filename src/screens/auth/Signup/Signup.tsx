import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import "./styles.css";

export const Signup = () => {
  const { signup } = useAuth();

  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Senha é obrigatória"),

    passwordConfirm: Yup.string().nullable().required("Confirme sua senha"),
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // verifica se as senhas são iguais

      if (values.password !== values.passwordConfirm) {
        setFieldError("passwordConfirm", "As senhas não coincidem");
        return;
      }

      await signup({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      window.alert("Falha ao criar uma conta. Por favor, tente novamente.");
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Cadastrar</h2>
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
                    <div className="form-group">
                      <label htmlFor="passwordConfirm">Confirmar Senha</label>
                      <Field
                        placeholder="Confirmar Senha"
                        type="password"
                        name="passwordConfirm"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="passwordConfirm"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registrando..." : "Registrar"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="w-100 text-center mt-2">
              Já tem uma conta?{" "}
              <Link to="/login" className="linkj-login">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
