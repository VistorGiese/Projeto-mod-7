import React, { createContext, useState, useContext, ReactNode } from 'react';

interface RegistrationData {
    establishmentName?: string;
    address?: {
        cep: string;
        estado: string;
        cidade: string;
        bairro: string;
        endereco: string;
    };
    personalInfo?: {
        name: string;
        email: string;
        phone: string;
    };
    additionalInfo?: {
        genre: string;
        schedule: string;
    };
}

interface RegistrationContextType {
    formData: RegistrationData;
    updateFormData: (data: Partial<RegistrationData>) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<RegistrationData>({});

    const updateFormData = (data: Partial<RegistrationData>) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    return (
        <RegistrationContext.Provider value={{ formData, updateFormData }}>
            {children}
        </RegistrationContext.Provider>
    );
};


export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error('useRegistration deve ser usado dentro de um RegistrationProvider');
    }
    return context;
};