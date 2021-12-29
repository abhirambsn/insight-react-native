import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientButton({ title, onPress, colors, textColor="white" }) {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
