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
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Login</Text>
          </View>
          
            <View style={styles.imputBoxContainer}>
              <View style={{ marginBottom : 10 }}>
                <CardSection>
                  <Input label="Email" placeholder="user@gmail.com" />
                </CardSection>
              </View>
              <View>
                <CardSection>
                  <Input label="Password" placeholder="Password" secureTextEntry />
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
              onPress={ () => this.props.navigation.navigate("TrainerPersonalPage")}>
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
