import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import {Icon, List, ListItem, Left, Body, Right, Thumbnail, Button} from "native-base";
import {IMAGE_PATH} from "@common/global";

class ModalAddtoCart extends Component {
    constructor() {
        super();
        this.state={
          productDetails: "",
          productQty: ""
        };
    }
    componentWillMount(){
      this.setState({
          productDetails: this.props.productDetailsData,
          productQty: this.props.productQtyData
      })
    }
    onViewCart(){
      this.props.viewCart();
    }
    render() {
    return (
            <View style={{flex:1,backgroundColor:'#000000d1'}}>
                <View style={{flex:0.5,backgroundColor:"#000000",margin:10,marginTop:100}}>
                    {/*(1)item added to cart View*/}
                    <View style={{flex:0.2,flexDirection:"row",borderBottomColor:"#4facee",borderBottomWidth:2}}>
                      <View style={{flex:0.7,padding:10,justifyContent:"center"}}>
                        <Text style={{color:"#4facee",fontWeight:"bold"}}>(1)item added to cart</Text>
                      </View>
                      <TouchableOpacity style={{flex:0.3,alignItems:"center",justifyContent:"center"}} onPress={this.props.onClose}>
                        <Icon name="ios-close" style={{color: "white",fontSize:55}}/>
                      </TouchableOpacity>
                    </View>

                    {/* Added Product View*/}
                    <View style={{flex:0.5,flexDirection:"row",backgroundColor:"white",marginTop:10,margin:5}}>
                      <View style={{flex:0.8,flexDirection:"row"}}>
                        <View style={{flex:0.3,justifyContent:"center",alignItems:"center"}}>
                          <Image source={{uri: IMAGE_PATH + this.state.productDetails.image}} style={{height:80,width:70}} />
                        </View>
                        <View style={{flex:0.7,backgroundColor:"white",padding:10}}>
                          <Text style={{color:"grey",fontWeight:"bold"}}>{this.state.productDetails.name}</Text>
                          <Text style={{fontWeight:"bold"}} numberOfLines={2}>{this.state.productDetails.description}</Text>
                        </View>
                      </View>
                      <View style={{flex:0.2,backgroundColor:"#f4f4f4"}}>
                        <View style={{flex:0.4,alignItems:"center",justifyContent:"center",padding:10,borderBottomColor:"#c8c8c8",borderBottomWidth:1}}>
                          <Text style={{fontSize:12,fontWeight:"bold",color:"lightgrey"}}>Qty</Text>
                          <Text style={{fontSize:22,fontWeight:"bold",color:"black"}}>{this.state.productQty}</Text>
                        </View>
                        <View style={{flex:0.6,backgroundColor:"#f4f4f4"}}/>
                      </View>
                    </View>

                    {/* View Cart View*/}
                    <View style={{flex:0.15,marginTop:10,margin:5}}>
                      <TouchableOpacity style={{flex:1,backgroundColor:"#5a5a5a"}} onPress={this.onViewCart.bind(this)}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                          <Text style={{color:"#FFFFFF",fontWeight:"bold",fontSize:20}}>VIEW CART</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* Continue Shopping View*/}
                    <TouchableOpacity style={{flex:0.15,margin:5}} onPress={this.props.onClose}>
                      <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <Icon name="ios-arrow-back" style={{color: "#5cafef",fontSize:35,marginRight:5}}/>
                        <Text style={{color:"#4facee",fontWeight:"bold",fontSize:20}}> CONTINUE SHOPPING </Text>
                      </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
}
}

export default ModalAddtoCart;
