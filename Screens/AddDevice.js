import React, { Component } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground,
}
  from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backIcon from '../assets/backIcon.png';

class AddDevicePage extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        deviceName:'',
        IPAddress:''
      };
    }
    
    createAccount = async () => {
        const Device = JSON.parse(await AsyncStorage.getItem('device'));
    
        if (Device == null) {
          await AsyncStorage.setItem('device', JSON.stringify([{ DeviceName: this.state.deviceName, DeviceIp:this.state.IPAddress  }]));
        } else {
          Device.push({ DeviceName: this.state.deviceName, DeviceIp: this.state.IPAddress });
          await AsyncStorage.setItem('device', JSON.stringify(Device));
        }
        this.props.navigation.navigate('Home');
      };

    render(){
        return(
            <View style={{flex:1}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                     <Image
                         style={{width:40,height:40,marginTop:30}}
                         source={backIcon}
                     />
              </TouchableOpacity>
                <View style={{flex:1,justifyContent:'center',alignSelf:'center',flexDirection:'column'}}>
                    <Text style={{alignSelf:'center',margin:5,fontSize:30,fontWeight:'bold'}}>
                        Enter your device name
                    </Text>
                    <TextInput
                        placeholder='Enter your device name'
                        onChangeText={(device) => this.setState({deviceName:device})}
                        value={this.state.deviceName}
                        style={{borderWidth:2,borderRadius:10,padding:5,margin:5,textAlign:'center'}}
                    />
                    <Text style={{alignSelf:'center',margin:5,fontSize:30,fontWeight:'bold'}}>
                        Enter your IP
                    </Text>
                    <TextInput
                        placeholder='Enter your IP Address'
                        onChangeText={(ip) => this.setState({IPAddress:ip})}
                        value={this.state.IPAddress}
                        style={{borderWidth:2,borderRadius:10,padding:5,margin:5,textAlign:'center'}}
                    />
                </View>
                <TouchableOpacity onPress={()=>this.createAccount()} style={{borderWidth:2,borderRadius:5,fontSize:30,padding:10,width:'100%',alignSelf:'center'}}>
                    <Text style={{textAlign:'center',fontSize:25}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default AddDevicePage;
  