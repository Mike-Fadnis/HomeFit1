
import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity,Image } from 'react-native';
import styles from "./styles";
import Images from "@theme/images/images";
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body, CardItem, Card,Thumbnail} from "native-base";
const friends=[
    {
        "name":"John",
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Mike",
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"George",
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Friend",
        "image":Images.noimage,
        "description":"description description description"
    }
]

class ModalShowFriends extends Component {
  constructor(props){
    super(props);
    this.state = {
        friendData:friends
    }
  }
  renderData = ({item,index,section}) => {
    return (
        <View style={{flex:1,flexDirection:"row",paddingBottom:15,paddingTop:15,paddingLeft:10}}>
           <View style={{flex:0.35,justifyContent:"center"}}>
               <Image source={item.image} style={{width:100,height:100}}/>
           </View>
           <View style={{flex:0.65,paddingLeft:10,justifyContent:"center"}}>
               <Text style={{fontSize:18,fontWeight:"500"}}>{item.name}</Text>
               <Text style={{fontSize:16,color:"grey"}}>{item.description}</Text>

           </View>
        </View>
    )
  }
  render(){
     return(
        <View style={{ flex: 1 }}>
            <View style={{ height: 20 }}/>
            <View style={{height: 44,backgroundColor: 'white',justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: 'grey', flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=>this.props.onClose()}>
                <Text style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.onDone()}>
                <Text style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>Done</Text>
            </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
            <FlatList
                data={this.state.friendData}
                removeClippedSubviews={true}
                renderItem={this.renderData.bind(this)}
                extraData={this.state}
                keyExtractor={(item, index) => item + index}
            />
            </View>
      </View>
    );
  }
}
export default ModalShowFriends ;
