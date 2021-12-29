import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthNavigation";
import MainBottomTabNavigator from "./MainNavigation";

const screens = {
  Auth: {
    screen: AuthStackNavigator,
  },
  Main: {
    screen: MainBottomTabNavigator,
  },
};

const RootStackNavigator = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <RootStackNavigator.Navigator screenOptions={{ headerShown: false }}>
        <RootStackNavigator.Screen name="Auth" component={AuthStackNavigator} />
        <RootStackNavigator.Screen
          name="Main"
          component={MainBottomTabNavigator}
        />
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
}
