import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/Splash";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Header from "../shared/Header";

const AuthStackNavigator = createStackNavigator();

export default function AuthNavigation() {
  return (
    <AuthStackNavigator.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}} >
      <AuthStackNavigator.Screen name="Splash" component={Splash} />
      <AuthStackNavigator.Screen name="Login" component={Login} />
      <AuthStackNavigator.Screen name="Register" component={Register} />
    </AuthStackNavigator.Navigator>
  );
}
