import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import {Icon, List, ListItem, Left, Body, Right, Thumbnail, Button} from "native-base";
import Images from "@theme/images/images";

class modalFlavourDesignComponent extends Component {
    constructor() {
        super();
        this.state={
            itemId: "" ,
            newArray: []
        };
    }
    onSizeClosed(item){
        this.setState({
            itemId:item.id
        })
        this.props.onClose();
        this.props.sendFlavourItem(item);
    }
  componentWillMount(){
    console.log ("1100:  ",  JSON.stringify(this.props.flavoursArray))
    this.setState({
      newArray: this.props.flavoursArray
    })
  }
    renderData(item){
        var item = item.item
        return(
            <TouchableOpacity onPress={this.onSizeClosed.bind(this, item)}>
                <View style={styles.flatlistContainer}>
                    <View style={styles.flavourTextView}>
                        <Text style={styles.flavourTextStyle}>{item.flavour_name}</Text>
                    </View>
                    <View style={styles.flatlistMiddleView}>
                        {/*<Text style={{fontWeight:"bold",marginLeft:5}}>{item.servings}</Text>*/}
                    </View>
                    <View style={styles.priceContainer}>
                        <View style={{flex:1,flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
                            <View style={{flex:0.7}}>
                                <Text style={{fontWeight:"bold",fontSize:18, color: "#4eaaed"}}> ${item.price}</Text>
                            </View>
                            <View style={{flex:0.3}}>
                                {this.state.itemId === item.id ? (
                                        <Image source={Images.radioCheck} style={{height:25,width:25}} />
                                    ): (
                                        <Image source={Images.radioUncheck} style={{height:25,width:25}} />
                                    )}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            )
    }
    render() {
    return (
            <View style={styles.container}>
                <View style={styles.statusBarView}/>
                    <View style={styles.headerView}>
                        <View style={styles.headerSubView}>
                            <TouchableOpacity
                                style={styles.modalbackActionView}
                                onPress={this.props.onClose}>
                                <View style={styles.modalbackActionSubView}>
                                  <Icon name="ios-arrow-back" style={{color: "black",fontSize:32}}/>
                                  <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                                    <Text style={{fontSize:18}}>Flavour</Text>
                                  </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.subHeaderView}>
                        <View style={styles.availableFlavourTextView}>
                            <Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>AVAILABLE OPTIONS: </Text>
                        </View>
                        <View style={styles.subHeaderMiddleView}>
                            {/*<Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>SERVINGS: </Text>*/}
                        </View>
                        <View style={styles.priceView}>
                            <Text style={{color:"white",fontWeight:"bold"}}>PRICE: </Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <List>
                            <FlatList
                                data={this.state.newArray}
                                keyExtractor={(x, i) => x.id}
                                extraData={this.state}
                                renderItem={this.renderData.bind(this)}
                                style={{backgroundColor:'#FFFFFF'}}
                            />
                        </List>
                    </View>
            </View>
        )
  }
}
const styles: any = StyleSheet.create({
  container:{flex:1},
  statusBarView:{height:20,backgroundColor:'lightgrey'},
  headerView:{height:44,backgroundColor:'white'},
  headerSubView:{flex:1,flexDirection:"row"},
  modalbackActionView:{flex:0.25,justifyContent:'center',alignItems:'flex-start'},
  modalbackActionSubView:{flexDirection:"row",marginLeft:5},
  subHeaderView:{flex:0.05,backgroundColor:"black",flexDirection:"row"},
  availableFlavourTextView:{flex:0.4,alignItems:"flex-start",justifyContent:"center"},
  subHeaderMiddleView:{flex:0.25,alignItems:"flex-start",justifyContent:"center"},
  priceView:{flex:0.35,alignItems:"flex-start",justifyContent:"center"},
  flatlistContainer:{flex:1,flexDirection:"row",borderBottomWidth:1,borderBottomColor:"black",paddingTop:20,paddingBottom:20},
  flavourTextView:{flex:0.4,alignItems:"flex-start",justifyContent:"center"},
  flavourTextStyle:{fontSize:18,fontWeight:"bold",marginLeft:5},
  flatlistMiddleView:{flex:0.25,alignItems:"flex-start",justifyContent:"center"},
  priceContainer:{flex:0.35,alignItems:"center",justifyContent:"center"}
})

export default modalFlavourDesignComponent;
