import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Button,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native';
import { Input, Card, CardSection } from '../common';

import styles from "./styles";

class BrowseTrainers extends Component {
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
                <Card style={styles.trainerItemList}
                    onPress={() => this.props.navigation.navigate("ViewTrainer")}>
                    <CardSection>
                        <View style={styles.trainerImage}> 
                            <Image style={styles.trainerImage}
                            source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                        </View>
                        <View style={styles.trainerDescription}>
                            <Text style={styles.descriptionLine}> Name : John Doe </Text>
                            <Text style={styles.descriptionLine}> Rating : 8.5/10 </Text>
                            <View style={{flex: 1}}>
                            <Text numberOfLines={3} style={styles.descriptionLine3}>
                                Lorem ipsum Lorem ipsum ...
                            </Text>
                            </View>
                        </View>
                    </CardSection>
                </Card>
                <Card onPress={() => this.props.navigation.navigate("ViewTrainer")}>
                    <CardSection>
                        <View style={styles.trainerImage}>
                            <Image style={styles.trainerImage}
                            source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                        </View>
                        <View style={styles.trainerDescription}>
                            <Text style={styles.descriptionLine}> Name : John Doe </Text>
                            <Text style={styles.descriptionLine}> Rating : 8.5/10 </Text>
                            <View style={{flex: 1}}>
                            <Text numberOfLines={3} style={styles.descriptionLine3}>
                                Lorem ipsum Lorem ipsum ...
                            </Text>
                            </View>
                        </View>
                    </CardSection>
                </Card>
                <Card onPress={() => this.props.navigation.navigate("ViewTrainer")}>
                    <CardSection>
                        <View style={styles.trainerImage}>
                            <Image style={styles.trainerImage}
                            source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                        </View>
                        <View style={styles.trainerDescription}>
                            <Text style={styles.descriptionLine}> Name : John Doe </Text>
                            <Text style={styles.descriptionLine}> Rating : 8.5/10 </Text>
                            <View style={{flex: 1}}>
                            <Text numberOfLines={3} style={styles.descriptionLine3}>
                                Lorem ipsum Lorem ipsum ...
                            </Text>
                            </View>
                        </View>
                    </CardSection>
                </Card>
                <Card onPress={() => this.props.navigation.navigate("ViewTrainer")}>
                    <CardSection>
                        <View style={styles.trainerImage}>
                            <Image style={styles.trainerImage}
                            source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                        </View>
                        <View style={styles.trainerDescription}>
                            <Text style={styles.descriptionLine}> Name : John Doe </Text>
                            <Text style={styles.descriptionLine}> Rating : 8.5/10 </Text>
                            <View style={{flex: 1}}>
                            <Text numberOfLines={3} style={styles.descriptionLine3}>
                                Lorem ipsum Lorem ipsum ...
                            </Text>
                            </View>
                        </View>
                    </CardSection>
                </Card>
                <Card onPress={() => this.props.navigation.navigate("ViewTrainer")}>
                    <CardSection>
                        <View style={styles.trainerImage}>
                            <Image style={styles.trainerImage}
                            source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                        </View>
                        <View style={styles.trainerDescription}>
                            <Text style={styles.descriptionLine}> Name : John Doe </Text>
                            <Text style={styles.descriptionLine}> Rating : 8.5/10 </Text>
                            <View style={{flex: 1}}>
                            <Text numberOfLines={3} style={styles.descriptionLine3}>
                                Lorem ipsum Lorem ipsum ...
                            </Text>
                            </View>
                        </View>
                    </CardSection>
                    
                </Card>
            </View>
            
        </Content>

      </Container>
    </ScrollView>
    );
  }
}

export default BrowseTrainers;
