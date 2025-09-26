import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountProps } from "../contexts/AccountFromContexto";

const baseURL = "http://192.168.3.24:3000"; //adicionar IP do seu pc aqui

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return AsyncStorage.getItem("userToken").then((token) => {
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface EnderecoResponse {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface EstabelecimentoResponse {
  id: number;
}

interface LoginResponse {
  token: string;
}

export const createEndereco = async (
  enderecoData: Partial<AccountProps>
): Promise<EnderecoResponse> => {
  try {
    const response = await api.post<EnderecoResponse>(
      "/enderecos",
      enderecoData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar endereço:", error);
    throw error;
  }
};

export const createEstabelecimento = async (
  estabelecimentoData: Partial<AccountProps>
): Promise<EstabelecimentoResponse> => {
  try {
    const response = await api.post<EstabelecimentoResponse>(
      "/estabelecimentos",
      estabelecimentoData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar estabelecimento:", error);
    throw error;
  }
};

export const loginEstabelecimento = async (
  loginData: Pick<AccountProps, "email_responsavel" | "password">
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", loginData);
    if (response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
