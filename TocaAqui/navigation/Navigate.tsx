import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// Telas
import AdditionalInformation from "../screens/AdditionalInformation";
import ArtistProfile from "../screens/ArtistProfile";
import ConfirmRegister from "../screens/ConfirmRegister";
import CreateEvent from "../screens/CreateEvent";
import ForgotPassword from "../screens/ForgotPassword";
import HomePage from "../screens/HomePage";
import InfoEvent from "../screens/InfoEvent";
import InformationPersonResponsible from "../screens/InformationPersonResponsible";
import Initial from "../screens/Initial";
import Login from "../screens/Login";
import RegisterLocationAndress from "../screens/RegisterLocationAndress";
import RegisterLocationName from "../screens/RegisterLocationName";
import Schedulling from "../screens/Schedulling";

export type RootStackParamList = {
  Initial: undefined;
  Login: undefined;
  RegisterLocationName: undefined;
  RegisterLocationAndress: undefined;
  ForgotPassword: undefined;
  InformationPersonResponsible: undefined;
  AdditionalInformation: undefined;
  HomePage: undefined;
  Schedulling: undefined;
  CreateEvent: undefined;
  InfoEvent: undefined;
  ArtistProfile: undefined;
  ConfirmRegister: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigate() {

  return (
    <Stack.Navigator
      initialRouteName="Initial"
      screenOptions={{ headerShown: false }}
    >
      {/* Telas principais do app Antes do Login */}
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />

      {/* Agrupamento de telas de registro */}
      <Stack.Group>
        <Stack.Screen name="RegisterLocationName" component={RegisterLocationName} />
        <Stack.Screen name="RegisterLocationAndress" component={RegisterLocationAndress} />
        <Stack.Screen name="InformationPersonResponsible" component={InformationPersonResponsible} />
        <Stack.Screen name="AdditionalInformation" component={AdditionalInformation} />
        <Stack.Screen name="ConfirmRegister" component={ConfirmRegister} />
      </Stack.Group>

      {/* Telas principais do app Após o Login */}
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Schedulling" component={Schedulling} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="InfoEvent" component={InfoEvent} />
      <Stack.Screen name="ArtistProfile" component={ArtistProfile} />

      {/* Telas secundárias do app */}
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}