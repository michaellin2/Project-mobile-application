import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
// import { SliderPicker } from 'react-color';
// import { CompactPicker } from 'react-color';
// import { ColorWheel } from 'react-native-color-wheel';
import ColorPicker from "react-native-wheel-color-picker";
import menuIcon from "../assets/menuIcon.png";
import switchOffIcon from "../assets/switchOff.png";
import switchOnIcon from "../assets/switchOn.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

class ColorAdjustmentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: "#FFFFF",
      currDeviceName: [],
      device: [],
      RGBButton: false,
      switch: switchOffIcon,
      currColors: "",
      currColor: {},
    };
  }

  // handleChangeComplete = (color) => {
  //     this.setState({ background: color.hex });
  // };

  async componentDidMount() {
    this.refresh = this.props.navigation.addListener("focus", () => {
      this.getCurrDevice();
    });
    this.getCurrDevice();
  }

  componentWillUnmount() {
    this.refresh();
  }

  getCurrDevice = async () => {
    const currentRoomName = JSON.parse(
      await AsyncStorage.getItem("currRoomName")
    );
    const allDevice = JSON.parse(await AsyncStorage.getItem("device"));
    this.setState({ currDeviceName: currentRoomName, device: allDevice });
  };

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
      .then((responseJson) => {
        this.setState({
          RGBButton: true,
        });
      })
      .catch((error) => {
        Error(error);
      });
  };

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
      .then((responseJson) => {
        this.setState({
          RGBButton: false,
        });
      })
      .catch((error) => {
        Error(error);
      });
  };

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

  rgbToHue = (rgbColor) => {
    var h;
    r = this.hexToRgb(rgbColor).r;
    g = this.hexToRgb(rgbColor).g;
    b = this.hexToRgb(rgbColor).b;
    r = r / 255;
    g = g / 255;
    b = b / 255;

    // // find min and max values out of r,g,b components
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);

    // // all greyscale colors have hue of 0deg
    if (max - min == 0) {
      return 0;
    }

    if (max == r) {
      //     // if red is the predominent color
      h = (g - b) / (max - min);
    } else if (max == g) {
      //     // if green is the predominent color
      h = 2 + (b - r) / (max - min);
    } else if (max == b) {
      //     // if blue is the predominent color
      h = 4 + (r - g) / (max - min);
    }

    h = h * 60; // find the sector of 60 degrees to which the color belongs
    // // https://www.pathofexile.com/forum/view-thread/1246208/page/45 - hsl color wheel

    // // make sure h is a positive angle on the color wheel between 0 and 360
    h %= 360;
    if (h < 0) {
      h += 360;
    }
    return Math.round(h);
  };

  colorChanges = async () => {
    if (this.state.RGBButton == true) {
      currColor = {
        color: this.state.currColors,
      };
      const currRoomIp = JSON.parse(await AsyncStorage.getItem("currRoomIp"));
      return fetch(`http://${currRoomIp}:80/setRGB`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currColor),
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
        .then((responseJson) => {
          this.rgbToHue(currColor.color);
          
        })
        .catch((error) => {
          Error(error);
        });
    }
  };

  getRGBLight=async()=>{
    if (this.state.RGBButton == true) {
      const currRoomIp = JSON.parse(await AsyncStorage.getItem("currRoomIp"));
      return fetch(`http://${currRoomIp}:80/getRGB`)
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
    }
  };

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
          <Text style={{ alignSelf: "center" }}>Home</Text>
          <Text style={{ color: "white", alignSelf: "center", fontSize: 30 }}>
            {this.state.currDeviceName}
          </Text>
          <Text style={{ alignSelf: "center" }}>Home</Text>
        </View>
        <TouchableOpacity onPress={() => this.checkRGB()}>
          <Image
            style={{ width: 40, height: 40, margin: 10 }}
            source={this.state.switch}
          />
        </TouchableOpacity>
        <View>
          <ColorPicker
            onColorChange={(color) => {
              this.colorChanges(), this.setState({ currColors: color });
            }}
          />
        </View>

        <View
          style={{ flex: 1, justifyContent: "flex-end", alignSelf: "center" }}
        >
          <TouchableOpacity
            onPress={() => this.removeCurrDevice(this.state.currDeviceName)}
            style={{
              borderWidth: 2,
              borderRadius: 5,
              fontSize: 30,
              padding: 10,
              width: "100%",
              alignSelf: "center",
            }}
          >
            <Text>Remove Device</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default ColorAdjustmentPage;
