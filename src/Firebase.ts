import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBHr4Ue3s0yk1Z-IrpHpz_nLA28AdSvvIU",
  authDomain: "puc-faculdade.firebaseapp.com",
  projectId: "puc-faculdade",
  storageBucket: "puc-faculdade.appspot.com",
  messagingSenderId: "640659141956",
  appId: "1:640659141956:web:ef4a67f3be0f9dba5bd311",
  // real-time database
  databaseURL: "https://puc-faculdade-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Defina a persistência de autenticação desejada
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistência de autenticação definida com sucesso.");
  })
  .catch((error) => {
    console.log("Erro ao definir a persistência de autenticação:", error);
  });
