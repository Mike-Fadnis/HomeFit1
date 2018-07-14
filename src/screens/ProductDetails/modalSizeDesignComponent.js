import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
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
                    <View style={styles.flatlistContainer}>
                        <View style={styles.sizeTextView}>
                            <Text style={styles.sizeTextStyle}>{item.size}</Text>
                        </View>
                        <View style={styles.flatlistMiddleView}>
                            {/*<Text style={{fontWeight:"bold",marginLeft:5}}>{item.servings}</Text>*/}
                        </View>
                        <View style={styles.priceContainer}>
                            <View style={styles.priceSubContainer}>
                                <View style={styles.priceView}>
                                    {/*<Text style={{fontWeight:"bold"}}> ${item.price}</Text>*/}
                                </View>
                                <View style={styles.radioButtonView}>
                                    {this.state.itemId === item.id ? (
                                            <Image source={Images.radioCheck} style={styles.radioButtonStyle} />
                                        ): (
                                            <Image source={Images.radioUncheck} style={styles.radioButtonStyle} />
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
                            <View style={styles.headerSubView}>
                                <TouchableOpacity
                                    style={styles.modalbackActionView}
                                    onPress={this.props.onModalBack}>
                                    <View style={styles.modalbackActionSubView}>
                                      <Icon name="ios-arrow-back" style={{color: "black",fontSize:32}}/>
                                      <View style={styles.headerTextView}>
                                        <Text style={{fontSize:18}}>Size</Text>
                                      </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.subHeaderView}>
                        <View style={styles.availableSizeTextView}>
                            <Text style={styles.availableSizeTextStyle}>AVAILABLE SIZES: </Text>
                        </View>
                        <View style={styles.subHeaderMiddleView}>
                            {/*<Text style={{color:"white",fontWeight:"bold",marginLeft:5}}>SERVINGS: </Text>*/}
                        </View>
                        <View style={styles.priceView}>
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
const styles: any = StyleSheet.create({
  container:{flex:1},
  statusBarView:{height:20,backgroundColor:'lightgrey'},
  headerView:{height:44,backgroundColor:'white'},
  headerSubView:{flex:1,flexDirection:"row"},
  modalbackActionView:{flex:0.25,justifyContent:'center',alignItems:'flex-start'},
  modalbackActionSubView:{flexDirection:"row",marginLeft:5},
  headerTextView:{marginLeft:10,alignItems:"center",justifyContent:"center"},
  subHeaderView:{flex:0.05,backgroundColor:"black",flexDirection:"row"},
  availableSizeTextView:{flex:0.5,alignItems:"flex-start",justifyContent:"center"},
  availableSizeTextStyle:{color:"white",fontWeight:"bold",marginLeft:5},
  subHeaderMiddleView:{flex:0.25,alignItems:"flex-start",justifyContent:"center"},
  priceView:{flex:0.25,alignItems:"flex-start",justifyContent:"center"},
  flatlistContainer:{flex:1,flexDirection:"row",borderBottomWidth:1,borderBottomColor:"black",paddingTop:20,paddingBottom:20},
  sizeTextView:{flex:0.35,alignItems:"flex-start",justifyContent:"center"},
  sizeTextStyle:{fontWeight:"bold",marginLeft:5},
  flatlistMiddleView:{flex:0.3,alignItems:"flex-start",justifyContent:"center"},
  priceContainer:{flex:0.35,alignItems:"flex-start",justifyContent:"center"},
  priceSubContainer:{flex:1,flexDirection:"row",alignItems:'center',justifyContent:'center'},
  priceView:{flex:0.7},
  radioButtonView:{flex:0.3},
  radioButtonStyle:{height:25,width:25}
})

export default modalSizeDesignComponent;
