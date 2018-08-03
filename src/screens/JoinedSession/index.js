/* @flow */

import React, { Component } from "react";
import {View,Text,StyleSheet,Alert} from "react-native";
import {Container,Header,Title,Content,Icon,Button,Left,Right,Body,Spinner} from "native-base";
import API from "@utils/ApiUtils";
import styles from "./styles";
export default class JoinedSession extends Component {
  constructor(props){
    super(props);
    this.state={
      dataItem:this.props.navigation.getParam("dataItem"),
      cancelSession:'',
      spinner:false
    }
  }
  componentWillMount(){
    console.log("DATATAAA12365522211: ",this.state.dataItem)
  }
  onCancelSession(){
    this.setState({
      spinner:true
    })
    API.cancelledUpcomingHourlyAppt(this.state.dataItem.id).then(async (response) => {
      console.log("REPSOLMVHFRGIRFG: ",response)
      if (response){
        if (response.status === true){
          this.setState({cancelSession:response ,spinner:false},()=>{
            Alert.alert(response.message,"",
              [
                {text: "OK", onPress: () => this.props.navigation.navigate("UpcomingSessions")},
              ],
              { cancelable: false }
            );
          });
        } else {
          this.setState({spinner:false});
        }
      } else {
        this.setState({spinner:false});
      }
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
          <Left/>
          <Body>
            <Title style={styles.title}>JOIN SESSION</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View>
            <View style={{justifyContent:"center",alignItems:"center",marginTop:25}}>
              <Text style={{fontSize:20}}>  {"Your Session Started"} </Text>
            </View>
            <View style={{marginTop:50}}>
              <Button full onPress={this.onCancelSession.bind(this)}>
              <Text style={{color:"white",fontWeight:"900",fontSize:18}}>CANCEL SESSION</Text>
              </Button>
            </View>
          </View>
        </Content>
        {this.state.spinner === true ? (
         <View style={styles.container_spinner}>
           <View style={styles.spinnerView}>
             <Spinner size="large" color="black"/>
           </View>
         </View>
       ) : null}
      </Container>
    );
  }
}
