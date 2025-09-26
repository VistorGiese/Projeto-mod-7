import 'react-native-gesture-handler';

import React from "react";
import { AccountProvider } from '../contexts/AccountFromContexto';
import Navigate from "../navigation/Navigate";

export default function App() {
  return (
    <AccountProvider>
      <Navigate />
    </AccountProvider>
  );
}