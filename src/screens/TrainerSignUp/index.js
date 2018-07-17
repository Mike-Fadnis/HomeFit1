import React, { Component } from "react";
import { View, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  ListItem,
  CheckBox,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { Input, Card, CardSection, ButtonTwo } from '../common';

import styles from "./styles";

class TrainerSignUp extends Component {
  constructor(props){
   super(props);
   this.state={
     name:'',
     email:'',
     password:'',
     confirmPassword:''
   }
 }
 onChangeName(text){
   this.setState({
     name:text
   })
 }
 onChangeEmail(text){
   this.setState({
     email:text
   })
 }
 onChangePassword(text){
   this.setState({
     password:text
   })
 }
 onChangeConfirmPassword(text){
   this.setState({
     confirmPassword:text
   })
 }
 validEmail = Email => {
    var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return email.test(Email)
  }
 onRegister(){
     if (!this.validEmail(this.state.email)) {
        alert('Please enter correct Email-id')
      }
    else if(this.state.password != this.state.confirmPassword){
        alert("Mismatch Password")
      }
    else{
        alert("NAME: "+this.state.name+" EMAIL: "+this.state.email+" PASSWORD "+this.state.password)
   }
   // this.props.navigation.navigate("TrainerHome")
 }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Sign Up</Text>
      </View>

        <View style={styles.imputBoxContainer}>
        <View style={{ marginBottom : 10 }}>
             <CardSection>
             <Input
               label="Name"
               placeholder="John Doe"
               onChangeText={this.onChangeName.bind(this)}
               value={this.state.name}
             />
             </CardSection>
         </View>
         <View style={{ marginBottom : 10 }}>
           <CardSection>
             <Input
               label="Email"
               placeholder="user@gmail.com"
               onChangeText={this.onChangeEmail.bind(this)}
               value={this.state.email}
             />
           </CardSection>
         </View>
         <View style={{ marginBottom : 10 }}>
           <CardSection>
             <Input
               label="Password"
               placeholder="Password"
               secureTextEntry
               onChangeText={this.onChangePassword.bind(this)}
               value={this.state.password}
             />
           </CardSection>
         </View>
         <View>
           <CardSection>
             <Input
               label="Verify Password"
               placeholder="Password"
               secureTextEntry
               onChangeText={this.onChangeConfirmPassword.bind(this)}
               value={this.state.confirmPassword}
             />
           </CardSection>
         </View>
        </View>

      <View style={{ paddingLeft : 10, paddingRight : 10, marginTop : 20}}>
        <Button block light
          onPress={this.onRegister.bind(this)}>
          <Text>Register</Text>
        </Button>
      </View>
      <TouchableOpacity style={styles.goBack}
        onPress={ () => this.props.navigation.navigate("TrainerLogin")}>
        <Text style={styles.goBackText}>Go back!</Text>
      </TouchableOpacity>
    </View>
);
  }
}

export default TrainerSignUp;
