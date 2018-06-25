import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Textarea,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body, Form, Item, Input, Label
} from "native-base";
import { Card, CardSection, ButtonTwo } from '../common';

import styles from "./styles";

class TrainerFinancialDetails extends Component {
  render() {
    return (
      <ScrollView>
      <Container style={styles.container}>
         <Header style={styles.headerStyle}>
          <Left style={styles.ham}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon style={{color: "white"}} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Details</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
        <TouchableOpacity>
          <Text style={styles.titleText}>Please provide billing info : </Text>
          <Text style={styles.subTitleText}>
            ( Please provide your debit card/billing information where the 
            payments can be sent to. )
          </Text>
          <View style={styles.imputBoxContainer}>
            <Form>
              <Text style={styles.billingAddressTitle}>
                Billing address : 
              </Text>
              <Item fixedLabel>
                <Label>Address</Label>
                <Input />
              </Item>
              <Item fixedLabel>
                <Label>City</Label>
                <Input />
              </Item>
              <Item fixedLabel>
                <Label>State</Label>
                <Input />
              </Item>
              <Item fixedLabel last>
                <Label>Zip</Label>
                <Input />
              </Item>
              
              <Text style={styles.billingAddressTitle}>Card Info : </Text>
              <Item fixedLabel>
                <Label>Card Number</Label>
                <Input />
              </Item>
              <Item fixedLabel>
                <Label>Expiration Date</Label>
                <Input />
              </Item>
              <Item fixedLabel last>
                <Label>CV Number</Label>
                <Input />
              </Item>

              <Text style={styles.billingAddressTitle}>Bank Info : </Text>
              <Item fixedLabel>
                <Label>Account Number</Label>
                <Input />
              </Item>
              <Item fixedLabel>
                <Label>Routing Number</Label>
                <Input />
              </Item>
              
              <Button block
                onPress={() => this.props.navigation.navigate("TrainerPersonalPage")} 
                style={{ marginBottom : 20, backgroundColor :  "#009FDB" }}>
                <Text>Next</Text>
              </Button>
              <Button block light
                onPress={() => this.props.navigation.navigate("TrainerPersonalPage")}>
                <Text>Skip For Now</Text>
              </Button>
            </Form>
          </View>
        </TouchableOpacity>
        </Content>

      </Container>
      </ScrollView>
    );
  }
}

export default TrainerFinancialDetails;
