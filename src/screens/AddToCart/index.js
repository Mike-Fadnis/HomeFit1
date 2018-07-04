import * as React from "react";
import {
    Image,
    View,
    FlatList,
    Alert
} from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Spinner,
    Left,
    Body,
    Right,
    SwipeRow,    
    Text,
    Item,
    Input,
    Picker,
    Form,
    ListItem,
    Thumbnail,
} from "native-base";
import {
    connect
} from 'react-redux';
import {
    Col,
    Grid,
    Row
} from "react-native-easy-grid";
import {
    List
} from 'react-native-elements';
import styles from "./styles";
import {
    IMAGE_PATH
} from '@common/global';
import Images from '@theme/images/images';
export interface Props {
    navigation: any;
}
import {
    removeCartItem
} from '@actions';
export interface State {}
var quantityList = []

class Cart extends React.Component < Props, State > {
    constructor(props) {
      super(props);
      this.state = {
        selected3: undefined,
        cartItems: [],
        totalPrice: [],
        onEditing: false,
        onRowOpenValue: '',
        spinner: true        
      };
    }
    componentWillMount() {
      var totalPrice = parseFloat(this.props.cartItems.addToCartItem.totalPrice)
      this.setState({
        cartItems: this.props.cartItems.addToCartItem.cartItems,
        totalPrice: this.props.cartItems.addToCartItem.totalPrice        
      })
      for (i = 0; i <= 100; i++) {
        quantityList.push({
          label: i.toString(),
          value: i.toString()
        })
      }
    }
    componentWillReceiveProps(nextProps) {
      //alert(JSON.stringify(nextProps.cartItems.addToCartItem.cartItems))
      this.setState({
        cartItems: nextProps.cartItems.addToCartItem.cartItems        
      })

    }
    onValueChange3(value: string) {
      this.setState({
        selected3: value
      });
    }
    onBackPressed() {
      this.props.navigation.navigate("ProductDetails")
    }
    onEdit() {
      this.setState({
        onEditing: !this.state.onEditing
      })
    }
    deletedItem(index) {
      // alert(JSON.stringify(index))    
      var item = {
        id: index.id,
        totalQuantity: 1, //quantity== ""?1:parseInt(quantity),
        name: index.name,
        description: index.description,
        price: index.price,
        category: index.category,
        quantity: index.quantity,
        sub_heading: index.sub_heading,
        image: IMAGE_PATH + index.image,
        status: index.status
      };
      this.props.dispatchDeleteCart(item);      
      //   this.state.cartItems.splice(index, 1)// This will remove the element at index, and update this.items with new array
      //   this.setState({
      //     cartItems: this.state.cartItems
      //   });
      // alert("Item deleted successfully")
    }
    deleteRow(index) {
      Alert.alert(
        'Delete',
        'Are you sure you want to delete?', [

          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed')
          },
          {
            text: 'OK',
            onPress: () => this.deletedItem(index)
          },
        ], {
          cancelable: false
        }
      )
    }

    onSwipeRight(index) {
        this.setState({
            onRowOpenValue: index.id
        })
    }

    onOpenRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.manuallySwipeRow(20);
    }

    renderData = ({
        item,
        index
    }) => {
    if (this.state.onEditing === true) {
    return (
            <View style={[styles.productBlockView,{borderBottomColor:"lightgrey",borderBottomWidth: 1}]}>
                    {this.state.onRowOpenValue != item.id?
                    (<View style={{alignItems:'center', justifyContent:'center'}}>
                    <Button transparent onPress={this.onSwipeRight.bind(this, item)} style={{marginLeft:10,alignItems:'center', justifyContent:'center'}}>
                        <Image source={Images.deleteIcon} style={styles.deleteIcon} />
                    </Button>
                    </View>):(null)}
                <View style={styles.productBlock}>
                    <View size={1} style={{alignItems:'flex-end',padding:5}}>
                        <Image source={{uri: item.image}} style={{ width: 150, height: 150 }}  />                     
                    </View>
                    <View style={styles.productDescription}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.type}>4,4</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <Text style={styles.stock}>In Stock</Text> 
                        <Button transparent>
                            <View style={styles.quantityView}>
                                <View style={styles.quantityTextView}>  
                                    <Text>{item.totalQuantity}</Text>
                                </View>
                                <View style={styles.quantityPickerView}> 
                                    <Image source={Images.dropdownIcon} style={{width:20,height:20}}/>                          
                                </View>
                            </View>   
                        </Button>
                    </View>
                    {/* <View style={styles.allCenter}>
                        <Text style={styles.totalQuantityTextStyle}>x {item.totalQuantity}</Text>
                    </View> */}                
                </View>

                {this.state.onRowOpenValue === item.id?
                    (<View style={{backgroundColor:'#ea290e',justifyContent:'center'}}>
                    <Button transparent onPress={this.deleteRow.bind(this, item)}>
                        <Text style={styles.deleteTextStyle}>Delete</Text>
                    </Button>
                    </View>):(null)}
            </View>
                    )
                }
            else{
                return(
                    <SwipeRow
                        leftOpenValue={0}
                        rightOpenValue={-90}
                        disableRightSwipe={true}
                        style={{ paddingRight: 0 ,borderBottomWidth:1, borderBottomColor:"lightgrey"}}
                        body={
                            <View style={styles.productBlockView}>                
                                <View style={styles.productBlock}>
                                    <View size={1} style={{alignItems:'flex-end',padding:5}}>
                                        <Image source={{uri: item.image}} style={{ width: 150, height: 150 }}  />                     
                                    </View>
                                    <View style={styles.productDescription}>
                                        <View style={{flex:1,alignItems:'flex-start'}}> 
                                            <Text style={styles.name}>{item.name}</Text>  
                                        </View>
                                        <View style={{flex:1,alignItems:'flex-start'}}> 
                                            <Text style={styles.type}>4,4</Text>
                                        </View>
                                        <View style={{flex:1,alignItems:'flex-start'}}> 
                                            <Text style={styles.price}>${item.price}</Text>
                                        </View>
                                        <View style={{flex:1,alignItems:'flex-start'}}> 
                                            <Text style={styles.stock}>In Stock</Text> 
                                        </View>                                    
                                        <Button transparent>
                                            <View style={styles.quantityView}>
                                                <View style={styles.quantityTextView}>  
                                                    <Text>{item.totalQuantity}</Text>
                                                </View>
                                                <View style={styles.quantityPickerView}> 
                                                    <Image source={Images.dropdownIcon} style={{width:20,height:20}}/>                          
                                                </View>
                                            </View>   
                                        </Button>                       
                                    </View>                                
                                </View>              
                            </View>
                        }
                        right={
                            <Button style={{ backgroundColor: 'red' }} onPress={this.deleteRow.bind(this, item)}>
                                <Text style={{fontWeight:'900'}}>Delete</Text>
                            </Button>
                        }/>
                )
            }
        }
    render() {
        // const product =
        //     {
        //         image: "https://www.muscleessentials.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/e/me_pre.jpg",
        //         name: "Product 1",
        //         price:"121",
        //         stock:"In Stock",
        //         subtitle: "Muscle Building Powder"
        //   };
        var duplicateArray = []
        var myTotal = 0
        this.state.cartItems.map((res, key)=>{
            duplicateArray.push(res.totalQuantity * res.price)
        //  alert(duplicateArray)

        })
        for(var i = 0;  i < duplicateArray.length; i++) {
                myTotal  = parseInt(myTotal) + parseInt(duplicateArray[i])
                }
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
                <Right>
                    <Button transparent onPress={this.onEdit.bind(this)}>
                      { this.state.onEditing ==false?(<Text style={styles.headerRightTextStyle}>
                            Edit
                        </Text>):(<Text style={styles.headerRightTextStyle}>
                            Done
                        </Text>)
                        }
                    </Button>
                </Right>
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
                                    <Text style={styles.discountedPriceTextStyle}>$ {myTotal}</Text>
                                </View>
                            </View>
                            <View style={styles.secureCheckOutView}>
                                <View style={styles.secureCheckOutButton}>
                                    <Text style={styles.secureCheckOutTextStyle}>SECURE CHECKOUT</Text>
                                </View>
                            </View>
                        </View>
                        <List>                            
                            <FlatList
                                data={this.state.cartItems}
                                keyExtractor={(x, i) => x.id}
                                extraData={this.state}
                                renderItem={this.renderData.bind(this)}
                                style={{backgroundColor:'#FFFFFF'}}
                            />                        
                        </List>

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
                                    <Text style={styles.discountedPriceTextStyle}>${myTotal}</Text>
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

function mapStateToProps(state) {
// alert("MAIN: "+JSON.stringify(state))
    return {
        cartItems: state
    }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteCart: item => dispatch(removeCartItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
