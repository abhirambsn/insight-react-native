import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export default function FlatButton({children, onPress, style={}}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.buttonContainer, ...style}}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  buttonContainer: {
    
  },
});
