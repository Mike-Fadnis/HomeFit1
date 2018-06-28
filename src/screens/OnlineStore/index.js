import React, { Component } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
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
import { SearchBar, List } from 'react-native-elements';
import { Col, Grid } from "react-native-easy-grid";

import styles from "./styles";
import API from '@utils/ApiUtils';
import {IMAGE_PATH} from '@common/global'

const avatar = 'http://ajaypalsidhu.com//demo/HomeFit/Admin/uploads/punch.jpg';

class OnlineStore extends Component {
  constructor(props){
    super(props);
    this.state= {
      allProducts: []
    }
  }
  async componentWillMount(){
    API.getProducts().then(async (response) => {       
      if(response){
        this.setState({
          allProducts: response.data
        })
      }
    }).catch((error)=> {
      console.log(error)
    });
  }

  renderData = ({item, index}) => {
      return (
          <TouchableOpacity  style={styles.storeProducts}
            onPress={() => this.props.navigation.navigate("ProductDetails")}>
              <View style={styles.productsHeader}>
                  <View style={styles.productCount}>  
                      <Text 
                        style={{color: "#FFFFFF", 
                              fontFamily: "Arial",
                              }}>
                         {
                           `${item.id}`
                         }
                      </Text>
                  </View>
              </View>
              <View style={styles.cardImage}>
                  < Image source = {
                    {uri: IMAGE_PATH + item.image}
                  }
                  style = {
                    {
                      width: 100,
                      height: 100
                    }
                  }
                  />
              </View>
              <View style={styles.cardContent}>
                  <Text numberOfLines={1} style={styles.type}>{item.cat_name}</Text>
                  <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                  <Text numberOfLines={3} style={styles.description}>
                    {item.description}
                  </Text>
              </View>
                </TouchableOpacity>

      );
  }

  render() {
    // var designProduct = []    
    //    {this.state.allProducts.map((obj, key) => {
    //      designProduct.push(
    //       <View>
    //         <TouchableOpacity  style={styles.storeProducts}
    //               onPress={() => this.props.navigation.navigate("ProductDetails")}>
    //                 <View style={styles.productsHeader}>
    //                     <View style={styles.productCount}>  
    //                         <Text 
    //                           style={{color: "#FFFFFF", 
    //                                 fontFamily: "Arial",
    //                                 }}>
    //                           {obj.id}
    //                         </Text>
    //                     </View>
    //                 </View>
    //                 <View style={styles.cardImage}>
    //                     < Image source = {
    //                       {uri: IMAGE_PATH + obj.image}
    //                     }
    //                     style = {
    //                       {
    //                         width: 100,
    //                         height: 100
    //                       }
    //                     }
    //                     />
    //                 </View>
    //                 <View style={styles.cardContent}>
    //                     <Text numberOfLines={1} style={styles.type}>{obj.cat_name}</Text>
    //                     <Text numberOfLines={1} style={styles.name}>{obj.name}</Text>
    //                     <Text numberOfLines={3} style={styles.description}>
    //                       {obj.description}
    //                     </Text>
    //                 </View>
    //             </TouchableOpacity> 
    //       </View>)
    //      })
    //   }
    
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
              <List>
                  <FlatList                                       
                    data={this.state.allProducts}
                    keyExtractor={(x, i) => x.id}
                    renderItem={this.renderData.bind(this)}
                    numColumns={2} 
                    style={{backgroundColor:'#dce2ef'}}                   
                    />                
              </List>
              </View>          
        </Content>

      </Container>
    );
  }
}

export default OnlineStore
