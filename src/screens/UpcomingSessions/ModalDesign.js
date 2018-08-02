
import React, { Component } from "react";
import { Text, View,AsyncStorage,Alert } from "react-native";
import { Button } from "native-base";

import styles from "./styles";
import API from "@utils/ApiUtils";


class ModalDesign extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:this.props.dataItem,
      spinner:false,
      userType:"",
    };
    this.cancelled = this.cancelled.bind(this)
    this.appointmentCancelled = this.appointmentCancelled.bind(this)
  }
  componentWillMount(){
    console.log("DATA@@@@@@@ ",this.props.dataItem);
    AsyncStorage.getItem("@getUserType:key", (err, getUserType) => {
      this.setState({userType:getUserType})
    })
  }
  joinUpcomingHourlyAppt(){
    API.joinUpcomingHourlyAppt(this.state.data.item.id).then(async (response) => {
      if (response){
        if (response.status === true){
          this.setState({joinSession:response ,spinner:false});
        } else {
          this.setState({spinner:false});
        }
      } else {
        this.setState({spinner:false});
      }
    });
    this.props.afterJoinSessionClose();
  }

  appointmentCancelled(){
    Alert.alert(
  'Are you sure you want to cancel this appointment?',
  '',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
    {text: 'OK', onPress: () => this.cancelled()},
  ],
  { cancelable: false }
)
  }
cancelled(){
  console.log("GETUSERTYPE@@@@@@@ ",this.state.userType);
  this.setState({
    spinner:true
  },()=>{
    if(this.state.userType === "Trainer"){
      this.appointmentCancelledByTrainer()
    }else if(this.state.userType === "User"){
      this.appointmentCancelledByUser()
    }
  })
}

appointmentCancelledByUser(){
  API.appointmentCancelledByUser(this.state.data.item.id).then(async (response) => {
    if (response){
      if (response.status === true){
        this.setState({
          spinner:false
        },()=>{
          Alert.alert(response.message,"")
        });
      } else {
        this.setState({
          spinner:false
        },()=>{
          Alert.alert(response.message,"")
        })
      }
    } else {
      this.setState({
        spinner:false
      },()=>{
        Alert.alert(response.message,"")
      })
    }
  })
  this.props.onClose()
}
//Do you want to cancel this appointment
appointmentCancelledByTrainer(){
  API.appointmentCancelledByTrainer(this.state.data.item.id).then(async (response) => {
    if (response){
      if (response.status === true){
        this.setState({
          spinner:false
        },()=>{
          Alert.alert(response.message,"")
        });
      } else {
        this.setState({
          spinner:false
        },()=>{
          Alert.alert(response.message,"")
        })
      }
    } else {
      this.setState({
        spinner:false
      },()=>{
        Alert.alert(response.message,"")
      })
    }
  })
  this.props.onClose()
}


  render(){
      return (
        <View style={styles.subModalContainerView}>
          <View style={{flex:0.65}}>
            <Text style={{fontSize:14, fontWeight:"700", margin:10}}>Date: {this.state.data.item.appt_date}</Text>
            <Text style={{fontSize:14, fontWeight:"700", margin:10}}>Time: {this.state.data.item.appt_time}</Text>
            <Text style={{fontSize:14, fontWeight:"700", margin:10}}>Trainer name: {this.state.data.item.trainer_name}</Text>
            <Text style={{fontSize:14, fontWeight:"700", margin:10}}>Type of Training:</Text>
            <Text style={{fontSize:14, fontWeight:"700", marginLeft:10,marginRight:10,marginTop:2, textAlign:"justify"}} numberOfLines={6}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500 s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960 s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>
          <View style={{flex:0.35}}>
            <Button full style={{marginTop:10,marginLeft:15, marginRight:15,borderRadius:5, backgroundColor:"#009FDB"}} onPress={this.joinUpcomingHourlyAppt.bind(this)}>
              <Text style={{color:"white", fontSize:16, fontWeight:"700"}}>JOIN SESSION NOW</Text>
            </Button>
            <Button full style={{marginTop:10,marginLeft:15, marginRight:15,borderRadius:5, backgroundColor:"#009FDB"}} onPress={this.appointmentCancelled}>
              <Text style={{color:"white", fontSize:16, fontWeight:"700"}}>CANCEL</Text>
            </Button>
          </View>
        </View>
      );
  }
}

export default ModalDesign;
