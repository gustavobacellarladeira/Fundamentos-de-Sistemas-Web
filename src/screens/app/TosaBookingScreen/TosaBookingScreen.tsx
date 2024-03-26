import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { database } from "../../../Firebase";
import "./styles.css";
import { Pet } from "../PetRegistrationScreen/PetRegistrationScreen";
import { ref, push, get, child, remove, onValue } from "firebase/database";

interface Tosa {
  id: string;
  petName: string;
  date: string;
  time: string;
  status: string;
}

export const TosaBookingScreen: React.FC = () => {
  const [tosas, setTosas] = useState<Tosa[]>([]);
  const [userPets, setUserPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetchUserPets();
    fetchTosas();
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

  const fetchTosas = () => {
    try {
      const tosasRef = ref(database, "tosas");

      onValue(tosasRef, (snapshot) => {
        const tosasData = snapshot.val();
        if (tosasData) {
          const tosasArray: Tosa[] = Object.keys(tosasData).map((key) => ({
            id: key,
            ...tosasData[key],
          }));
          setTosas(tosasArray);
        } else {
          setTosas([]);
        }
      });
    } catch (error) {
      console.error("Error fetching tosas:", error);
    }
  };

  const initialValues: Tosa = {
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

  const handleSubmit = async (values: Tosa, { resetForm }: any) => {
    try {
      const tosasRef = ref(database, "tosas");
      await push(tosasRef, values);
      resetForm();
    } catch (error) {
      console.error("Error adding tosa:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const tosaRef = ref(database, `tosas/${id}`);
      await remove(tosaRef);
    } catch (error) {
      console.error("Error deleting tosa:", error);
    }
  };

  return (
    <div className="tosa-booking-screen">
      <div className="form-container">
        <h2>Agendar Tosa</h2>
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
      <div className="tosa-list">
        <h2>Tosas Agendadas</h2>
        <ul>
          {tosas.map((tosa) => (
            <li key={tosa.id}>
              <div>
                <strong>Pet:</strong> {tosa.petName}
              </div>
              <div>
                <strong>Data:</strong> {tosa.date}
              </div>
              <div>
                <strong>Hora:</strong> {tosa.time}
              </div>
              <div>
                <strong>Status:</strong> {tosa.status}
              </div>
              <div className="options">
                <span
                  role="img"
                  aria-label="Excluir"
                  onClick={() => handleDelete(tosa.id)}
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

export default TosaBookingScreen;
