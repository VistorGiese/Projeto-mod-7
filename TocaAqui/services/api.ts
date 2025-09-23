import axios from "axios";
import { AccountProps } from "../contexts/AccountFromContexto";

const api = axios.create({
  baseURL: "http://192.168.3.24:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerAccount = async (formData: AccountProps) => {
  try {
    const response = await api.post("/register", formData);

    return response.data;
  } catch (error) {
    console.error("Erro ao registrar a conta:", error);
    throw error;
  }
};
