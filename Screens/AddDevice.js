import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backIcon from "../assets/backIcon.png";

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
    const Device = JSON.parse(await AsyncStorage.getItem("device"));
    if(this.state.deviceName=="" || this.state.IPAddress==""){
      this.setState({errorMessage: "You cant type empty"});
    }else{
      if (Device == null) {
        await AsyncStorage.setItem("device",JSON.stringify([{ DeviceName: this.state.deviceName, DeviceIp: this.state.IPAddress }]));
      } else {
        Device.push({
          DeviceName: this.state.deviceName,
          DeviceIp: this.state.IPAddress,
        });
        await AsyncStorage.setItem("device", JSON.stringify(Device));
      }
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
        <View style={{alignSelf:'center'}}>
          <TouchableOpacity 
            onPress={() => this.createAccount()}
            style={styles.buttonStyle}
          >
            <Text style={{fontSize: 20}}>Next</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: 'center', color: 'red' }}>
          {this.state.errorMessage}
        </Text>
      </View>
    );
  }
}
export default AddDevicePage;
