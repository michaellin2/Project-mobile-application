import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: "black",
    width: "100%",
    height: "12%",
    alignSelf: "center",
    justifyContent: "center",
  },
  setting: {
    color: "white",
    alignSelf: "center",
    fontSize: 30,
  },
  insideContainer: {
    flex: 1,
    justifyContent: "center",
  },
  insideText: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 5,
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: "white",
  },
});

class SettingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id1: "",
      isLoading: true,
      listData: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.setting}>Setting</Text>
        </View>
        <View style={styles.insideContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("WIFI")}
          >
            <Text style={styles.insideText}>Connect to WiFi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default SettingPage;
