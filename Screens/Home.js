import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground,
}
  from 'react-native';
import menuIcon from '../assets/menuIcon.png';
import switchOffIcon from '../assets/switchOff.png';
import switchOnIcon from '../assets/switchOn.png';

class HomePage extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        color:'',
        tempButton:false,
        switch:switchOffIcon
      };
    }

    componentDidMount() {
        this.refresh = this.props.navigation.addListener('focus', () => {
          this.checkLightOn();
        });
      }
    
      componentWillUnmount() {
        this.refresh();
      }

    checkLightOn(){
        return fetch(`http://esp32.local/getRGB`, {
          })
            .then((response) => {
              if (response.status === 200) {
                return response.json();
              } if (response.status === 401) {
                throw new Error('Unauthorised');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else {
                throw new Error('Server error');
              }
            })
            .then((responseJson) => {
              this.setState({
                tempButton: false,
              });
            })
            .catch((error) => {
              Error(error);
            });
    }z

    turnOnTempSensor(){
        return fetch(`http://esp32.local/turnOnTempButton`, {
          })
            .then((response) => {
              if (response.status === 200) {
                return response.json();            
              } if (response.status === 401) {
                throw new Error('Unauthorised');
              } else if (response.status === 404) {
                throw new Error('Not Found');
              } else {
                throw new Error('Server error');
              }
            })
            .then((responseJson) => {
        
              this.setState({
                color:responseJson,
                tempButton: true,
              });
            })
            .catch((error) => {
              Error(error);
            });
    }

    turnOffTempSensor(){
      return fetch(`http://esp32.local/turnOffTempButton`, {
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();            
            } if (response.status === 401) {
              throw new Error('Unauthorised');
            } else if (response.status === 404) {
              throw new Error('Not Found');
            } else {
              throw new Error('Server error');
            }
          })
          .then((responseJson) => {
      
            this.setState({
              color:responseJson,
              tempButton: false,
            });
          })
          .catch((error) => {
            Error(error);
          });
  }

  checkTempSensor(){
    if(this.state.switch==switchOffIcon){
      this.turnOnTempSensor();
      this.setState({
        switch:switchOnIcon
      })
    }else{
      this.turnOffTempSensor();
      this.setState({
        switch:switchOffIcon
      })
    }
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
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Color')}>
                                <Text style={{fontSize:22,fontWeight:'bold'}}>Device Name</Text>
                            </TouchableOpacity>
                            <Text style={{alignSelf:'center',fontSize:15,fontWeight:'bold'}}>Temperature sensor on/off</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{this.checkTempSensor()}}>
                            <Image
                                style={{width:30,height:30,alignSelf: 'center'}}
                                source={this.state.switch}
                            />
                        </TouchableOpacity>
                    </View>
                </View>                      
            </View>
        );
    }
}
export default HomePage;
  