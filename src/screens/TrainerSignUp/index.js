import React, { Component } from "react";
import { View, TouchableOpacity,AsyncStorage,Alert,ActivityIndicator } from 'react-native';
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
  Body,
  Spinner
} from "native-base";

import { Input, Card, CardSection, ButtonTwo } from '../common';
import API from "@utils/ApiUtils";
import styles from "./styles";
var dismissKeyboard = require('dismissKeyboard');

class TrainerSignUp extends Component {
  constructor(props){
   super(props);
   this.state={
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      spinner:false
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
      dismissKeyboard();
      if(this.state.name === "" || this.state.name === null){
        Alert.alert('Name','Name should not be empty')
      }
      else if(this.state.email === "" || this.state.email === null){
        Alert.alert('Email','Email should not be empty')
      }
      else if(!this.validEmail(this.state.email)) {
        Alert.alert('Email','Please enter correct Email-id')
      }
      else if(this.state.password === "" || this.state.password === null){
        Alert.alert('Password','Password should not be empty')
      }
      else if(this.state.confirmPassword === "" || this.state.confirmPassword === null){
        Alert.alert('Verify Password','Verify password should not be empty')
      }
      else if(this.state.password != this.state.confirmPassword){
        Alert.alert('Password',"Mismatch Password")
      }
      else{
        this.setState({
          spinner:true
        })
        var getToken = {}
            AsyncStorage.getItem('@token:key', (err, token) => {
              let getToken = JSON.parse(token)
                // alert("token@@@@@@ "+JSON.stringify(getToken))
                var signUp={
                  name:this.state.name,
                  email:this.state.email,
                  password:this.state.password,
                  deviceType:getToken === null? "":getToken.os,
                  deviceToken:getToken === null? "":getToken.token
                  }
                  API.trainerSignUp(signUp).then(async (response) => {
                    if(response.status === true){
                    console.log("USERDTAAAA!@@@@: ", response)
                      this.setState({
                        userData:response.data,
                        spinner:false
                      },()=>{
                        var getUserData = this.state.userData
                        AsyncStorage.setItem('@getUserType:key', "Trainer")
                        AsyncStorage.setItem('@getUserData:key', JSON.stringify(getUserData))
                        this.props.navigation.navigate("TrainerPersonalPage")
                      })
                    }else{
                      this.setState({
                        spinner:false
                      },()=>{
                          Alert.alert(response.message,"")
                      })

                    }
                  }).catch((error)=>{
                    this.setState({
                      spinner:false
                    })

                  });
             }).done()
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
               keyboardType = "default"
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
               keyboardType = "email-address"
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
               keyboardType = "default"
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
               keyboardType = "default"
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
      {this.state.spinner === true ? (
      <View style={styles.container_spinner}>
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="black"/>
        </View>
      </View>
      ) : null}
    </View>

);
  }
}

export default TrainerSignUp;
