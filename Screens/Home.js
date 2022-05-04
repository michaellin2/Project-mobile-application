import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import addIcon from "../assets/addIcon.png";
import switchOffIcon from "../assets/switchOff.png";
import switchOnIcon from "../assets/switchOn.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "",
      tempButton: false,
      switch: switchOffIcon,
      deviceList: [],
      deviceName: "",
      deviceIp: "",
    };
  }

  async componentDidMount() {
    this.refresh = this.props.navigation.addListener("focus", () => {
      this.checkLightOn();
      this.getDevice();
    });
    this.getDevice();
  }

  componentWillUnmount() {
    this.refresh();
  }

  getDevice = async () => {
    const Device = JSON.parse(await AsyncStorage.getItem("device"));
    this.setState({ deviceList: Device });
  };

  currRoom = async (item) => {
    await AsyncStorage.setItem('currRoomName', JSON.stringify(item.DeviceName));
    await AsyncStorage.setItem('currRoomIp', JSON.stringify(item.DeviceIp));
    this.props.navigation.navigate('Color');
  };

  checkLightOn = async () => {
    const ip = await AsyncStorage.getItem("device");
    return fetch(`http://${ip}:80/getRGB`, {})
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 401) {
          throw new Error("Unauthorised");
        } else if (response.status === 404) {
          throw new Error("Not Found");
        } else {
          throw new Error("Server error");
        }
      })
      .then((responseJson) => {
        this.setState({
          tempButton: false,
        });
      })
      .catch((error) => {
        Error(error);
      });
  };

  turnOnTempSensor = async (item) => {
    return fetch(`http://${item.DeviceIp}:80/turnOnTempButton`, {})
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 401) {
          throw new Error("Unauthorised");
        } else if (response.status === 404) {
          throw new Error("Not Found");
        } else {
          throw new Error("Server error");
        }
      })
      .then((responseJson) => {
        this.setState({
          color: responseJson,
          tempButton: true,
        });
      })
      .catch((error) => {
        Error(error);
      });
  };

  turnOffTempSensor = async (item) => {
    return fetch(`http://${item.DeviceIp}:80/turnOffTempButton`, {})
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 401) {
          throw new Error("Unauthorised");
        } else if (response.status === 404) {
          throw new Error("Not Found");
        } else {
          throw new Error("Server error");
        }
      })
      .then((responseJson) => {
        this.setState({
          color: responseJson,
          tempButton: false,
        });
      })
      .catch((error) => {
        Error(error);
      });
  };

  checkTempSensor = async(item) => {
    if (this.state.switch == switchOffIcon) {
      this.turnOnTempSensor(item);
      this.setState({
        switch: switchOnIcon,
      });
    } else {
      this.turnOffTempSensor(item);
      this.setState({
        switch: switchOffIcon,
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "black",
            width: "100%",
            height: "12%",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddDevice")}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                marginTop: 15,
              }}
              source={addIcon}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 30,
              marginRight: 10,
            }}
          >
            Home
          </Text>
          <Text style={{ alignSelf: "center" }}>Home</Text>
        </View>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold", margin: 5 }}>
            Device
          </Text>

          <FlatList
            data={this.state.deviceList}
            renderItem={({ item }) => (
              <View
                style={{
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 2,
                  borderRadius: 15,
                  padding: 10,
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <TouchableOpacity onPress={() => this.currRoom(item)}>
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                      {item.DeviceName}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Temperature sensor on/off
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.checkTempSensor(item);
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30, alignSelf: "center" }}
                    source={this.state.switch}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.DeviceIp.toString()}
          />
        </View>
      </View>
    );
  }
}
export default HomePage;
