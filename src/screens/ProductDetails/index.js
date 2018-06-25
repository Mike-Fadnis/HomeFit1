import * as React from "react";
import { Image, View } from "react-native";
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
  List,
  ListItem,
  Thumbnail,
} from "native-base";

import { Col, Grid, Row } from "react-native-easy-grid";


import styles from "./styles";

export interface Props {
	navigation: any;
}
export interface State {}

class ProductDetails extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            selected3: undefined
        };
    }
    onValueChange3(value: string) {
        this.setState({
            selected3: value
        });
    }
    render() {
        const product =
            {
                image: "https://www.muscleessentials.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/e/me_pre.jpg",
                type: "INTERMEDIATE PRE WORKOUT",
                name: "Me Pre 60 Servings",
                subtitle: "Muscle Building Powder",
                description: "ME PRE has been formulated to give you explosive energy, heightened focus and an overwhelming urge to tackle any challenge",
                ratings: "9.2",
                sale: "10k"
            };

        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
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
                    <View style={styles.content}>

                        {/* search block 
                        <Item style={styles.search}>
                            <Icon active name="search" style={styles.inputIcon}/>
                            <Input placeholder="Search" />
                        </Item>*/}

                        {/* product image and description block */}
                        <View style={styles.productBlock}>
                            <View size={1}>
                                <Image source={{uri: product.image}} style={{ width: 135, height: 150 }}  />
                            </View>
                            <View size={1.5} style={styles.productDescription}>
                                <Text style={styles.type}>{product.type.toUpperCase()}</Text>
                                <Text style={styles.name}>{product.name}</Text>
                                <Text style={styles.description}>{product.description.toUpperCase()}</Text>
                                <Text style={styles.subtitle}>{product.subtitle}</Text>
                                <Text />
                            </View>
                            <View style={{display: "flex", alignItems: "flex-end", 
                                        paddingRight : 10}}>
                                <View style={styles.productRating}>
                                    <Text style={{color: "#9a9b9c", fontSize: 12, fontWeight: "bold"}}>9.2</Text><Text style={{color: "#9a9b9c", fontSize: 7,  fontFamily: "Arial", fontWeight: "bold"}}>RATING</Text>
                                    <Text style={{color: "#9a9b9c", fontSize: 7,  fontFamily: "Arial", fontWeight: "bold"}}>{product.ratings}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{display: "flex", alignItems: "flex-start", flex: 1, marginTop: 16}}>
                            <Grid>
                                <Col size={1} style={styles.select}>
                                    <Form >
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Size"
                                            placeholder="Size"
                                            style={{ width:  120 }}
                                            selectedValue={this.state.selected3}
                                            onValueChange={this.onValueChange3.bind(this)}
                                        >
                                        <Picker.Item label="100 gm" value="key0" />
                                        <Picker.Item label="300 gm" value="key1" />
                                        <Picker.Item label="500 gm" value="key2" />
                                        <Picker.Item label="700 gm" value="key3" />
                                        <Picker.Item label="1000 gm" value="key4" />
                                        </Picker>
                                    </Form>
                                </Col>
                                <Col size={1} style={styles.select}>
                                    <Form style={styles.selecto}>
                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Flavors"
                                            placeholder="Flavors"
                                            style={{ width:  120 }}
                                            selectedValue={this.state.selected3}
                                            onValueChange={this.onValueChange3.bind(this)}
                                        >                                        
                                        <Picker.Item label="Apple" value="key0" />
                                        <Picker.Item label="Mango" value="key1" />
                                        <Picker.Item label="Choclate" value="key2" />
                                        <Picker.Item label="Fruit" value="key3" />
                                        <Picker.Item label="Banana" value="key4" />
                                        </Picker>
                                    </Form>
                                </Col>
                            </Grid>
                        </View>

                        <View style={styles.priceBlock}>
                            <Text style={styles.price}>$16.99</Text>
                        </View>

                        <View style={styles.freeShipping}>
                            <Text style={styles.freeShippingText}>Free Shipping</Text>
                            <Text style={styles.freeShippingAdditionalText}>on orders over $49</Text>
                        </View>

                        <View style={styles.cartButtons}>
                            <Grid>
                                <Col size={1} style={styles.qty}>
                                    <Text style={styles.freeShippingAdditionalText}>Qty:</Text>
                                    <Item regular style={{width: "40%", maxHeight: 46, marginLeft: 25}}>
                                        <Input  />
                                    </Item>
                                </Col>
                                <Col size={2}>
                                    <Button full style={{backgroundColor: "#34ace0"}}>
                                        <Text style={styles.addCartButton}>{"Add to Cart".toUpperCase()}</Text>
                                    </Button>
                                </Col>

                            </Grid>
                        </View>

                        <View style={styles.reviewsHeadingBlock}>
                            <Text style={styles.reviewsHeading}>{"Reviews".toUpperCase()}</Text>
                        </View>

                        <View style={styles.userReviewsBlock}>
                            <List>
                                <ListItem style={styles.reviewItem}>
                                    <Thumbnail square size={80} source={{ uri: "https://imagecomposer.nfl.com/?l=http://static.nfl.com/static/content/static/img/combine/2018/headshots/1400x1000/2560232.png&f=png&w=308&c=71" }} />
                                    <Body>
                                        <Text style={styles.type}>Leighton Vander</Text>
                                        <Text style={styles.subtitle}>Love this protein. Awsome flavour and mixability. I make sure my first thing in the morning is this product. Loving it for years</Text>
                                        <Text style={styles.reviewDate}>MAY 7, 2018</Text>
                                    </Body>
                                </ListItem>
                                 <ListItem style={styles.reviewItem}>
                                    <Thumbnail square size={80} source={{ uri: "https://www.lawyersweekly.com.au/images/LW_Media_Library/LW-603-p28-partner-profile.jpg" }} />
                                    <Body>
                                        <Text style={styles.type}>Chris Brodrick</Text>
                                        <Text style={styles.subtitle}>Love this protein. Awsome flavour and mixability. I make sure my first thing in the morning is this product. Loving it for years</Text>
                                        <Text style={styles.reviewDate}>MAY 6, 2018</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={styles.reviewItem}>
                                    <Thumbnail square size={80} source={{ uri: "https://imagecomposer.nfl.com/?l=http://static.nfl.com/static/content/static/img/combine/2018/headshots/1400x1000/2560232.png&f=png&w=308&c=71" }} />
                                    <Body>
                                        <Text style={styles.type}>Leighton Vander</Text>
                                        <Text style={styles.subtitle}>Love this protein. Awsome flavour and mixability. I make sure my first thing in the morning is this product. Loving it for years</Text>
                                        <Text style={styles.reviewDate}>MAY 7, 2018</Text>
                                    </Body>
                                </ListItem>
                                 <ListItem style={styles.reviewItem}>
                                    <Thumbnail square size={80} source={{ uri: "https://www.lawyersweekly.com.au/images/LW_Media_Library/LW-603-p28-partner-profile.jpg" }} />
                                    <Body>
                                        <Text style={styles.type}>Chris Brodrick</Text>
                                        <Text style={styles.subtitle}>Love this protein. Awsome flavour and mixability. I make sure my first thing in the morning is this product. Loving it for years</Text>
                                        <Text style={styles.reviewDate}>MAY 6, 2018</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>

                    </View>
                </Content>
            </Container>
        );
    }
}

export default ProductDetails;
