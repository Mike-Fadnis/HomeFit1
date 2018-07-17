import React, { Component } from "react";
import { View, TouchableOpacity,Alert,AsyncStorage } from 'react-native';
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
import dismissKeyboard from 'dismissKeyboard'
import styles from "./styles";
import API from "@utils/ApiUtils";
class ClientLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      userData:{},
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
       this.setState({
         spinner:true
       })
       var login={
         email:this.state.email,
         password:this.state.password
       }
       API.clientLogin(login).then(async (response) => {
         if(response.status === true){
         console.log("USERDTAAAA!@@@@: ", response)
           this.setState({
             userData:response.data,
             spinner:false
           },()=>{
             var getUserData = this.state.userData
              AsyncStorage.setItem('@getUserData:key', JSON.stringify(getUserData))
             this.props.navigation.navigate("ClientHome")
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

     }
// this.props.navigation.navigate("TrainerPersonalPage")
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Client Login</Text>
          </View>

            <View style={styles.imputBoxContainer}>
              <View style={{ marginBottom : 10 }}>
                <CardSection style={{backgroundColor:"black"}}>
                  <Input
                    label="Email"
                    placeholder="user@gmail.com"
                    onChangeText={this.onChangeEmail.bind(this)}
                    value={this.state.email}
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
                  />
                </CardSection>
              </View>
            </View>
            {this.state.spinner === true ? (
             <View style={styles.spinnerView}>
               <Spinner color="black" style={styles.container_spinner} />
             </View>
           ) : null}
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
              onPress={ () => this.props.navigation.navigate("ClientSignup")}>
              <Text>Sign Up</Text>
            </Button>
          </View>
          <TouchableOpacity style={styles.goBack}
            onPress={ () => this.props.navigation.navigate("ClientHome")}>
            <Text style={styles.goBackText}>Go back!</Text>
          </TouchableOpacity>

        </View>
      );
  }
}

export default ClientLogin;
