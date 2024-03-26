import { FirebaseError } from "firebase/app";

export const handlerFirebaseError = (error: FirebaseError): string => {
  console.log("error -]]]->", error);
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email já cadastrado";
    case "auth/invalid-email":
      return "Email inválido";
    case "auth/weak-password":
      return "Senha fraca";
    case "auth/user-not-found":
      return "Usuário não encontrado";
    case "auth/wrong-password":
      return "Senha incorreta";
    default:
      return "Erro desconhecido";
  }
};
