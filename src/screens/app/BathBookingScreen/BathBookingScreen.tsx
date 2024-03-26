import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { database } from "../../../Firebase";
import "./styles.css";
import { Pet } from "../PetRegistrationScreen/PetRegistrationScreen";
import { ref, push, get, child, remove, onValue } from "firebase/database";

interface Bath {
  id: string;
  petName: string;
  date: string;
  time: string;
  status: string;
}

export const BathBookingScreen: React.FC = () => {
  const [baths, setBaths] = useState<Bath[]>([]);
  const [userPets, setUserPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetchUserPets();
    fetchBaths();
  }, []);

  const fetchUserPets = async () => {
    try {
      const petsRef = ref(database, "pets");

      const snapshot = await get(child(petsRef, "/"));
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

  const fetchBaths = () => {
    try {
      const bathsRef = ref(database, "baths");

      onValue(bathsRef, (snapshot) => {
        const bathsData = snapshot.val();
        if (bathsData) {
          const bathsArray: Bath[] = Object.keys(bathsData).map((key) => ({
            id: key,
            ...bathsData[key],
          }));
          setBaths(bathsArray);
        } else {
          setBaths([]);
        }
      });
    } catch (error) {
      console.error("Error fetching baths:", error);
    }
  };

  const initialValues: Bath = {
    id: "",
    petName: "",
    date: "",
    time: "",
    status: "Agendado",
  };

  const validationSchema = Yup.object().shape({
    petName: Yup.string().required("O nome do pet é obrigatório"),
    date: Yup.date().required("A data é obrigatória"),
    time: Yup.string().required("A hora é obrigatória"),
  });

  const handleSubmit = async (values: Bath, { resetForm }: any) => {
    try {
      const bathsRef = ref(database, "baths");
      await push(bathsRef, values);
      resetForm();
    } catch (error) {
      console.error("Error adding bath:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const bathRef = ref(database, `baths/${id}`);
      await remove(bathRef);
    } catch (error) {
      console.error("Error deleting bath:", error);
    }
  };

  return (
    <div className="bath-booking-screen">
      <div className="form-container">
        <h2>Agendar Banho</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="petName">Nome do Pet</label>
                <Field as="select" name="petName">
                  <option value="" disabled>
                    Selecione um pet
                  </option>
                  {userPets.map((pet) => (
                    <option key={pet.id} value={pet.name}>
                      {pet.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="petName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Data</label>
                <Field type="date" name="date" />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Hora</label>
                <Field type="time" name="time" />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Agendar
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="bath-list">
        <h2>Banhos Agendados</h2>
        <ul>
          {baths.map((bath) => (
            <li key={bath.id}>
              <div>
                <strong>Pet:</strong> {bath.petName}
              </div>
              <div>
                <strong>Data:</strong> {bath.date}
              </div>
              <div>
                <strong>Hora:</strong> {bath.time}
              </div>
              <div>
                <strong>Status:</strong> {bath.status}
              </div>
              <div className="options">
                <span
                  role="img"
                  aria-label="Excluir"
                  onClick={() => handleDelete(bath.id)}
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

export default BathBookingScreen;
