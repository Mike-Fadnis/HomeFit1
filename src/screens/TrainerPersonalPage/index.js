import React, { Component } from "react";
import { View } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import Calendar from 'react-native-calendar';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Icon,
  Footer,
  Button,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { ButtonTwo, Card, CardSection } from '../common';
import ButtonOne from './ButtonOne';

import styles from "./styles";

class TrainerPersonalPage extends Component {
  render() {
    return (
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
            <Title style={styles.title}>Home</Title>
          </Body>
          <Right />
        </Header>
       

        <Content padder>
          <View style={styles.onlineStore}>
            <View style={styles.buttonContainerStyle1}>
                <ButtonTwo style={styles.buttonStyle}
                  onPress={() => this.props.navigation.navigate("OnlineStore")}>
                    VIEW OUR ONLINE STORE
                </ButtonTwo>
              <View style={styles.sessionSliderStyle}>
                  <ImageSlider
                      images={storeImages.map((album) => album.image) }/>
              </View>
            </View>
          </View>

          <View style={styles.hostLiveGrpSession}>
            <View style={styles.buttonContainerStyle1}>
              <ButtonOne style={styles.buttonStyle}>
                HOST A LIVE GROUP SESSION 
              </ButtonOne>
            </View>
          </View>
          <View style={styles.hostLiveGrpSessionTextContainer}>
            <Text>
                (Host a free 15 minute session to attract more 
            </Text>
            <Text>
                clients nationally.) 
            </Text>
          </View>

          <View style={{ marginTop : 20}}>
            <Card>
              <CardSection style={ styles.totalClientsTextBox }>
                <Text style={styles.totalClientsText}>  
                  Total Clients Online : 
                </Text>
                <Text style={styles.totalClientsTextTwo}>
                  356                
                </Text>
              </CardSection>
            </Card>
          </View>

          <View style={styles.calendarContainer}>
            <Calendar currentMonth={'2018-06-01'}      
    customStyle={{day: {fontSize: 15, textAlign: 'center'}}}/>
          </View>

         <View style={styles.onlineStore}>
            <View style={styles.buttonContainerStyle1}>
                <ButtonTwo style={styles.buttonStyle}
                  onPress={() => this.props.navigation.navigate("OnlineStore")}>
                    UPDATE AVAILABLE DATES
                </ButtonTwo>
              </View>
            </View>

        </Content>
          <View style={styles.book}>
              <Text style={styles.bookText}>
                  JOIN NEXT UPCOMING TRAINING SESSION
              </Text>
          </View>

        

      </Container>
    );
  }
}

const storeImages = [
  {
      "id" : 3,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product1.jpg"
  },
  {
      "id" : 2,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product2.jpg"
  },
  {
      "id" : 1,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product1.jpeg"
  },
  {
      "id" : 0,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product3.jpg"
  },
  {
      "id" : 5,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product5.jpg"
  },
  {
      "id" : 6,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product6.jpg"
  }
];

export default TrainerPersonalPage;
