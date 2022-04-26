import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground,
}
  from 'react-native';
import backIcon from '../assets/backIcon.png';

class WiFiPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id1: '',
        isLoading: true,
        listData: [],
      };
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{justifyContent:'space-between',flexDirection:'row',backgroundColor:'black',width:'100%',height:'12%'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')} style={{alignSelf:'center',marginLeft:10}} >
                    <Image
                        style={{width:40,height:40}}
                        source={backIcon}
                    />
                    </TouchableOpacity>
                <Text style={{color:'white',alignSelf:'center',fontSize:30,marginRight:10}}>WIFI</Text>
                <Text style={{alignSelf:'center'}}>WiFi</Text>            
                </View>
                <View>
                    <Text style={{fontSize:25,fontWeight:'bold',margin:5}}>Network</Text>
                </View>                      
            </View>
        );
    }
}
export default WiFiPage;
  