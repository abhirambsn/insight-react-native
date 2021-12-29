import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import global from "../styles/global";

import { Feather } from "@expo/vector-icons";

import { getAuth } from "firebase/auth";
import app from "../firebase";

import data from "../data.json";
import allExpenses from "../expenses.json";
import CustomCard from "../components/CustomCard";
import ExpenseListItem from "../components/ExpenseListItem";
import Header from "../shared/Header";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState({ email: "", income: 0 });
  const [expenses, setExpenses] = useState([
    {
      email: "",
      expenses: [
        { expenseId: "", expenseName: "", amount: 0, type: "", dateAdded: "" },
      ],
    },
  ]);
  const auth = getAuth(app);
  const refreshFunction = () => {
    setLoading(true);
    setRefreshing(true);
    setProfile(
      data.find((element) => {
        return element.email === auth.currentUser.email;
      })
    );
    setExpenses(
      allExpenses.find((data) => data.email === auth.currentUser.email).expenses
    );
    setLoading(false);
    setRefreshing(false);
  };
  useEffect(() => {
    setProfile(
      data.find((element) => {
        return element.email === auth.currentUser.email;
      })
    );
    setExpenses(
      allExpenses.find((data) => data.email === auth.currentUser.email).expenses
    );
    setLoading(false);
  }, [profile, expenses]);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshFunction} />} style={{ ...global.container, ...styles.dashboardContainer }} scrollEnabled={false}>
      <Header title="My Dashboard" />
      <View style={styles.mainContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CustomCard
            colors={["#4776E6", "#8E54E9"]}
            textColor="white"
            name={auth.currentUser.displayName}
            label="Income"
            email={auth.currentUser.email}
            balance={profile.income}
          />
          <CustomCard
            colors={["#f857a6", "#ff5858"]}
            textColor="white"
            label="Balance"
            balance={
              profile.income -
              expenses.map((expense) => expense.amount).reduce((a, b) => a + b)
            }
            lastExpenseAmount={expenses[expenses.length - 1].amount}
            pctSpent={
              (expenses
                .map((expense) => expense.amount)
                .reduce((a, b) => a + b) /
                profile.income) *
              100
            }
            style={{ marginLeft: 10 }}
          />
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>All Expenses</Text>
          <TouchableOpacity
            onPress={() => console.log("See All Expenses Pressed")}
          >
            <Text style={{ fontSize: 20, color: "gray" }}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={expenses.slice(0, 4)}
          keyExtractor={(expenseObj) => expenseObj?.expenseId}
          renderItem={({ item }) => <ExpenseListItem item={item} />}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mainContainer: {
    marginTop: 20,
  },
  imageContainer: {
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
});
