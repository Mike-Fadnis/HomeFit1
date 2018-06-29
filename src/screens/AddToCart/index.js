import * as React from "react";
import { Image, View, FlatList } from "react-native";
import { NavigationActions } from 'react-navigation';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Text,
  Item,
  Input,
  Picker,
  Form,  
  ListItem,
  Thumbnail,
} from "native-base";

import { Col, Grid, Row } from "react-native-easy-grid";
import { List } from 'react-native-elements';


import styles from "./styles";

export interface Props {
	navigation: any;
}
export interface State {}

class ProductDetails extends React.Component<Props, State> {
//     static navigationOptions = ({ navigation }) => {
//     const { params } = navigation.state
//     return {
//       title: 'Product Details',
//       headerTintColor: 'red',
//       headerStyle: styles.headerStyleMain,
//       headerTitleStyle: {
//         color: 'pink',
//         alignSelf:'center'
//       },
//       headerRight:null
//     }
//   }
    constructor(props) {
        super(props);
        this.state = {
            selected3: undefined,
            pushedProducts: this.props.navigation.state.params.products,
        };
        
    }
    componentWillMount(){        
        //alert(JSON.stringify(this.props.navigation.state.params.products))
        // console.log('add to card pressed: ', this.props.navigation.state.params.products)
    }
    onValueChange3(value: string) {
        this.setState({
            selected3: value
        });
    }
    // renderData = ({item, index}) => {
    //     return (
    //         <View style={{backgroundColor:'orange',height:150,width:250}}>
    //             <Text style={{color:'red',fontSize:30}}>
    //                 {item.description}
    //             </Text>
    //         </View>
    //     )
    // }
    onBackPressed(){
        // this.props.navigation.dispatch({
        //     type: 'Navigation/NAVIGATE',
        //     routeName: 'ProductDetails',
        //     action: {
        //         type: 'Navigation/NAVIGATE',
        //         routeName: 'ProductDetails',
        //     }
        // });           
        this.props.navigation.navigate("ProductDetails")

    }

    render() { 
        const product =
            {
                image: "https://www.muscleessentials.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/e/me_pre.jpg",
                name: "Product 1",
                price:"121",
                stock:"In Stock",
                subtitle: "Muscle Building Powder"                
            };            
        return (
            <Container style={styles.container}>   
             <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={this.onBackPressed.bind(this)}>
                        <Icon style={{color: "white"}} name="ios-arrow-back" />
                    </Button>
				</Left>
                <Body>
                    <Title style={styles.title}>Cart</Title>
                </Body>
                <Right />
                </Header>

                <Content>
                    <View style={styles.content}>
                        {/* search block 
                        <Item style={styles.search}>
                            <Icon active name="search" style={styles.inputIcon}/>
                            <Input placeholder="Search" />
                        </Item>
                        */}

                        {/* product image and description block */}
                        <View style={styles.subContainer}>
                            <View style={styles.discountedView}>
                                <View style={styles.discountedTextView}>
                                    <Text style={styles.discountedTextStyle}> Discounted SubTotal(1 item):</Text>
                                </View>
                                <View style={styles.discountedPriceView}>
                                    <Text style={styles.discountedPriceTextStyle}>$121</Text>
                                </View>
                            </View>
                            <View style={styles.secureCheckOutView}>
                                <View style={styles.secureCheckOutButton}>
                                    <Text style={styles.secureCheckOutTextStyle}>SECURE CHECKOUT</Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.productBlockView}>
                            <View style={styles.productBlock}>                            
                                <View size={1} style={{alignItems:'flex-end',}}>
                                    <Image source={{uri: product.image}} style={{ width: 150, height: 150 }}  />
                                </View>
                                <View size={1.5} style={styles.productDescription}>
                                    <Text style={styles.name}>{product.name}</Text>
                                    <Text style={styles.type}>4,4</Text>                                
                                    <Text style={styles.price}>${product.price}</Text>                                
                                    <Text style={styles.stock}>{product.stock}</Text>                                
                                </View>                            
                            </View>
                        </View>

                        {/* <List>
                            <FlatList
                                data={this.state.pushedProducts}
                                keyExtractor={(x, i) => x.id}
                                renderItem={this.renderData.bind(this)}/>
                        </List>*/}
                                  

                        <View style={styles.cartButtons}>
                            <View style={styles.promocodeView}> 
                                <View style={styles.promocodeTextView}>
                                    <Input
                                    placeholder = 'Have a promo code?'
                                    placeholderTextColor = "grey" />
                                </View>
                                <View style={styles.applyTextView}>
                                    <Button full style={{backgroundColor: "#34ace0"}}>
                                        <Text style={styles.applyTextStyle}>Apply</Text>
                                    </Button>
                                </View>                            
                            </View>
                            <View style={styles.promocodeConidtionView}>
                                <Text style={styles.promocodeConditionTextStyle}>Only One Coupon Can Be Applied Per Order</Text>
                            </View>
                        </View>

                         <View style={styles.footerContainer}>
                            <View style={styles.discountedView}>
                                <View style={styles.discountedTextView}>
                                    <Text style={styles.discountedTextStyle}> Discounted SubTotal(1 item):</Text>                                    
                                </View>
                                <View style={styles.discountedPriceView}>
                                    <Text style={styles.discountedPriceTextStyle}>$121</Text>
                                </View>
                            </View>                            
                            <View style={styles.discountedView}>
                                <View style={styles.discountedTextView}>
                                    <Text style={styles.discountedTextStyle}> Shipping Estimation: </Text>                                    
                                </View>
                                <View style={styles.discountedPriceView}>
                                    <Text style={styles.discountedPriceTextStyle}>$80</Text>
                                </View>
                            </View>
                            <View style={styles.footersecureCheckOutView}>
                                <View style={styles.secureCheckOutButton}>
                                    <Text style={styles.secureCheckOutTextStyle}>SECURE CHECKOUT</Text>
                                </View>
                            </View>  
                            <View style={styles.continueShoppingView}>
                                <Text style={styles.continueShoppingTextStyle}>CONTINUE SHOPPING</Text>
                            </View>                          
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ProductDetails;
