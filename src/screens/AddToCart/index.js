import * as React from "react";
import {Image,View,FlatList,Alert,Dimensions,TouchableOpacity} from "react-native";
import {Container,Header,Title,Content,Button,Icon,Left,Body,Right,SwipeRow,Text,Input} from "native-base";
import {connect} from "react-redux";
import {List} from "react-native-elements";
import Picker from 'react-native-picker';

import styles from "./styles";
import {IMAGE_PATH} from "@common/global";
import Images from "@theme/images/images";
import {addToCartItem,removeCartItem} from "@actions";

export interface Props {navigation: any;}
export interface State {}
const window = Dimensions.get('window');
var myTotal = 0;

class Cart extends React.Component < Props, State > {
    constructor(props) {
      super(props);
      this.state = {
        cartItems: [],
        totalPrice: [],
        onEditing: false,
        onRowOpenValue: "",
        spinner:true,
        size_id:'',
        flavour_id:'',
        selectionQuantity:1,
        row_id:'',
        quantityList: []
      };
    }
    componentWillMount() {
      this.setState({
        cartItems: this.props.cartItems.addToCartItem.cartItems,
        totalPrice: this.props.cartItems.addToCartItem.totalPrice
      });
       for(var i=1;i<100;i++){
          this.state.quantityList.push(i);
      }
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        cartItems: nextProps.cartItems.addToCartItem.cartItems
      });
    }
    onBackPressed() {
      this.props.navigation.navigate("OnlineStore")
    }
    onEdit() {
      this.setState({
        onEditing: !this.state.onEditing
      });
    }
    deletedItem(index) {
      var item = {
        id: index.id,
        totalQuantity: 1,
        name: index.name,
        description: index.description,
        price: index.price,
        category: index.category,
        quantity: index.quantity,
        sub_heading: index.sub_heading,
        image: IMAGE_PATH + index.image,
        status: index.status,
        size_id:index.size_id,
        flavour_id:index.flavour_id,
        size_name:index.selectedSize,
        flavour_name:this.state.selectedFlavour
      };
      this.props.dispatchDeleteCart(item);
    }
    deleteRow(index) {
      Alert.alert(
        "Delete",
        "Are you sure you want to delete ?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed")
          },
          {
            text: "OK",
            onPress: () => this.deletedItem(index)
          },
        ], {
          cancelable: false
        }
      );
    }
    onSwipeRight(index) {
        this.setState({
            onRowOpenValue: index.id,
            size_id:index.size_id,
            flavour_id:index.flavour_id
        });
    }
  onAddToCart(data){
    console.log("onaddtocat",data)
   var item = {
       id: data.id,
       totalQuantity:  data.totalQuantity,
       name: data.name,
       pickerQuantity: data.totalQuantity,
       originalquantity:data.originalquantity,
       description: data.description,
       price: data.price,//this.state.productDetails.price,
       category: data.category,
       quantity: data.quantity,
       sub_heading: data.sub_heading,
       image: IMAGE_PATH + data.image,
       status: data.status,
       size_id:data.size_id,
       flavour_id:data.flavour_id,
       size_name:data.selectedSize,
       flavour_name:data.selectedFlavour
   };
   this.props.dispatchAddCart(item);
}

  onPicker(item,index){
    var quantity = parseInt(item.totalQuantity)
    Picker.init({
        pickerData: this.state.quantityList,
        selectedValue: [quantity],
        onPickerConfirm: data => {
              this.setState({
                selectionQuantity:data
              });
              this.state.cartItems.map((res,i)=> {
                if(res.id === item.id && res.size_id === item.size_id && res.flavour_id === item.flavour_id){
                  res.originalquantity = item.totalQuantity;
                  res.totalQuantity = data[0]
                }
              })
              this.onAddToCart(item)
              this.setState({
                cartItems:this.state.cartItems
              })
          },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        },
        pickerTitleText:"Quantity",
        pickerConfirmBtnText:"Done",
        pickerCancelBtnText:"Cancel",
        pickerFontSize:50,
        pickerRowHeight:35,
        pickerBg:[255,255,255,1],
        pickerToolBarBg:[69, 69, 69, 1],
        pickerTitleColor:[255,255,255,1],
        pickerCancelBtnColor:[255,255,255,1],
        pickerConfirmBtnColor:[255,255,255,1]
    });
    Picker.show();
  }
  onSecureCheckout(){
     var checkoutItems = {}
     let listArray = []
     this.state.cartItems.map((res, key)=>{
       listArray.push({product_id:res.id,flavour_id:res.flavour_id,size_id:res.size_id})
     })
     checkoutItems = {allCartitems: listArray, totalPrice:myTotal}
       alert(JSON.stringify(checkoutItems))
   }
  renderData = ({item,index}) => {
  if (this.state.onEditing === true) {
  return (
          <View style={styles.productBlockEditView}>
              {this.state.onRowOpenValue != item.id || this.state.size_id != item.size_id || this.state.flavour_id != item.flavour_id ?
                    (<View style={styles.deleteIconView}>
                    <Button transparent onPress={this.onSwipeRight.bind(this, item)} style={styles.deleteIconButton}>
                        <Image source={Images.deleteIcon}/>
                    </Button>
                    </View>):(null)}
              <View style={styles.productBlock}>
                  <View size={1} style={styles.productImageView}>
                      <Image source={{uri: item.image}} style={styles.productImageStyle}/>
                  </View>
                  <View style={styles.productDescription}>
                      <View style={styles.emptyFlexView}/>
                      <View style={styles.ProductDetailsTextView}>
                        <Text style={styles.type}>{item.name} {item.flavour_name}, {item.size_name}</Text>
                      </View>
                      <View style={styles.ProductDetailsTextView}>
                        <Text style={styles.price}>${item.price}</Text>
                      </View>
                      <View style={styles.ProductDetailsTextView}>
                        <Text style={styles.stock}>In Stock</Text>
                      </View>
                      <View style={styles.quantityButtonView}>
                          <Button transparent onPress={this.onPicker.bind(this,item,index)}>
                              <View style={styles.quantityView}>
                                  <View style={styles.quantityTextView}>
                                    <Text>{item.totalQuantity}</Text>
                                  </View>
                                  <View style={styles.quantityPickerView}>
                                      <Image source={Images.dropdownIcon} style={styles.dropdownImageStyle}/>
                                  </View>
                              </View>
                          </Button>
                      </View>
                      <View style={styles.emptyFlexView}/>
                  </View>
              </View>
                  {this.state.onRowOpenValue === item.id && this.state.size_id === item.size_id && this.state.flavour_id === item.flavour_id ?
                  (<View style={{backgroundColor:'#ea290e',justifyContent:'center'}}>
                  <Button transparent onPress={this.deleteRow.bind(this,item)}>
                      <Text style={styles.deleteTextStyle}>Delete</Text>
                  </Button>
                  </View>):(null)}
          </View>)
          } else {
              return (
                  <SwipeRow
                      leftOpenValue={0}
                      rightOpenValue={-90}
                      disableRightSwipe={true}
                      style={{ paddingRight: 0}}
                      body={
                          <View style={styles.productBlockSwipeView}>
                              <View style={styles.productBlock}>
                                  <View size={1} style={styles.productImageView}>
                                      <Image source={{uri: item.image}} style={styles.productImageStyle}  />
                                  </View>
                                  <View style={styles.productDescription}>
                                      <View style={styles.emptyFlexView}/>
                                      <View style={styles.ProductDetailsTextView}>
                                        <Text style={styles.type}>{item.name} {item.flavour_name}, {item.size_name}</Text>
                                      </View>
                                      <View style={styles.ProductDetailsTextView}>
                                        <Text style={styles.price}>${item.price}</Text>
                                      </View>
                                      <View style={styles.ProductDetailsTextView}>
                                        <Text style={styles.stock}>In Stock</Text>
                                      </View>
                                      <View style={styles.quantityButtonView}>
                                          <Button transparent onPress={this.onPicker.bind(this,item,index)}>
                                              <View style={styles.quantityView}>
                                                  <View style={styles.quantityTextView}>
                                                    <Text>{item.totalQuantity}</Text>
                                                  </View>
                                                  <View style={styles.quantityPickerView}>
                                                      <Image source={Images.dropdownIcon} style={styles.dropdownImageStyle}/>
                                                  </View>
                                              </View>
                                          </Button>
                                      </View>
                                      <View style={styles.emptyFlexView}/>
                                  </View>
                              </View>
                          </View>
                      }
                      right={
                          <Button style={styles.bgRed} onPress={this.deleteRow.bind(this, item)}>
                              <Text style={styles.fontBold}>Delete</Text>
                          </Button>
                      }/>
              );
          }
      }
    render() {
        var duplicateArray = [];
        this.state.cartItems.map((res, key)=>{
            duplicateArray.push(res.totalQuantity * res.price);
        });
        myTotal = 0;
        for (var i = 0;  i < duplicateArray.length; i++) {
              myTotal  = parseInt(myTotal) + parseInt(duplicateArray[i])
              }

        return (
            <Container style={styles.container}>
             <Header style={styles.header}>
                <Left style={styles.headerLeftStyle}>
                  <Button transparent onPress={this.onBackPressed.bind(this)}>
                      <Icon style={{color: "white"}} name="ios-arrow-back" />
                  </Button>
                  <Button style={[styles.ham,{marginLeft:10}]}
                     transparent
                     onPress = {() => this.props.navigation.navigate("DrawerOpen")}>
                   <Icon name = "ios-menu" style={{color: "white"}}/>
                 </Button>
                </Left>
                <Body>
                  <Title style={styles.title}>Cart</Title>
                </Body>
                <Right>
                  <Button transparent onPress={this.onEdit.bind(this)}>
                    {this.state.cartItems === [] || this.state.cartItems.length === 0 ? (
                    null
                    ):(this.state.onEditing === false ? (<Text style={styles.headerRightTextStyle}>Edit</Text>) : (
                        <Text style={styles.headerRightTextStyle}>Done</Text>)
                    )}
                  </Button>
                </Right>
            </Header>

            {this.state.cartItems === [] || this.state.cartItems.length === 0 ? (
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                  <Text> Your cart is empty.</Text>
                  <TouchableOpacity style={{marginTop:25}} onPress={this.onBackPressed.bind(this)}>
                      <Text style={{color:"blue"}}>Continue Shopping</Text>
                  </TouchableOpacity>
                </View>
            ): (
            <Content>
              <View style={styles.content}>
                <View style={styles.subContainer}>
                    <View style={styles.discountedView}>
                        <View style={styles.discountedTextView}>
                            <Text style={styles.discountedTextStyle}>Discounted SubTotal (1 item):</Text>
                        </View>
                        <View style={styles.discountedPriceView}>
                            <Text style={styles.discountedPriceTextStyle}>$ {myTotal}</Text>
                        </View>
                    </View>
                    <View style={styles.secureCheckOutView}>
                      <TouchableOpacity onPress={this.onSecureCheckout.bind(this)}>
                        <View style={styles.secureCheckOutButton}>
                            <Text style={styles.secureCheckOutTextStyle}>SECURE CHECKOUT</Text>
                        </View>
                      </TouchableOpacity>
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
                <View style={styles.footerContainer}>
                  <View style={styles.discountedView}>
                      <View style={styles.discountedTextView}>
                          <Text style={styles.discountedTextStyle}>Discounted SubTotal (1 item):</Text>
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
                    <TouchableOpacity onPress={this.onSecureCheckout.bind(this)}>
                      <View style={styles.secureCheckOutButton}>
                          <Text style={styles.secureCheckOutTextStyle}>SECURE CHECKOUT</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.continueShoppingView}>
                    <TouchableOpacity onPress={this.onBackPressed.bind(this)}>
                        <Text style={{color:"#4eabee"}}>CONTINUE SHOPPING</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Content>
            )}
        </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        cartItems: state
    };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteCart: item => dispatch(removeCartItem(item)),
    dispatchAddCart: item => dispatch(addToCartItem(item))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
