import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "../screens/Inicial";
import Login from "../screens/Login";
import Register from "../screens/Register";

export type RootStackParamList = {
  Inicial: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigate() {
  return (
    <Stack.Navigator
      initialRouteName="Inicial"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Inicial" component={Inicial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
