import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
//install and import the asyncstorage library
import AsyncStorage from "@react-native-async-storage/async-storage";
//import the backIcon
import backIcon from "../assets/backIcon.png";

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIconStyle: {
    width: 40,
    height: 40,
    marginTop: 30,
  },
  insideContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
  insideText: {
    alignSelf: "center",
    margin: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  insideTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    textAlign: "center",
  },
  buttonStyle: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },
});

class AddDevicePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceName: "",
      IPAddress: "",
      errorMessage: "",
    };
  }

  createAccount = async () => {
    //check if there's any device added
    const Device = JSON.parse(await AsyncStorage.getItem("device"));
    //if the user entered empty, display error message
    if (this.state.deviceName == "" || this.state.IPAddress == "") {
      this.setState({ errorMessage: "You cant type empty" });
    } else {
      //if the device list is empty, then add the entered device into devicelist and store in asyncstorage
      if (Device == null) {
        await AsyncStorage.setItem(
          "device",
          JSON.stringify([
            {
              DeviceName: this.state.deviceName,
              DeviceIp: this.state.IPAddress,
            },
          ])
        );
      } else {
        //if there is devuce added already, add the new device and store in asyncstorage
        Device.push({
          DeviceName: this.state.deviceName,
          DeviceIp: this.state.IPAddress,
        });
        await AsyncStorage.setItem("device", JSON.stringify(Device));
      }
      //after the device is added, take the user back to home page
      this.props.navigation.navigate("Home");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image style={styles.backIconStyle} source={backIcon} />
        </TouchableOpacity>
        <View style={styles.insideContainer}>
          <Text style={styles.insideText}>Enter your device name</Text>
          <TextInput
          //enter the device details to add the device, such as name and ipaddress
            placeholder="Enter your device name"
            onChangeText={(device) => this.setState({ deviceName: device })}
            value={this.state.deviceName}
            style={styles.insideTextInput}
          />
          <Text style={styles.insideText}>Enter your IP</Text>
          <TextInput
            placeholder="Enter your IP Address"
            onChangeText={(ip) => this.setState({ IPAddress: ip })}
            value={this.state.IPAddress}
            style={styles.insideTextInput}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity
          //when the user clicks on the next button, call the createAccount function
            onPress={() => this.createAccount()}
            style={styles.buttonStyle}
          >
            <Text style={{ fontSize: 20 }}>Next</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: "center", color: "red" }}>
          {this.state.errorMessage}
        </Text>
      </View>
    );
  }
}
export default AddDevicePage;
