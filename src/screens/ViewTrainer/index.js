import React, { Component } from "react";
import { View, ScrollView, Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { Card, CardSection } from '../common';

import styles from "./styles";

const image  = [
  {
      "id" : 3,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/image4.jpeg"
  }
];

class ViewTrainer extends Component {
  render() {
    return (
      <ScrollView>
        <Container style={styles.container}>
          <Header style={styles.headerStyle}>
          <Left style={styles.ham}>
            <Button style={styles.ham}
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
            <Body>
              <Title style={styles.title}>Trainer</Title>
            </Body>
            <Right />
          </Header>

        <Content style={styles.content}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>John Doe</Text>
          </View>
          <CardSection style={styles.singleImageContainer}>
            <View style={styles.imageBig}>
              <Image style={{ height : 150, width : 175}} 
                source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
              </View>
            <View style={styles.imageBig}>
              <Image style={{ height : 150, width : 175}} 
                source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
            </View>
          </CardSection>
          <CardSection style={styles.singleImageContainer}>
            <View style={styles.imageBig}>
              <Image style={{ height : 150, width : 115 }} 
                source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
              </View>
            <View style={styles.imageBig}>
              <Image style={{ height : 150, width : 115}} 
                source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
            </View>
            <View style={styles.imageBig}>
              <Image style={{ height : 150, width : 115}} 
                source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
            </View>
          </CardSection>
          
          <Card>
            <Text style={styles.specialityTitle}>Specialities :</Text>
            <CardSection>
            <Text>Speciality 1</Text>
            </CardSection>
            <CardSection>
            <Text>Speciality 2</Text>
            </CardSection>
            <CardSection>
            <Text>Speciality 3</Text>
            </CardSection>
          </Card>

          <View style={styles.bioContainer}>
              <Text style={styles.bio}>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
              </Text>
          </View>
          <View style={styles.book}>
              <Text style={styles.bookText}>
                BOOK SESSION NOW! ONLY $34.99
              </Text>
          </View>
          
        </Content>

      </Container>
    </ScrollView>
    );
  }
}

export default ViewTrainer;
