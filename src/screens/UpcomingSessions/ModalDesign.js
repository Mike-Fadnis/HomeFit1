
import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { Button } from "native-base";
class ModalDesign extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:this.props.dataItem
    };
  }
  componentWillMount(){
    console.log("DATA@@@@@@@ ",this.state.data);
  }

  render(){
    console.log("DATA@@@@@@@123456 ",this.state.data);
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
            <Button full style={{marginTop:10,marginLeft:15, marginRight:15,borderRadius:5, backgroundColor:"#009FDB"}} onPress={this.props.onClose}>
              <Text style={{color:"white", fontSize:16, fontWeight:"700"}}>JOIN SESSION NOW</Text>
            </Button>
            <Button full style={{marginTop:10,marginLeft:15, marginRight:15,borderRadius:5, backgroundColor:"#009FDB"}} onPress={this.props.onClose}>
              <Text style={{color:"white", fontSize:16, fontWeight:"700"}}>CANCEL</Text>
            </Button>
          </View>
        </View>
      );
  }
}

export default ModalDesign;
