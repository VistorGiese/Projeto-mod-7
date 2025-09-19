import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import Initial from "../screens/Initial";
import Login from "../screens/Login";
import RegisterLocationName from "../screens/RegisterLocationName";
import RegisterLocationAndress from "../screens/RegisterLocationAndress";
import ForgotPassword from "../screens/ForgotPassword";
import InformationPersonResponsible from "../screens/InformationPersonResponsible";
import AdditionalInformation from "../screens/AdditionalInformation";
import HomePage from "../screens/HomePage";
import Schedulling from "../screens/Schedulling";
import CreateEvent from "../screens/CreateEvent";
import InfoEvent from "../screens/InfoEvent";
import ArtistProfile from "../screens/ArtistProfile";

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