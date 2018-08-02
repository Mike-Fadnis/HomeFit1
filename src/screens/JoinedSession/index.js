/* @flow */

import React, { Component } from "react";
import {View,Text,StyleSheet,} from "react-native";
import {Container,Header,Title,Content,Icon,Button,Left,Right,Body} from "native-base";

export default class JoinedSession extends Component {
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
              <Button full>
              <Text style={{color:"white",fontWeight:"900",fontSize:18}}> CANCEL SESSION</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#009FDB"
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
