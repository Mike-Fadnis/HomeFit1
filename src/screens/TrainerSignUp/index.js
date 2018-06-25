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
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Sign Up</Text>
      </View>
      
        <View style={styles.imputBoxContainer}>
        <View style={{ marginBottom : 10 }}>
            <CardSection>
              <Input label="Name" placeholder="John Doe" />
            </CardSection>
          </View>
          <View style={{ marginBottom : 10 }}>
            <CardSection>
              <Input label="Email" placeholder="user@gmail.com" />
            </CardSection>
          </View>
          <View style={{ marginBottom : 10 }}>
            <CardSection>
              <Input label="Password" placeholder="Password" secureTextEntry />
            </CardSection>
          </View>
          <View>
            <CardSection>
              <Input label="Verify Password" placeholder="Password" secureTextEntry />
            </CardSection>
          </View>
        </View>

      <View style={{ paddingLeft : 10, paddingRight : 10, marginTop : 20}}>
        <Button block light
          onPress={ () => this.props.navigation.navigate("TrainerHome")}
          >
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
