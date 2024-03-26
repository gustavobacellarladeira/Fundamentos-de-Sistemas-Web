import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { database } from "../../../Firebase";
import "./styles.css";
import { Pet } from "../PetRegistrationScreen/PetRegistrationScreen";
import { ref, push, get, child, remove, onValue } from "firebase/database";

interface Vaccine {
  id: string;
  petName: string;
  date: string;
  time: string;
  status: string;
}

export const VaccineBookingScreen: React.FC = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [userPets, setUserPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetchUserPets();
    fetchVaccines();
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

  const fetchVaccines = () => {
    try {
      const vaccinesRef = ref(database, "vaccines");

      onValue(vaccinesRef, (snapshot) => {
        const vaccinesData = snapshot.val();
        if (vaccinesData) {
          const vaccinesArray: Vaccine[] = Object.keys(vaccinesData).map(
            (key) => ({
              id: key,
              ...vaccinesData[key],
            })
          );
          setVaccines(vaccinesArray);
        } else {
          setVaccines([]);
        }
      });
    } catch (error) {
      console.error("Error fetching vaccines:", error);
    }
  };

  const initialValues: Vaccine = {
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

  const handleSubmit = async (values: Vaccine, { resetForm }: any) => {
    try {
      const vaccinesRef = ref(database, "vaccines");
      await push(vaccinesRef, values);
      resetForm();
    } catch (error) {
      console.error("Error adding vaccine:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const vaccineRef = ref(database, `vaccines/${id}`);
      await remove(vaccineRef);
    } catch (error) {
      console.error("Error deleting vaccine:", error);
    }
  };

  return (
    <div className="vaccine-booking-screen">
      <div className="form-container">
        <h2>Agendar Vacina</h2>
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
      <div className="vaccine-list">
        <h2>Vacinas Agendadas</h2>
        <ul>
          {vaccines.map((vaccine) => (
            <li key={vaccine.id}>
              <div>
                <strong>Pet:</strong> {vaccine.petName}
              </div>
              <div>
                <strong>Data:</strong> {vaccine.date}
              </div>
              <div>
                <strong>Hora:</strong> {vaccine.time}
              </div>
              <div>
                <strong>Status:</strong> {vaccine.status}
              </div>
              <div className="options">
                <span
                  role="img"
                  aria-label="Excluir"
                  onClick={() => handleDelete(vaccine.id)}
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
