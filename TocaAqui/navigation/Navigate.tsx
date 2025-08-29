import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "../screens/Inicial";
import Login from "../screens/Login";
import RegisterLocationName from "../screens/RegisterLocationName";
import RegisterLocationAndress from "../screens/RegisterLocationAndress";
import ForgotPassword from "../screens/ForgotPassword";


export type RootStackParamList = {
  Inicial: undefined;
  Login: undefined;
  RegisterLocationName: undefined;
  RegisterLocationAndress: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigate() {
  return (
    <Stack.Navigator
      initialRouteName="Inicial"
      screenOptions={{ headerShown: false }}
    >

      {/* Telas principais do app */}

      <Stack.Screen name="Inicial" component={Inicial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterLocationName" component={RegisterLocationName} />
      <Stack.Screen name="RegisterLocationAndress" component={RegisterLocationAndress} />

      {/* Telas secundárias do app */}
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />



    </Stack.Navigator>
  );
}
