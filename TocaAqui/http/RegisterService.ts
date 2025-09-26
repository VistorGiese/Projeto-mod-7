import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AccountProps } from "../contexts/AccountFromContexto";
import api from "./api";

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
  estabelecimentoId: number;
}

interface ApiProfileResponse {
  id: number;
  nome_estabelecimento: string;
  nome_dono: string;
  email_responsavel: string;
  celular_responsavel: string;
  generos_musicais: string;
  horario_funcionamento_inicio: string;
  horario_funcionamento_fim: string;
  endereco_id: number;
  senha?: string;
  endereco: EnderecoResponse;
}

interface ProfileResponse {
  estabelecimento: Omit<ApiProfileResponse, "endereco">;
  endereco: EnderecoResponse;
}

type LoginPayload = {
  email_responsavel?: string;
  senha?: string;
};

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
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro ao criar endereço:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
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
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro ao criar estabelecimento:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
    console.error("Erro ao criar estabelecimento:", error);
    throw error;
  }
};

export const loginEstabelecimento = async (
  loginData: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", loginData);
    if (response.data.token && response.data.estabelecimentoId) {
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem(
        "estabelecimentoId",
        String(response.data.estabelecimentoId)
      );
      console.log("API: Token e ID salvos no AsyncStorage.");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro de login:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const getEstabelecimentoProfile = async (): Promise<ProfileResponse> => {
  try {
    const estabelecimentoId = await AsyncStorage.getItem("estabelecimentoId");
    if (!estabelecimentoId) {
      throw new Error("ID do estabelecimento não encontrado no armazenamento.");
    }
    const response = await api.get<ApiProfileResponse>(
      `/estabelecimentos/${estabelecimentoId}`
    );
    const { endereco, ...estabelecimentoData } = response.data;
    return {
      estabelecimento: estabelecimentoData,
      endereco: endereco,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro ao buscar perfil:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
};

export const updateEstabelecimento = async (
  updateData: Partial<AccountProps>
): Promise<void> => {
  try {
    const estabelecimentoId = await AsyncStorage.getItem("estabelecimentoId");
    if (!estabelecimentoId) {
      throw new Error("ID do estabelecimento não encontrado.");
    }
    await api.put(`/estabelecimentos/${estabelecimentoId}`, updateData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro ao atualizar estabelecimento:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
    console.error("Erro ao atualizar estabelecimento:", error);
    throw error;
  }
};

export const updateEndereco = async (
  enderecoId: number,
  updateData: Partial<AccountProps>
): Promise<void> => {
  try {
    await api.put(`/enderecos/${enderecoId}`, updateData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro ao atualizar endereço:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
    console.error("Erro ao atualizar endereço:", error);
    throw error;
  }
};

export const deleteEstabelecimento = async (): Promise<void> => {
  try {
    const estabelecimentoId = await AsyncStorage.getItem("estabelecimentoId");
    if (!estabelecimentoId) {
      throw new Error("ID do estabelecimento não encontrado.");
    }
    await api.delete(`/estabelecimentos/${estabelecimentoId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro ao deletar estabelecimento:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
    console.error("Erro ao deletar estabelecimento:", error);
    throw error;
  }
};

export const deleteEndereco = async (enderecoId: number): Promise<void> => {
  try {
    await api.delete(`/enderecos/${enderecoId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Detalhes do erro ao deletar endereço:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
    console.error("Erro ao deletar endereço:", error);
    throw error;
  }
};
