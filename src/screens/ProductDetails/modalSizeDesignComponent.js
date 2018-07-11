import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity,Image } from "react-native";
import {Icon, List, ListItem, Left, Body, Right, Radio} from "native-base";
import Images from "@theme/images/images";

class modalSizeDesignComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            itemId: "",
            newresponseDuplicateArray: []
        };
    }
    componentWillMount(){
      this.setState({
        newresponseDuplicateArray: this.props.responseDuplicateArray
      })
    }
    onSizeClosed(item){
        this.setState({
            itemId:item.id
        })
        this.props.onClose(item);
        //this.props.onSelect();
        this.props.sendItem(item);
    }
    renderData(item){
        var item= item.item;
        return(
                <TouchableOpacity onPress={this.onSizeClosed.bind(this, item)}>
                    <View style={{flex:1,flexDirection:"row",borderBottomWidth:1,borderBottomColor:"black",paddingTop:20,paddingBottom:20}}>
                        <View style={{flex:0.35,alignItems:"flex-start",justifyContent:"center"}}>
                            <Text style={{fontWeight:"bold",marginLeft:5}}>{item.size}</Text>
                        </View>
                        <View style={{flex:0.3,alignItems:"flex-start",justifyContent:"center"}}>
                            {/*<Text style={{fontWeight:"bold",marginLeft:5}}>{item.servings}</Text>*/}
                        </View>
                        <View style={{flex:0.35,alignItems:"flex-start",justifyContent:"center"}}>
                            <View style={{flex:1,flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
                                <View style={{flex:0.7}}>
                                    {/*<Text style={{fontWeight:"bold"}}> ${item.price}</Text>*/}
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
            <View style={{flex:1}}>
                <View style={{height:20,backgroundColor:'lightgrey'}}/>
                    <View style={{height:44,backgroundColor:'white'}}>
                        <View style={{flex:1,flexDirection:"row"}}>
                            <View style={{flex:1,flexDirection:"row"}}>
                                <TouchableOpacity
                                    style={{flex:0.25,justifyContent:'center',alignItems:'flex-start'}}
                                    onPress={this.props.onModalBack}>
                                    <View style={{flexDirection:"row",marginLeft:5}}>
                                      <Icon name="ios-arrow-back" style={{color: "black",fontSize:32}}/>
                                      <View style={{marginLeft:10,alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{fontSize:18}}>Size</Text>
                                      </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:0.05,backgroundColor:"black",flexDirection:"row"}}>
                        <View style={{flex:0.35,alignItems:"flex-start",justifyContent:"center"}}>
                            <Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>AVAILABLE SIZES: </Text>
                        </View>
                        <View style={{flex:0.3,alignItems:"flex-start",justifyContent:"center"}}>
                            {/*<Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>SERVINGS: </Text>*/}
                        </View>
                        <View style={{flex:0.35,alignItems:"flex-start",justifyContent:"center"}}>
                            {/*<Text style={{color:"white",fontWeight:"bold"}}>PRICE: </Text>*/}
                        </View>
                    </View>
                    <View style={{flex:1}}>   
                        <List>
                            <FlatList
                                data={this.state.newresponseDuplicateArray}
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

export default modalSizeDesignComponent;
