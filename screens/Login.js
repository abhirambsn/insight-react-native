import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import global from "../styles/global";
import LoginForm from "./Forms/LoginForm";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";

import * as Google from "expo-auth-session/providers/google";
import app from "../firebase";

export default function Login({ navigation }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "392155272662-r4funacba1kuh6vpuusq4k9p17cj6t8p.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth(app);
      const provider = GoogleAuthProvider;
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential).then((_) => {
        navigation.push("Main");
      }).catch(err => console.error(err));
    }
  }, [response]);

  const loginUserEmailPassword = (values) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((_) => {
        navigation.push("Main");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ ...global.container, ...styles.loginContainer }}>
      <View style={styles.loginHeader}>
        <Image source={require("../assets/img.png")} style={styles.image} />
        <Text style={styles.heading}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <LoginForm
          submitHandler={loginUserEmailPassword}
          navigation={navigation}
          googleLogOn={promptAsync}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "#fff",
  },
  loginHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  formContainer: {
    marginTop: 20,
    flexDirection: "column",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 60,
    fontFamily: "nunito-bold",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 200,
    alignSelf: "flex-start",
  },
});
