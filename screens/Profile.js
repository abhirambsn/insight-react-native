import { getAuth } from "firebase/auth";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../shared/Header";
import global from "../styles/global";
import app from "../firebase";
import data from "../data.json";
import FlatButton from "../components/FlatButton";
import { StackNavigationOptions } from "@react-navigation/stack";

const providers = { "google.com": "Google" };

export default function Profile({ navigation }) {
  const auth = getAuth(app);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState({
    displayName: "",
    email: "",
    photoURL: undefined,
    income: 0,
  });

  const refreshFunction = () => {
    setRefreshing(true);
    console.log("Profile Refreshing");
    setRefreshing(false);
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.pop();
        navigation.push("Auth");
      })
      .catch((error) => console.error(error));
  };
  React.useEffect(() => {
    const user = auth.currentUser;
    const userProfile = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      income: data.find((element) => element.email === auth.currentUser.email)
        .income,
    };
    setProfile(userProfile);
    setLoading(false);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshFunction} />
      }
      style={{ ...global.container, ...styles.profileContainer }}
      scrollEnabled={false}
    >
      <Header title="Profile" />
      <View style={styles.profileCard}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              console.log("Profile Picture change Triggered");
            }}
            style={styles.imageContainer}
          >
            <Image
              style={styles.image}
              source={
                profile.photoURL
                  ? { uri: profile.photoURL }
                  : require("../assets/avatar.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {profile.displayName}
            </Text>
            <Text>{profile.email}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          />
          <View style={{ ...styles.rowContainer, marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Income</Text>
            <Text style={{ marginLeft: 10, fontSize: 18 }}>
              INR {profile.income}
            </Text>
          </View>
          <View style={{ ...styles.rowContainer, marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Spending Level
            </Text>
            <Text style={{ marginLeft: 10, fontSize: 18 }}>Spending Level</Text>
          </View>
          <View style={{ ...styles.rowContainer, marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Sign In Method
            </Text>
            <Text style={{ marginLeft: 10, fontSize: 18 }}>
              {providers[auth.currentUser.providerData[0].providerId]}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <FlatButton
          style={{
            marginTop: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f7f7f7",
          }}
          onPress={() => {
            logout();
          }}
        >
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
            Log Out
          </Text>
        </FlatButton>

        <FlatButton
          style={{
            marginTop: 1,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f7f7f7",
          }}
          onPress={() => {
            console.log("About Screen Invoked");
          }}
        >
          <Text style={{ color: "blue", fontWeight: "bold", fontSize: 16 }}>
            About Us
          </Text>
        </FlatButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#fff",
  },
  profileCard: {
    marginTop: 40,
    padding: 30,
    shadowColor: "#fff",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4.84,
    shadowOpacity: 0.25,
    elevation: 1,
    borderRadius: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  imageContainer: {
    borderRadius: 50,
    height: 100,
    width: 100,
    bottom: 50,
  },
  rowContainer: {
    flexDirection: "row",
  },
  colContainer: {
    flexDirection: "column",
  },
});
