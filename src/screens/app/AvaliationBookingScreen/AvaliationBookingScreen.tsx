import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { database } from "../../../Firebase";
import "./styles.css";
import { Pet } from "../PetRegistrationScreen/PetRegistrationScreen";
import { ref, push, get, child, remove, onValue } from "firebase/database";

interface Avaliation {
  id: string;
  petName: string;
  date: string;
  time: string;
  status: string;
}

export const AvaliationBookingScreen: React.FC = () => {
  const [avaliations, setAvaliations] = useState<Avaliation[]>([]);
  const [userPets, setUserPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetchUserPets();
    fetchAvaliations();
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

  const fetchAvaliations = () => {
    try {
      const avaliationsRef = ref(database, "avaliations");

      onValue(avaliationsRef, (snapshot) => {
        const avaliationsData = snapshot.val();
        if (avaliationsData) {
          const avaliationsArray: Avaliation[] = Object.keys(
            avaliationsData
          ).map((key) => ({
            id: key,
            ...avaliationsData[key],
          }));
          setAvaliations(avaliationsArray);
        } else {
          setAvaliations([]);
        }
      });
    } catch (error) {
      console.error("Error fetching avaliations:", error);
    }
  };

  const initialValues: Avaliation = {
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

  const handleSubmit = async (values: Avaliation, { resetForm }: any) => {
    try {
      const avaliationsRef = ref(database, "avaliations");
      await push(avaliationsRef, values);
      resetForm();
    } catch (error) {
      console.error("Error adding avaliation:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const avaliationRef = ref(database, `avaliations/${id}`);
      await remove(avaliationRef);
    } catch (error) {
      console.error("Error deleting avaliation:", error);
    }
  };

  return (
    <div className="avaliations-booking-screen">
      <div className="form-container">
        <h2>Agendar Avaliação</h2>
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
      <div className="avaliation-list">
        <h2>Avaliações Agendadas</h2>
        <ul>
          {avaliations.map((avaliation) => (
            <li key={avaliation.id}>
              <div>
                <strong>Pet:</strong> {avaliation.petName}
              </div>
              <div>
                <strong>Data:</strong> {avaliation.date}
              </div>
              <div>
                <strong>Hora:</strong> {avaliation.time}
              </div>
              <div>
                <strong>Status:</strong> {avaliation.status}
              </div>
              <div className="options">
                <span
                  role="img"
                  aria-label="Excluir"
                  onClick={() => handleDelete(avaliation.id)}
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
