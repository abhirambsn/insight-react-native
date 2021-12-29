import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import app from '../firebase';

export default function Header({ navigation, title }) {
  const auth = getAuth(app);
  return (
    <View style={styles.header}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => {
            console.log("Pressed");
          }}
        >
          <Image
            style={styles.image}
            source={
              auth.currentUser.photoURL
                ? { uri: auth.currentUser.photoURL }
                : require("../assets/avatar.png")
            }
          />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={() => console.log("Notification Pressed")}>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
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
