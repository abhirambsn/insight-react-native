import { getAuth, updateProfile } from "firebase/auth";
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
import Dialog from "react-native-dialog";
import Header from "../shared/Header";
import global from "../styles/global";
import app from "../firebase";
import data from "../data.json";
import FlatButton from "../components/FlatButton";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const providers = { "google.com": "Google" };

export default function Profile({ navigation }) {
  const auth = getAuth(app);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  /* Update Vars */
  const [name, setNewName] = React.useState("");
  const [income, setNewIncome] = React.useState("0");
  /* Dialog Open Status */
  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);
  const [incomeDialogOpen, setIncomeDialogOpen] = React.useState(false);

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

  const changeDisplayName = (name) => {
    updateProfile(auth.currentUser, { displayName: name })
      .then((_) => {
        console.log("Changed Name");
      })
      .catch((error) => console.error(error));
  };

  const changeIncome = (income) => {
    profile.income = income;
  }

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
    >
      <Header navigation={navigation} title="Profile" />
      {/** Dialogs */}
      <Dialog.Container
        visible={nameDialogOpen}
        onBackdropPress={() => {
          setNameDialogOpen(false);
        }}
      >
        <Dialog.Title>Change Display Name</Dialog.Title>
        <Dialog.Description>Change Your Display name</Dialog.Description>
        <Dialog.Input placeholder="Enter New Name" onChangeText={(val) => {setNewName(val)}} value={name} />
        <Dialog.Button
          label="Update"
          onPress={() => {
            changeDisplayName(name);
            setNameDialogOpen(false);
          }}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setNameDialogOpen(false);
          }}
        />
      </Dialog.Container>
      <Dialog.Container visible={incomeDialogOpen} onBackdropPress={() => {setIncomeDialogOpen(false);}}>
        <Dialog.Title>Change Income</Dialog.Title>
        <Dialog.Description>Change Monthly Income</Dialog.Description>
        <Dialog.Input placeholder="Enter New Income" onChangeText={(val) => setNewIncome(val)} value={income} keyboardType="numeric" />
        <Dialog.Button
          label="Update"
          onPress={() => {
            changeIncome(income);
            setIncomeDialogOpen(false);
          }}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setIncomeDialogOpen(false);
          }}
        />
      </Dialog.Container>
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
            <View style={styles.rowContainer}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "nunito-bold",
                  fontSize: 20,
                  color: "white",
                }}
              >
                {profile.displayName}
              </Text>
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  setNameDialogOpen(true);
                }}
              >
                <Feather name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "white", fontFamily: "nunito-regular" }}>
              {profile.email}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          />
          <View style={{ ...styles.rowContainer, marginTop: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "white",
                fontFamily: "nunito-bold",
              }}
            >
              Income
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                color: "white",
                fontFamily: "nunito-regular",
              }}
            >
              INR {profile.income}
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                setIncomeDialogOpen(true);
              }}
            >
              <Feather name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.rowContainer, marginTop: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "white",
                fontFamily: "nunito-bold",
              }}
            >
              Spending Level
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                color: "white",
                fontFamily: "nunito-regular",
              }}
            >
              Spending Level
            </Text>
          </View>
          <View style={{ ...styles.rowContainer, marginTop: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "white",
                fontFamily: "nunito-bold",
              }}
            >
              Sign In Method
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                color: "white",
                fontFamily: "nunito-regular",
              }}
            >
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
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 16,
              fontFamily: "nunito-bold",
            }}
          >
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
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 16,
              fontFamily: "nunito-bold",
            }}
          >
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
    backgroundColor: "black",
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
