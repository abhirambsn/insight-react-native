import React from "react";
import { View, Text, TextInput } from "react-native";
import { Formik } from "formik";
import global from "../../styles/global";
import GradientButton from "../../components/GradientButton";
import FlatButton from "../../components/FlatButton";

import { AntDesign } from "@expo/vector-icons";

export default function LoginForm({ submitHandler, googleLogOn }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        submitHandler(values);
      }}
    >
      {(formProps) => (
        <View>
          <TextInput
            style={global.input}
            placeholder="Email"
            onChangeText={formProps.handleChange("email")}
            value={formProps.values.email}
            onBlur={formProps.handleBlur("email")}
            textContentType="username"
          />
          <Text style={global.errorText}>
            {formProps.touched.title && formProps.errors.email}
          </Text>

          <TextInput
            style={global.input}
            placeholder="Password"
            onChangeText={formProps.handleChange("password")}
            value={formProps.values.password}
            onBlur={formProps.handleBlur("password")}
            textContentType="password"
            secureTextEntry={true}
          />
          <Text style={global.errorText}>
            {formProps.touched.title && formProps.errors.password}
          </Text>

          <GradientButton
            title="Login"
            textColor="white"
            colors={["#0575E6", "#021B79"]}
            onPress={formProps.handleSubmit}
          />

          <FlatButton
            onPress={() => {googleLogOn();}}
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 10,
              alignSelf: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <AntDesign name="google" size={24} color="black" />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              Login With Google
            </Text>
          </FlatButton>
        </View>
      )}
    </Formik>
  );
}
