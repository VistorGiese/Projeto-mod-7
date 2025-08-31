import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Initial from "../screens/Initial";
import Login from "../screens/Login";
import RegisterLocationName from "../screens/RegisterLocationName";
import RegisterLocationAndress from "../screens/RegisterLocationAndress";
import ForgotPassword from "../screens/ForgotPassword";


export type RootStackParamList = {
  Initial: undefined;
  Login: undefined;
  RegisterLocationName: undefined;
  RegisterLocationAndress: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigate() {
  return (
    <Stack.Navigator
      initialRouteName="Initial"
      screenOptions={{ headerShown: false }}
    >

      {/* Telas principais do app */}

      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterLocationName" component={RegisterLocationName} />
      <Stack.Screen name="RegisterLocationAndress" component={RegisterLocationAndress} />

      {/* Telas secundárias do app */}
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />



    </Stack.Navigator>
  );
}
