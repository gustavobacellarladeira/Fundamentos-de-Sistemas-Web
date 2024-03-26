import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../constants/api";

// Crie uma instância do Axios com as configurações desejadas
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL, // URL base da API
  timeout: 10000, // Define um timeout em milissegundos para as requisições
  headers: {
    "Content-Type": "application/json",
    // Você pode adicionar outros cabeçalhos personalizados aqui, se necessário
    // pega o token do firebase
  },
});

export default axiosInstance;
