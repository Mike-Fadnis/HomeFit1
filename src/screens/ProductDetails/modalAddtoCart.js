import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import {Icon, List, ListItem, Left, Body, Right, Thumbnail, Button} from "native-base";
import {IMAGE_PATH} from "@common/global";

class ModalAddtoCart extends Component {
    constructor(props) {
        super(props);
        this.state={
          productDetails: "",
          productQty: ""
        };
        this.onContinueShopping = this.onContinueShopping.bind(this)
    }
    componentWillMount(){
    console.log("444444444: ", this.props.productDetailsData.image)
      this.setState({
          productDetails: this.props.productDetailsData,
          productQty: this.props.productQtyData
      })
    }
    onViewCart(){
      this.props.viewCart();
    }
    onContinueShopping(){
      this.props.onContinueShopping()
    }
    render() {
    return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    {/*(1)item addedtoCart View*/}
                    <View style={styles.addedtoCartView}>
                      <View style={styles.addedtoCartTextView}>
                        <Text style={{color:"#4facee",fontWeight:"bold"}}>(1)item added to cart</Text>
                      </View>
                      <TouchableOpacity style={styles.cancelButtonView} onPress={this.props.onClose}>
                        <Icon name="ios-close" style={{color: "white",fontSize:55}}/>
                      </TouchableOpacity>
                    </View>

                    {/* Added ProductDetails View*/}
                    <View style={styles.addedProductsView}>
                      <View style={styles.addedProductsSubView}>
                        <View style={styles.addedProductsImageView}>
                          <Image source={{uri:this.state.productDetails.image}} style={{height:80,width:70}} />
                        </View>
                        <View style={styles.addedProductsTextView}>
                          <Text style={{color:"grey",fontWeight:"bold"}}>{this.state.productDetails.name}</Text>
                          <Text style={{fontWeight:"bold"}} numberOfLines={2}>{this.state.productDetails.flavour_name}, {this.state.productDetails.size_name}</Text>
                        </View>
                      </View>
                      <View style={styles.addedProductsQuantityView}>
                        <View style={styles.addedProductsQuantitySubView}>
                          <Text style={{fontSize:12,fontWeight:"bold",color:"lightgrey"}}>Qty</Text>
                          <Text style={{fontSize:22,fontWeight:"bold",color:"black"}}>{this.state.productQty}</Text>
                        </View>
                        <View style={{flex:0.6,backgroundColor:"#f4f4f4"}}/>
                      </View>
                    </View>

                    {/* ViewCartButton View*/}
                    <View style={styles.viewcartButtonView}>
                      <TouchableOpacity style={styles.viewcartButtonSubView} onPress={this.onViewCart.bind(this)}>
                        <View style={styles.viewcartButtonTextView}>
                          <Text style={styles.viewcartButtonTextStyle}>VIEW CART</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* ContinueShoppingButton View*/}
                    <TouchableOpacity style={styles.continueShoppingButtonView} onPress={this.onContinueShopping}>
                      <View style={styles.continueShoppingButtonSubView}>
                        <Icon name="ios-arrow-back" style={{color: "#5cafef",fontSize:30,marginRight:5}}/>
                        <Text style={styles.continueShoppingButtonTextStyle}> CONTINUE SHOPPING </Text>
                      </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
  }
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#000000d1'},
  subContainer:{flex:0.5,backgroundColor:"#000000",margin:10,marginTop:100},

  addedtoCartView:{flex:0.2,flexDirection:"row",borderBottomColor:"#4facee",borderBottomWidth:2},
  addedtoCartTextView:{flex:0.7,padding:10,justifyContent:"center"},
  cancelButtonView:{flex:0.3,alignItems:"center",justifyContent:"center"},

  addedProductsView:{flex:0.5,flexDirection:"row",backgroundColor:"white",marginTop:10,margin:5},
  addedProductsSubView:{flex:0.8,flexDirection:"row"},
  addedProductsImageView:{flex:0.3,justifyContent:"center",alignItems:"center"},
  addedProductsTextView:{flex:0.7,backgroundColor:"white",padding:10},
  addedProductsQuantityView:{flex:0.2,backgroundColor:"#f4f4f4"},
  addedProductsQuantitySubView:{flex:0.4,alignItems:"center",justifyContent:"center",padding:10,borderBottomColor:"#c8c8c8",borderBottomWidth:1},

  viewcartButtonView:{flex:0.15,marginTop:10,margin:5},
  viewcartButtonTextView:{flex:1,alignItems:"center",justifyContent:"center"},
  viewcartButtonSubView:{flex:1,backgroundColor:"#5a5a5a"},
  viewcartButtonTextStyle:{color:"#FFFFFF",fontWeight:"bold",fontSize:16},

  continueShoppingButtonView:{flex:0.15,margin:5},
  continueShoppingButtonSubView:{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"},
  continueShoppingButtonTextStyle:{color:"#4facee",fontWeight:"bold",fontSize:16},




})

export default ModalAddtoCart;
