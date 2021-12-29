import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import AllExpense from "../screens/AllExpense";
import Reports from "../screens/Reports";
import { AntDesign, Feather } from "@expo/vector-icons";

const MainBottomTabNavigator = createBottomTabNavigator();

export default function MainNavigation({ navigation }) {
  return (
    <MainBottomTabNavigator.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: 'coral' }}
    >
      <MainBottomTabNavigator.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={20} color={color} />
          ),
          tabBarInactiveTintColor: 'black'
        }}
      />
      <MainBottomTabNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={20} color={color} />
          ),
        }}
      />
      <MainBottomTabNavigator.Screen
        name="AllExpenses"
        component={AllExpense}
        options={{
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="list" size={20} color={color} />
          ),
        }}
      />
      <MainBottomTabNavigator.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: "Reports",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="book" size={20} color={color} />
          ),
        }}
      />
    </MainBottomTabNavigator.Navigator>
  );
}
