import { StyleSheet } from "react-native";

const global = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});

export default global;
