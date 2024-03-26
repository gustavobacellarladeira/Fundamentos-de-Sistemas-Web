import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { database } from "../../../Firebase";
import { ref, set, push, get, child, remove } from "firebase/database";
import "./styles.css";

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
}

export const PetRegistrationScreen: React.FC = () => {
  const [userPets, setUserPets] = useState<Pet[]>([]);

  const fetchUserPets = async () => {
    try {
      const petsRef = ref(database, "pets"); // Aqui está o caminho para o nó "pets"

      const snapshot = await get(child(petsRef, "/")); // Passamos o caminho relativo do nó filho
      if (snapshot.exists()) {
        const petsData = snapshot.val();
        const petsArray: Pet[] = Object.keys(petsData).map((key) => ({
          id: key,
          ...petsData[key],
        }));
        setUserPets(petsArray);
      } else {
        setUserPets([]);
      }
    } catch (error) {
      console.error("Error fetching user pets:", error);
    }
  };

  useEffect(() => {
    fetchUserPets();
  }, []);

  const initialValues: Pet = {
    id: "",
    name: "",
    breed: "",
    age: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome do pet é obrigatório"),
    breed: Yup.string().required("A raça do pet é obrigatória"),
    age: Yup.number()
      .required("A idade do pet é obrigatória")
      .positive("A idade deve ser positiva"),
  });

  const handleSubmit = async (values: Pet, { resetForm }: any) => {
    try {
      const petsRef = ref(database, "pets");
      const newPetRef = push(petsRef);

      const newID = newPetRef.key as string;

      values.id = newID;

      await set(newPetRef, values);
      console.log("Pet cadastrado com sucesso!");
      fetchUserPets();
      resetForm();
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const petRef = ref(database, `pets/${id}`);

      // acha o pet com o id passado, so que o id esta
      await remove(petRef);
      fetchUserPets();
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div className="pet-registration-screen">
      <div className="form-container">
        <h2>Cadastrar Pet</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Nome do Pet</label>
                <Field type="text" name="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="breed">Raça do Pet</label>
                <Field type="text" name="breed" />
                <ErrorMessage
                  name="breed"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Idade do Pet</label>
                <Field type="number" name="age" />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Cadastrar
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="pet-list">
        <h2>Meus Pets</h2>
        <ul>
          {userPets?.map((pet) => (
            <li key={pet.id}>
              <div>
                <strong>Nome:</strong> {pet.name}
              </div>
              <div>
                <strong>Raça:</strong> {pet.breed}
              </div>
              <div>
                <strong>Idade:</strong> {pet.age}
              </div>
              <div className="options">
                <span
                  role="button"
                  aria-label="Excluir"
                  onClick={() => handleDelete(pet.id)}
                >
                  ❌
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
