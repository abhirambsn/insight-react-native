import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import FlipCard from "react-native-flip-card";
import { AntDesign } from '@expo/vector-icons';

export default function CustomCard({
  flipped = false,
  name = "",
  balance = 0,
  email = "",
  label = "",
  colors = ["#fff", "#000"],
  textColor = "black",
  lastExpenseAmount=0,
  pctSpent=0
}) {
  return (
    <View style={{ ...styles.container, marginLeft: 10 }}>
      <FlipCard
        flipHorizontal={true}
        flipVertical={false}
        friction={8}
        flip={flipped}
      >
        <LinearGradient
          style={{ width: "100%", height: "100%", borderRadius: 30 }}
          colors={colors}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ padding: 10 }}>
            {balance ? (
              <View style={styles.columnContainer}>
                <Text
                  style={{
                    ...styles.cardContent,
                    color: textColor,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {label}
                </Text>
                <Text style={{ ...styles.cardContent, color: textColor }}>
                  {balance}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {lastExpenseAmount ? (
              <View style={styles.columnContainer}>
                  <View style={{height: 5}}/>
                <Text
                  style={{
                    ...styles.cardContent,
                    color: textColor,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Last Expense Amount
                </Text>
                <Text style={{ ...styles.cardContent, color: textColor }}>
                  {lastExpenseAmount}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {pctSpent ? (
                
              <View style={styles.columnContainer}>
                  <View style={{height: 5}}/>
                <Text
                  style={{
                    ...styles.cardContent,
                    color: textColor,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  % age of Income Spent
                </Text>
                <Text style={{ ...styles.cardContent, color: textColor }}>
                  {pctSpent} {"%"}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View style={{ height: "10%" }} />
            {email ? (
              <View style={styles.columnContainer}>
                <Text
                  style={{
                    ...styles.cardContent,
                    color: textColor,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Email
                </Text>
                <Text style={{ ...styles.cardContent, color: textColor }}>
                  {email}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {name ? (
              <View style={styles.rowContainer}>
                <Text
                  style={{
                    ...styles.cardContent,
                    justifyContent: "flex-end",
                    paddingTop: 20,
                    color: textColor,
                    fontWeight: "bold",
                  }}
                >
                  {name}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View style={styles.rowContainer}>
              <Text style={{ fontSize: 14, color: textColor }}>
                * Tap to see more actions
              </Text>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          style={{ width: "100%", height: "100%", borderRadius: 30 }}
          colors={colors}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          {email ? (<View style={{ ...styles.columnContainer, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={{ color: textColor, fontWeight: "bold", fontSize: 18 }}
            >
              Actions
            </Text>
            <View style={styles.columnContainer}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => console.log("Change Data")}>
                    <View style={styles.rowContainer}>
                        <AntDesign name="edit" size={20} color="black" />
                        <Text style={{color: "black", marginLeft: 4}}>Modify Data</Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
          </View>) : (<></>)}
        </LinearGradient>
      </FlipCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 198,
    width: 300,
  },
  cardContent: {
    color: "white",
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
  },
  columnContainer: {
    flexDirection: "column",
  },
  actionBtn: {
      marginTop: 20,
      padding: 10,
      borderRadius: 30,
      backgroundColor: 'whitesmoke',
      opacity: 0.5,
      width: "50%",
      height: "50%",
      justifyContent: 'center',
      alignItems: 'center'
  }
});
