import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions
}
  from 'react-native';
import { SliderPicker } from 'react-color';
import { CompactPicker } from 'react-color';
import menuIcon from '../assets/menuIcon.png';
import switchIcon from '../assets/switchIcon.png';


class colorAdjustmentPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        background: '#FFFFF',
      };
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };

    handleChange(color, event) {
        // color = {
        //   hex: '#333',
        //   rgb: {
        //     r: 51,
        //     g: 51,
        //     b: 51,
        //     a: 1,
        //   },
        //   hsl: {
        //     h: 0,
        //     s: 0,
        //     l: .20,
        //     a: 1,
        //   },
        // }
      }

    render(){
        return(
            <View style={{flex:1,backgroundColor:this.state.background,height:'100%',transition:'ease all 500ms'}}>
                <View style={{justifyContent:'space-between',flexDirection:'row',backgroundColor:'black',width:'100%',height:'12%'}}>
                <Image
                    style={{width:30,height:30,alignSelf: 'center',margin:10}}
                    source={menuIcon}
                />
                <Text style={{color:'white',alignSelf:'center',fontSize:30,marginRight:10}}>Device Name</Text>
                <Text style={{alignSelf:'center'}}>Home</Text>            
                </View>
                <Image
                    style={{width:40,height:40,margin:10}}
                    source={switchIcon}
                />
                <View style={{flex:1,alignSelf:'center',margin:30}}>
                    <CompactPicker 
                        color={ this.state.background }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                    </View>
                    <View style={{flex:2,width:'95%',alignSelf:'center'}}>

                    <SliderPicker
                        color={ this.state.background }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                    </View>
                </View>
        
        );
    }
}
export default colorAdjustmentPage;
  