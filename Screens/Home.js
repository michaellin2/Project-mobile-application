import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground,
}
  from 'react-native';
import menuIcon from '../assets/menuIcon.png';
import switchIcon from '../assets/switchIcon.png';

class HomePage extends Component {
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
                    <Image
                        style={{width:30,height:30,alignSelf: 'center',margin:10}}
                        source={menuIcon}
                    />
                <Text style={{color:'white',alignSelf:'center',fontSize:30,marginRight:10}}>Home</Text>
                <Text style={{alignSelf:'center'}}>Home</Text>            
                </View>
                <View>
                    <Text style={{fontSize:25,fontWeight:'bold',margin:5}}>Device</Text>
                    <View style={{margin:5,borderWidth:2,borderRadius:15,padding:8,flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize:22,fontWeight:'bold'}}>Device Name</Text>
                            <Text style={{alignSelf:'center',fontSize:15,fontWeight:'bold'}}>Light on/off</Text>
                        </View>
                        <Image
                            style={{width:30,height:30,alignSelf: 'center'}}
                            source={switchIcon}
                        />
                    </View>
                </View>                      
            </View>
        );
    }
}
export default HomePage;
  