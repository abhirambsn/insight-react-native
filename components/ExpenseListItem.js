import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

const types = { o: "One Time", r: "Recurring" };
const colors = {o: "lightgreen", r: "red"};
const textColors = { o: "black", r: "white" };

export default function ExpenseListItem({ item }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        console.log(item.expenseName + " Pressed");
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Feather
          name="dollar-sign"
          size={24}
          color="green"
          style={{ alignSelf: "center" }}
        />
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {item.expenseName}
          </Text>
          <Text style={{ color: "gray" }}>{item.dateAdded}</Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 150, alignItems: 'center' }}>
          <View>
            <View style={{borderRadius: 40, backgroundColor: colors[item.type], opacity: 1, padding: 5}}>
              <Text style={{ fontWeight: "bold", alignSelf: "stretch", color: textColors[item.type] }}>
                {types[item.type]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    borderWidth: 1
  },
});
