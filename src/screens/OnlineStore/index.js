import React, { Component } from "react";
import { Image, View, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Icon,
  Item,
  Input,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { SearchBar } from 'react-native-elements';
import { Col, Grid } from "react-native-easy-grid";

import styles from "./styles";

const avatar = 'http://ajaypalsidhu.com//demo/HomeFit/Admin/uploads/punch.jpg';

class OnlineStore extends Component {
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
            <Title style={styles.title}>Store</Title>
          </Body>
          <Right />
        </Header>
                    
        <Content>  
              <Item style={styles.search}>
                  <Icon active name="search" style={styles.inputIcon}/>
                  <Input placeholder="Search" />
              </Item>
              
              <Image source={{uri: "https://www.t-nation.com/system/publishing/articles/10003259/original/The-Single-Best-Muscle-Building-Method.jpg?1451932310"}} style={{ width: "100%", height: 200 }}  />
              {/*<View style={styles.subContent} >
                  <Text style={styles.heading}>
                      BROWSE OUR PRODUCTS
                  </Text>
                  <Text style={styles.textContent}>
                      Only the elite earns a position in our top 50 best-sellers list. These proven supplements can help you het the results you are working for.
                  </Text>
    </View> */}
              <Card style={styles.card}>
                <CardItem>
                  <Body>
                    <Text style={styles.cardTitle}>
                      BROWSE OUR PRODUCTS
                    </Text>
                    <Text style={styles.cardDescription}>
                      Only the elite gets to earn a position in our store. These proven 
                      supplements can help you acheive the results that you are 
                      working for.
                    </Text>
                  </Body>
                </CardItem>
              </Card>   
              <View style={styles.storeHeader}>
                  <Grid>
                      <Col size={4} style={{ backgroundColor: "#FFFFFF", height: 50, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: 16 }}>
                          <Text>Products</Text>
                      </Col>
                      <Col size={1} style={{ backgroundColor: "#FFFFFF", height: 50, borderLeftColor: "#C8C8C8", borderLeftWidth: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <Text><Icon name="menu" style={{fontSize: 35}}/></Text>
                      </Col>
                    </Grid>
              </View>
              <View style={styles.storeItems}>

                <TouchableOpacity  style={styles.storeProducts}
                  onPress={() => this.props.navigation.navigate("ProductDetails")}>
                    <View style={styles.productsHeader}>
                        <View style={styles.productCount}>  
                            <Text 
                              style={{color: "#FFFFFF", 
                                    fontFamily: "Arial",
                                    }}>
                              1
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardImage}>
                        <Image source={{uri: "https://www.muscleessentials.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/e/me_pre.jpg"}} style={{ width: 100, height: 100 }}  />
                    </View>
                    <View style={styles.cardContent}>
                        <Text numberOfLines={1} style={styles.type}>Category 1</Text>
                        <Text numberOfLines={1} style={styles.name}>Product 1</Text>
                        <Text numberOfLines={3} style={styles.description}>
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.storeProducts}
                  onPress={() => this.props.navigation.navigate("ProductDetails")}>
                    <View style={styles.productsHeader}>
                        <View style={styles.productCount}>  
                            <Text style={{color: "#FFFFFF", fontFamily: "Arial"}}>2</Text>
                        </View>
                    </View>
                    <View style={styles.cardImage}>
                        <Image source={{uri: "https://www.muscleessentials.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/e/me_pre.jpg"}} style={{ width: 100, height: 100 }}  />
                    </View>
                    <View style={styles.cardContent}>
                        <Text numberOfLines={1} style={styles.type}>Category 2</Text>
                        <Text numberOfLines={1} style={styles.name}>Product 2</Text>
                        <Text numberOfLines={3} style={styles.description}>
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.storeProducts}
                  onPress={() => this.props.navigation.navigate("ProductDetails")}>
                    <View style={styles.productsHeader}>
                        <View style={styles.productCount}>  
                            <Text style={{color: "#FFFFFF", fontFamily: "Arial"}}>3</Text>
                        </View>
                    </View>
                    <View style={styles.cardImage}>
                        <Image source={{uri: "https://www.muscleessentials.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/e/me_pre.jpg"}} style={{ width: 100, height: 100 }}  />
                    </View>
                    <View style={styles.cardContent}>
                        <Text numberOfLines={1} style={styles.type}>Category 3</Text>
                        <Text numberOfLines={1} style={styles.name}>Product 3</Text>
                        <Text numberOfLines={3} style={styles.description}>
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.storeProducts}
                  onPress={() => this.props.navigation.navigate("ProductDetails")}>
                    <View style={styles.productsHeader}>
                        <View style={styles.productCount}>  
                            <Text style={{color: "#FFFFFF", fontFamily: "Arial"}}>4</Text>
                        </View>
                    </View>
                    <View style={styles.cardImage}>
                        <Image source={{uri: "https://www.muscleessentials.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/e/me_pre.jpg"}} style={{ width: 100, height: 100 }}  />
                    </View>
                    <View style={styles.cardContent}>
                        <Text numberOfLines={1} style={styles.type}>Category 4</Text>
                        <Text numberOfLines={1} style={styles.name}>Product 4</Text>
                        <Text numberOfLines={3} style={styles.description}>
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum 
                        </Text>
                    </View>
                </TouchableOpacity>

              </View>          
        </Content>

      </Container>
    );
  }
}

export default OnlineStore;