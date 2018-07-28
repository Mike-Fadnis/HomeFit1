import React, { Component } from "react";
import { View, TouchableOpacity,AsyncStorage,ActivityIndicator,Alert,TouchableWithoutFeedback } from 'react-native';
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
import API from "@utils/ApiUtils";
import styles from "./styles";
var dismissKeyboard = require('dismissKeyboard');

class TrainerLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      spinner:false
    }
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
  validEmail = Email => {
     var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
     return email.test(Email)
   }
  onLogin(){
      dismissKeyboard();
      if(this.state.email === ""|| this.state.email=== null){
        Alert.alert('Email','Email should not be empty')
      }
      else if (!this.validEmail(this.state.email)) {
         Alert.alert('Email','Please enter correct Email-id')
       }
       else if (this.state.password === ""|| this.state.password=== null) {
          Alert.alert('Password','Password should not be empty')
        }
       else{
        this.setState({spinner:true})
        AsyncStorage.getItem('@token:key', (err, token) => {
        let getToken = JSON.parse(token)
        var login={
         email:this.state.email,
         password:this.state.password,
         deviceType:getToken === null? "":getToken.os,
         deviceToken:getToken === null? "":getToken.token
        }
        API.trainerLogin(login).then(async (response) => {
           if(response.status === true){
            console.log("TRAINERUSERDTAAAA!@@@@: ", response)
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
         this.setState({spinner:false})
           console.log("Console Error",error);
         });
        }).done()
       }
    }
  render() {
    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Login</Text>
          </View>

            <View style={styles.imputBoxContainer}>
              <View style={{ marginBottom : 10 }}>
                <CardSection style={{backgroundColor:"black"}}>
                  <Input
                    label="Email"
                    placeholder="user@gmail.com"
                    onChangeText={this.onChangeEmail.bind(this)}
                    value={this.state.email}
                    keyboardType = "email-address"
                  />
                </CardSection>
              </View>
              <View>
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
            </View>

          <ListItem style={{ marginBottom : 20}}>
            <CheckBox checked={false} color="white" />
            <Body>
              <Text style={{ color : '#fff'}}>Remember Me!</Text>
            </Body>
          </ListItem>
          <View style={{ paddingLeft : 10, paddingRight : 10,
              marginBottom : 10 }}>
            <Button block light
              onPress={this.onLogin.bind(this)}>
              <Text>Login</Text>
            </Button>
          </View>
          <View style={{ paddingLeft : 10, paddingRight : 10}}>
            <Button block light
              onPress={ () => this.props.navigation.navigate("TrainerSignUp")}>
              <Text>Sign Up</Text>
            </Button>
          </View>
          <TouchableOpacity style={styles.goBack}
            onPress={ () => this.props.navigation.navigate("ClientHome")}>
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
        </TouchableWithoutFeedback>
      );
  }
}

export default TrainerLogin;
