import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground,
}
  from 'react-native';
import { WebView } from 'react-native-webview';

class WiFiPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        
      };
    }
    

    render(){
        return(
            <WebView source={{ uri: 'http://192.168.4.1/' }} />
        );
    }
}
export default WiFiPage;
  