import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions
}
  from 'react-native';
// import { SliderPicker } from 'react-color';
// import { CompactPicker } from 'react-color';
import { ColorWheel } from 'react-native-color-wheel';
import menuIcon from '../assets/menuIcon.png';
import switchIcon from '../assets/switchIcon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


class ColorAdjustmentPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        background: '#FFFFF',
        currDeviceName:''
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
      const currentRoomName = JSON.parse(await AsyncStorage.getItem('currRoomName'));
      this.setState({ currDeviceName:currentRoomName });
    };

    render(){
        return(
            <View style={{flex:1,backgroundColor:this.state.background,height:'100%',transition:'ease all 500ms'}}>
                <View style={{justifyContent:'space-between',flexDirection:'row',backgroundColor:'black',width:'100%',height:'12%'}}>
                <Text style={{alignSelf:'center'}}>Home</Text>
                <Text style={{color:'white',alignSelf:'center',fontSize:30}}>{this.state.currDeviceName}</Text>
                <Text style={{alignSelf:'center'}}>Home</Text>            
                </View>
                <Image
                    style={{width:40,height:40,margin:10}}
                    source={switchIcon}
                />
                <View style={{flex:1,alignSelf:'center',margin:30}}>
                    {/* <CompactPicker 
                        color={ this.state.background }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                    </View>
                    <View style={{flex:2,width:'95%',alignSelf:'center'}}>

                    <SliderPicker
                        color={ this.state.background }
                        onChangeComplete={ this.handleChangeComplete }
                    /> */}
                    {/* <ColorWheel
                      initialColor="#ee0000"
                      onColorChange={color => console.log({color})}
                      onColorChangeComplete={color => onChange(color)}
                      style={{width:'100%'}}
                      
                    />
                    <ColorWheel
                      initialColor="#00ee00"
                      style={{ marginLeft: 20, padding: 40, height: 200, width: 200 }}
                    /> */}
                    </View>
                </View>
        
        );
    }
}
export default ColorAdjustmentPage;
  