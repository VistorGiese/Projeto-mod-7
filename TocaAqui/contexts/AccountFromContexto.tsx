import { createContext, useState } from "react";

export type AccountProps = {
    nome?: string;
    email_responsavel?: string;
    password?: string;
    passwordConfirm?: string;
    celular_responsavel?: string;
    nome_estabelecimento?: string;
    cidade?: string;
    estado?: string;
    rua?: string;
    numero?: string;
    bairro?: string;
    cep?: string;
    generos_musicais?: string;
    horario_funcionamento_inicio?: string;
    horario_funcionamento_fim?: string;
    nome_dono?: string;
}

type AccountFormContextDataProps = {
    accountFormData: AccountProps;
    updateFormData: (formData: AccountProps) => void
}

type AccountFormContextProviderProps = {
    children: React.ReactNode;
}

const AccontFormContext = createContext<AccountFormContextDataProps>({} as AccountFormContextDataProps);

function AccountProvider({ children }: AccountFormContextProviderProps) {
    const [accountFormData, setAccountFormData] = useState<AccountProps>({} as AccountProps);

    function updateFormData(data: AccountProps) {
        setAccountFormData(prevState => ({ ...prevState, ...data }));
    }

    return (
        <AccontFormContext.Provider value={{
            accountFormData,
            updateFormData
        }}>
            {children}
        </AccontFormContext.Provider>
    );
}

export { AccontFormContext, AccountProvider };

