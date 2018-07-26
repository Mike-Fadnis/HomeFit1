
import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity,Image } from 'react-native';
import styles from "./styles";
import Images from "@theme/images/images";
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body, CardItem, Card,Thumbnail} from "native-base";
const friends=
    {
        "name":"John",
        "image":Images.noimage,
        "description":"description description description description"
    };
    const PurchasedProducts =[
        {
            "name": "Product 1",
            "price":"$1.00",
            "description":"Description smaple hereo",
            "image":Images.noimage,
        },
        {
            "name": "Product 2",
            "price":"$5.00",
            "description":"Description smaple hereo",
            "image":Images.noimage,
        }
    
    ]
class ModalFriendDetails extends Component {
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
               <Text style={{fontSize:15,color:"grey"}}>Price: {item.price}</Text>
           </View>
        </View>
    )
  }
  render(){
     return(
        <Container style={{ flex: 1 }}>
            <View style={{ height: 20 }}/>
            <View style={{height: 44,backgroundColor: 'white',justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: 'grey', flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=>this.props.onClose()}>
                <Text style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.onDone()}>
                <Text style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>Done</Text>
            </TouchableOpacity>
            </View>
            <Content style={{ flex: 1,marginTop:15,marginBottom:15}}>
                <Image source={friends.image} style={{width:100,height:100,alignSelf:"center"}}/>
                <Text style={{fontSize:18,fontWeight:"800",marginTop:10,textAlign:"center"}}>{friends.name}</Text>
                <View>
                <Text style={{fontSize:18,fontWeight:"500",marginTop:10,padding:10,backgroundColor:"lightgrey"}}>{"Supplements:"}</Text>
                <FlatList
                    renderItem={this.renderData.bind(this)}
                    data={PurchasedProducts}
                    horizontal
                   // ItemSeparatorComponent={() => <View style={{marginLeft:10,width:windowSize.width,height: 1.5, backgroundColor: 'grey' } } /> }
                    keyExtractor={(item, index) => item + index}
                />
                </View>
                <View>
                <Text style={{fontSize:18,fontWeight:"500",marginTop:10,padding:10,backgroundColor:"lightgrey"}}>{"Trainers:"}</Text>
                <FlatList
                    renderItem={this.renderData.bind(this)}
                    data={PurchasedProducts}
                   // ItemSeparatorComponent={() => <View style={{marginLeft:10,width:windowSize.width,height: 1.5, backgroundColor: 'grey' } } /> }
                    keyExtractor={(item, index) => item + index}
                />
                </View>
            </Content>
      </Container>
    );
  }
}
export default ModalFriendDetails ;
