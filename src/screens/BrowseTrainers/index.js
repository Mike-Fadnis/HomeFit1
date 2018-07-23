import React, { Component } from "react";
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body} from "native-base";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, FlatList } from 'react-native';
import { Input, Card, CardSection } from '../common';
import styles from "./styles";

var trainersList = [
  {
    "id": "1",
    "name": "John Doe A",
    "rating":"7.5",
    "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries "
  },
  {
    "id": "2",
    "name": "John B",
    "rating":"8",
    "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    "id": "3",
    "name": "John Doe C",
    "rating":"8.5",
    "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    "id": "4",
    "name": "John D",
    "rating":"9",
    "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  },
  {
    "id": "5",
    "name": "John Doe E",
    "rating":"7",
    "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  }
]

class BrowseTrainers extends Component {
  constructor(props){
    super(props);
  }
  renderData = ({item, index}) => {
    return (
      <Card onPress={() => this.props.navigation.navigate("ViewTrainer",{trainersList: item})}>
          <CardSection>
              <View style={styles.trainerImage}>
                  <Image style={styles.trainerImage}
                  source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
              </View>
              <View style={styles.trainerDescription}>
                  <Text style={styles.descriptionLine}> Name : {item.name} </Text>
                  <Text style={styles.descriptionLine}> Rating : {item.rating}/10 </Text>
                  <View style={{flex: 1}}>
                    <Text numberOfLines={2} style={styles.descriptionLine3}>
                        {item.text}
                    </Text>
                  </View>
              </View>
          </CardSection>
      </Card>
    )
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
            <Left style={styles.ham}>
              <Button style={styles.ham}
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                <Icon name="ios-menu" style={{color: "white"}}/>
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Browse</Title>
            </Body>
            <Right />
        </Header>
        <Content padder>
          <View style={styles.container}>
              <Card>
                  <CardSection>
                      <Input placeholder="Search..." />
                  </CardSection>
              </Card>
              <FlatList
                data={trainersList}
                keyExtractor={(x, i) => x.id}
                renderItem={this.renderData.bind(this)}
                />
          </View>
        </Content>
      </Container>
    );
  }
}

export default BrowseTrainers;
