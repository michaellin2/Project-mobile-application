import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
//import different images
import addIcon from "../assets/addIcon.png";
import switchOffIcon from "../assets/switchOff.png";
import switchOnIcon from "../assets/switchOn.png";
//install and import the asyncstorage library
import AsyncStorage from "@react-native-async-storage/async-storage";

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "black",
    width: "100%",
    height: "12%",
  },
  addImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 15,
  },
  home: {
    color: "white",
    alignSelf: "center",
    fontSize: 30,
    marginRight: 10,
  },
  insideHeader: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 5,
  },
  flatListStyle: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
  },
  switchButton: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
});

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

  //load all devices added
  async componentDidMount() {
    this.refresh = this.props.navigation.addListener("focus", () => {
      this.getDevice();
    });
    this.getDevice();
  }

  componentWillUnmount() {
    this.refresh();
  }

  //send request to the device to get the motion sensor information for the current device based on the ipaddress,
  //it will check if the ipaddress for the device matches the wifi ipaddress, if it matches then it sends the getFunction from Arduino
  //to the device
  getMotion = async () => {
    const Device = JSON.parse(await AsyncStorage.getItem("device"));
    return fetch(`http://${Device[0].DeviceIp}:80/getMotion`)
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
      .catch((error) => {
        Error(error);
      });
  };

  //refresh the device list
  refreshScreen = async () => {
    this.getDevice();
  };

  //get all the device store in asyncstorage and add them to devicelist
  getDevice = async () => {
    const Device = JSON.parse(await AsyncStorage.getItem("device"));
    this.setState({ deviceList: Device });
  };

  //get the selected device information if the user clicks on the device, then save in the asyncstorage
  //and take the user to the colorAdjustmentPage
  currRoom = async (item) => {
    await AsyncStorage.setItem("currRoomName", JSON.stringify(item.DeviceName));
    await AsyncStorage.setItem("currRoomIp", JSON.stringify(item.DeviceIp));
    this.props.navigation.navigate("Color");
  };

  //checking if the current ipaddress matches the wifi ipaddress, and send getRGB function from Arduino to the device,
  //the getRGB function checks the motion sensor, if the motion sensor detects motion it will send signal to turn on rgb light
  checkLightOn = async () => {
    const ip = await AsyncStorage.getItem("device");
    return fetch(`http://${ip}:80/getRGB`)
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

  //function to turn on temperature sensor, first check the ipaddress of the selected device and compare it to the wifi address.
  //if it matches, call the turnOnTempButton function which will adjust the current rgb color accordingly to the current temperature
  turnOnTempSensor = async (item) => {
    return (
      fetch(`http://${item.DeviceIp}:80/turnOnTempButton`)
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
        //if this function is called, switch tempButton to ture
        .then((responseJson) => {
          this.setState({
            color: responseJson,
            tempButton: true,
          });
        })
        .catch((error) => {
          Error(error);
        })
    );
  };

  //function to turn off temperature sensor, first check the ipaddress of the selected device and compare it to the wifi address.
  //if it matches, call the turnOffTempButton function which will change the rgb color to its original state
  turnOffTempSensor = async (item) => {
    return (
      fetch(`http://${item.DeviceIp}:80/turnOffTempButton`)
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
        //if this function is called, switch tempButton to false
        .then((responseJson) => {
          this.setState({
            color: responseJson,
            tempButton: false,
          });
        })
        .catch((error) => {
          Error(error);
        })
    );
  };

  //At the begining, set the tempButton state to false. If the user clicks on the switch button
  //check if the switchIcon is switchOff, call the turnOnTempSensor function and also switch the switchIcon to switchOn.
  //else call the turnOffTempSensor function and switch the switchIcon to switchOff
  checkTempSensor = async (item) => {
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
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
          //navigate the user to add device page when they clicked on the add device
            onPress={() => this.props.navigation.navigate("AddDevice")}
          >
            <Image style={styles.addImage} source={addIcon} />
          </TouchableOpacity>
          <Text style={styles.home}>Home</Text>
          <Text style={{ alignSelf: "center" }}>Home</Text>
        </View>
        <View>
          <Text style={styles.insideHeader}>Device</Text>

          <FlatList
          //display the devicelist in the flatlist
            data={this.state.deviceList}
            renderItem={({ item }) => (
              <View style={styles.flatListStyle}>
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
                    //when the user clicks on the temperature sensor button, call the checkTempSensor function
                    this.checkTempSensor(item);
                  }}
                >
                  <Image
                    style={styles.switchButton}
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
