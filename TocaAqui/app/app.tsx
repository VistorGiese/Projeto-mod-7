import 'react-native-gesture-handler';

import React from "react";
import Navigate from "../navigation/Navigate";
import { RegistrationProvider } from '../contexts/RegistrationUserContext';

export default function App() {
  return (
    <RegistrationProvider>
      <Navigate />
    </RegistrationProvider>
  );
}