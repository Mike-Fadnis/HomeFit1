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

class TrainerLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
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
    if (!this.validEmail(this.state.email)) {
       alert('Please enter correct Email-id')
     }
     else{
      alert(" EMAIL: "+this.state.email+" PASSWORD "+this.state.password)
     }
// this.props.navigation.navigate("TrainerPersonalPage")
        }
  render() {
    return (
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
        </View>
      );
  }
}

export default TrainerLogin;
