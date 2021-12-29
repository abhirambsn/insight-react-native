import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import GradientButton from "../components/GradientButton";
import global from "../styles/global";
import { getAuth } from "firebase/auth";
import app from "../firebase";

export default function Splash({ navigation }) {
  const auth = getAuth(app);
  React.useEffect(() => {
    if (auth.currentUser) {
      navigation.push("Main");
    }
  }, [auth.currentUser]);

  return (
    <View style={{ ...global.container, ...styles.splashContainer }}>
      <Image style={styles.image} source={require("../assets/img.png")} />
      <GradientButton
        title="Register"
        colors={["#f12711", "#f5af19"]}
        onPress={() => navigation.push("Register")}
        textColor="white"
      />
      <View style={{ marginTop: 20 }}></View>
      <GradientButton
        title="Login"
        colors={["#0575E6", "#021B79"]}
        onPress={() => navigation.push("Login")}
        textColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: "#fff",
  },
  image: {
    height: "50%",
    width: "50%",
    alignSelf: "center",
  },
});
