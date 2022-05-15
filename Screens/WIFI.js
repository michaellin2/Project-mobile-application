import React, { Component } from "react";
//import and install webview library
import { WebView } from "react-native-webview";

class WiFiPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //default ipaddress for the wifi configuration page
    return <WebView source={{ uri: "http://192.168.4.1/" }} />;
  }
}
export default WiFiPage;
