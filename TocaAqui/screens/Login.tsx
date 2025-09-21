import { colors } from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Allcomponents/Button";
import Fund from "../components/Allcomponents/Fund";
import Input from "../components/Allcomponents/Input";
import ToBack from "../components/Allcomponents/ToBack";
import { AccountProps } from "../contexts/AccountFromContexto";
import { RootStackParamList } from "../navigation/Navigate";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");

export default function Login() {
  const navigation = useNavigation<NavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>(); 

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  function onSubmit(data: AccountProps) {
    console.log("Login data:", data);
    navigation.navigate("HomePage");
  }

  return (
    <View style={styles.container}>
      <Fund />
      <ToBack />
      <Image
        source={require("../assets/images/Login/AccessYourAccount.png")}
        style={styles.centerImage}
      />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem uma conta? </Text>
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("RegisterLocationName")}
        >
          Cadastre-se
        </Text>
      </View>

      <Input
        ref={emailRef}
        label="Email"
        iconName="email-outline"
        error={errors.email?.message}
        formProps={{
          control,
          name: "email",
          rules: {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-mail inválido",
            },
          },
        }}
        inputProps={{
          placeholder: "E-mail",
          onSubmitEditing: () => passwordRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={passwordRef}
        label="Senha"
        iconName="lock-outline"
        error={errors.password?.message}
        formProps={{
          control,
          name: "password",
          rules: {
            required: "Senha é obrigatória",
            minLength: {
              value: 8,
              message: "A senha deve ter no mínimo 6 caracteres",
            },
          },
        }}
        inputProps={{
          placeholder: "Senha",
          secureTextEntry: true,
          onSubmitEditing: handleSubmit(onSubmit),
          returnKeyType: "done",
        }}
      />

      <View style={styles.registerContainer}>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Esqueci minha senha
        </Text>
      </View>

      <Button style={styles.buttonPosition} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.textButton}>Entrar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1c0a37",
    width: width,
    height: height,
  },
  centerImage: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
  },
  registerContainer: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
    zIndex: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  registerLink: {
    color: "#00c96fff",
    fontFamily: "Montserrat-Regular",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#ffffffff",
    marginTop: 250,
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Montserrat",
  },
  buttonPosition: {
    width: 420,
    height: 60,
  },
  textButton: {
    fontFamily: "Montserrat-Regular",
    fontSize: 22,
    color: colors.purpleDark,
  },
});