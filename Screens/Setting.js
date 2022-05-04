import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground,
}
  from 'react-native';
import menuIcon from '../assets/menuIcon.png';
import switchIcon from '../assets/switchIcon.png';

class SettingPage extends Component {
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
                <Text style={{alignSelf:'center'}}>Home</Text>
                <Text style={{color:'white',alignSelf:'center',fontSize:30}}>Setting</Text>
                <Text style={{alignSelf:'center'}}>Setting</Text>            
                </View>
                <View style={{flex:1,justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('WIFI')}>
                        <Text style={{borderRadius:20,borderWidth:2,padding:5,width:'90%',alignSelf:'center',textAlign:'center',fontSize:25,fontWeight:'bold',backgroundColor:'white'}}>
                            Connect to WiFi
                        </Text>
                    </TouchableOpacity>
                </View>                      
            </View>
        );
    }
}
export default SettingPage;
  