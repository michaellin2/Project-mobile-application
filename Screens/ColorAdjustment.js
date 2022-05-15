import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
//import and install the color picker library
import ColorPicker from "react-native-wheel-color-picker";
//import different images
import switchOffIcon from "../assets/switchOff.png";
import switchOnIcon from "../assets/switchOn.png";
import backIcon from "../assets/backIcon.png";
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
    width: 40,
    height: 40,
    alignSelf: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  colorPage: {
    color: "white",
    alignSelf: "center",
    fontSize: 30,
    marginRight: 10,
  },
  switchButton: {
    width: 40,
    height: 40,
    margin: 10,
  },
  buttonPosition: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  buttonStyle: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },
});

class ColorAdjustmentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currDeviceName: [],
      device: [],
      RGBButton: false,
      switch: switchOffIcon,
      currColors: "",
      currColor: {},
      hue: 0,
    };
  }

  //load the current device
  async componentDidMount() {
    this.refresh = this.props.navigation.addListener("focus", () => {
      this.getCurrDevice();
    });
    this.getCurrDevice();
  }

  componentWillUnmount() {
    this.refresh();
  }

  //get the current device detail from asyncstorage
  getCurrDevice = async () => {
    const currentRoomName = JSON.parse(
      await AsyncStorage.getItem("currRoomName")
    );
    const allDevice = JSON.parse(await AsyncStorage.getItem("device"));
    this.setState({ currDeviceName: currentRoomName, device: allDevice });
  };

  //remove current device from device list from asyncstorage, and go back to home page
  removeCurrDevice = async (devicename) => {
    const device = JSON.parse(await AsyncStorage.getItem("device"));
    const array = [];
    for (let i = 0; i < device.length; i += 1) {
      const deviceName = device[i].DeviceName;
      const deviceIp = device[i].DeviceIp;
      if (deviceName != devicename) {
        array.push({ DeviceName: deviceName, DeviceIp: deviceIp });
      }
    }
    await AsyncStorage.setItem("device", JSON.stringify(array));
    this.getCurrDevice();
    this.props.navigation.goBack();
  };

  //function to turn on manual rgb light controll, first get the current room ip and compare the ip with wifi ipaddress
  //if it mathces, call the turnOnRGBButton function from Arduino which enable the user to manually change rgb color
  turnOnRgbController = async () => {
    const currRoomIp = JSON.parse(await AsyncStorage.getItem("currRoomIp"));
    return fetch(`http://${currRoomIp}:80/turnOnRGBButton`)
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
      //set the RGBButton to true
      .then((responseJson) => {
        this.setState({
          RGBButton: true,
        });
      })
      .catch((error) => {
        Error(error);
      });
  };

  //function to turn off manual rgb light controll, first get the current room ip and compare the ip with wifi ipaddress
  //if it mathces, call the turnOffRGBButton function from Arduino which disables the manual rgb light controll function
  turnOffRgbController = async () => {
    const currRoomIp = JSON.parse(await AsyncStorage.getItem("currRoomIp"));
    return fetch(`http://${currRoomIp}:80/turnOffRGBButton`)
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
      //set te RGBButton to false
      .then((responseJson) => {
        this.setState({
          RGBButton: false,
        });
      })
      .catch((error) => {
        Error(error);
      });
  };

  //At the begining, set the RGBButton state to false. If the user clicks on the switch button
  //check if the switchIcon is switchOff, call the turnOnRGBController function and also switch the switchIcon to switchOn.
  //else call the turnOffRGBController function and switch the switchIcon to switchOff 
  checkRGB = async () => {
    if (this.state.switch == switchOffIcon) {
      this.turnOnRgbController();
      this.setState({
        switch: switchOnIcon,
      });
    } else {
      this.turnOffRgbController();
      this.setState({
        switch: switchOffIcon,
      });
    }
  };

  //convert hex code to RGB value
  hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  //convert RGB value to Hue value because the the rgb light only takes hue value for manual controll
  rgbToHue = (rgbColor) => {
    var h;
    var r = this.hexToRgb(rgbColor).r;
    var g = this.hexToRgb(rgbColor).g;
    var b = this.hexToRgb(rgbColor).b;
    r = r / 255;
    g = g / 255;
    b = b / 255;

    //find min and max values out of r,g,b components
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);

    //all greyscale colors have hue of 0deg
    if (max - min == 0) {
      return 0;
    }

    if (max == r) {
      //if red is the predominent color
      h = (g - b) / (max - min);
    } else if (max == g) {
      //if green is the predominent color
      h = 2 + (b - r) / (max - min);
    } else if (max == b) {
      // if blue is the predominent color
      h = 4 + (r - g) / (max - min);
    }

    //find the sector of 60 degrees to which the color belongs
    h = h * 60;

    //make sure h is a positive angle on the color wheel between 0 and 360
    h %= 360;
    if (h < 0) {
      h += 360;
    }
    this.setState({ hue: Math.round(h) });
  };

  //check the state of RGBButton and if the state is true, call the rgbtohue function that converts the rgb value to hue value
  //then store the hue value in a list which that has to be stringify after calling the setRGB function from Arduino. 
  //That allows the user to manually controll the RGB color
  colorChanges = async () => {
    if (this.state.RGBButton == true) {
      currColor = {
        color: this.state.currColors
      };
      this.rgbToHue(currColor.color);
      const toSend = {
        color: this.state.hue,
      };
      const currRoomIp = JSON.parse(await AsyncStorage.getItem("currRoomIp"));

      return fetch(`http://${currRoomIp}:80/setRGB`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSend),
      })
        .then((response) => {
          if (response.status === 201) {
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
    }
  };

  render() {
    return (
      <View style={{flex:1,backgroundColor:this.state.currColors,height:'100%',transition:'ease all 500ms'}}>
        <View style={styles.topBar}>
          <TouchableOpacity
          //navigate back to the home page
            onPress={() => this.props.navigation.navigate("home")}
          >
            <Image style={styles.addImage} source={backIcon} />
          </TouchableOpacity>
          <Text style={styles.colorPage}>{this.state.currDeviceName}</Text>
          <Text style={{ alignSelf: "center" }}>Home</Text>
        </View>
        <TouchableOpacity 
          //when the manual rgb button is clicked, call the checkRGB function
          onPress={() => this.checkRGB()}>
          <Image style={styles.switchButton} source={this.state.switch} />
        </TouchableOpacity>
        <View>
          <ColorPicker
          //display the color wheel and call the colorChanges function, then set the state of currColors to selected color in the color wheel
            onColorChange={(color) => {
              this.colorChanges(), this.setState({ currColors: color });
            }}
          />
        </View>

        <View style={styles.buttonPosition}>
          <TouchableOpacity
          //call the removeCurrDevice function when the remove button is clicked
            onPress={() => this.removeCurrDevice(this.state.currDeviceName)}
            style={styles.buttonStyle}
          >
            <Text style={{fontSize: 20}}>Remove Device</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default ColorAdjustmentPage;
