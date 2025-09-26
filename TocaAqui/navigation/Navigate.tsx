import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Initial from "../screens/Initial";
import Login from "../screens/Login";
import RegisterLocationName from "../screens/RegisterLocationName";
import RegisterLocationAndress from "../screens/RegisterLocationAndress";
import RegisterPassword from "../screens/RegisterPassword";
import InformationPersonResponsible from "../screens/InformationPersonResponsible";
import Schedulling from "../screens/Schedulling";
import AdditionalInformation from "../screens/AdditionalInformation";
import ArtistProfile from "../screens/ArtistProfile";
import ConfirmRegister from "../screens/ConfirmRegister";
import CreateEvent from "../screens/CreateEvent";
import ForgotPassword from "../screens/ForgotPassword";
import HomePage from "../screens/HomePage";
import InfoEvent from "../screens/InfoEvent";
import Profile from "../screens/Profile";
import ArtistProfile from "../screens/ArtistProfile";
import EventDetail from "../screens/EventDetail";
import { Booking } from "@/http/bookingService";

export type RootStackParamList = {
  Initial: undefined;
  Login: undefined;
  RegisterLocationName: undefined;
  RegisterLocationAndress: undefined;
  RegisterPassword: undefined;
  ForgotPassword: undefined;
  InformationPersonResponsible: undefined;
  AdditionalInformation: undefined;
  HomePage: undefined;
  Schedulling: undefined;
  CreateEvent: undefined;
  InfoEvent: undefined;
  ArtistProfile: undefined;
  ConfirmRegister: undefined;
  Profile: undefined;
  EventDetail: { event: Booking };
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
        <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EventDetail" component={EventDetail} />

      {/* Telas secundárias do app */}
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}