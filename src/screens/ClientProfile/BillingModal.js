import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform, FlatList} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body} from "native-base";
import styles from "./styles";
import Images from "@theme/images/images";

class BillingModal extends Component {
  constructor(){
    super()
    this.state ={
      itemId: "1"
    }
  }
  renderData(item){
      var item = item.item
      return(
          <TouchableOpacity onPress={this.onRadioButtonPressed.bind(this,item)}>
            <View style={{flexDirection:"row",margin:5,padding:5, height:70,backgroundColor:"#f9f9f9",borderRadius:5,borderColor:this.state.itemId === item.id ? ("#34ace0"):("#f9f9f9"), borderWidth:2, alignItems:'center'}}>
                <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                  {this.state.itemId === item.id ? (
                    <Image source={Images.success} style={{height:20,width:20}} />
                  ): (
                    <Image source={Images.emptyCircle} style={{height:20,width:20}} />
                  )}
                </View>
                <View style={{flex:0.2,backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
                  {item.cardType === "master" ? (<Image source={Images.masterCard} style={{height:40,width:50}} />) : item.cardType === "visa" ? (<Image source={Images.visaCard} style={{height:20,width:30}} />) : (<Image source={Images.amexpCard} style={{height:20,width:30}} />)}
                </View>
                <View style={{flex:0.7,paddingLeft:20,alignItems:"flex-start",justifyContent:"center"}}>
                  <Text numberOfLines={1} style={styles.cardHolderNameStyle}>{item.name}</Text>
                  <View style={{flexDirection:"row"}}>
                    <Text> ....  ....  ....  </Text>
                    <Text>{item.last}</Text>
                  </View>
                </View>
            </View>
          </TouchableOpacity>
          )
  }
  onRadioButtonPressed(item){
    this.setState({itemId: item.id})
  }
  render(){
      return(
        <View style={styles.modalContainer}>
          <View style={styles.BillingDetails}>
            <View style={styles.modalHeaderStyle}>
              <TouchableOpacity style={{flex:0.5,alignItems:"flex-start",padding:10}}><Text style={{color:"#009FDB"}}>Edit</Text></TouchableOpacity>
              <TouchableOpacity style={{flex:0.5,alignItems:"flex-end",padding:10}}><Text style={{color:"#009FDB"}}>Add</Text></TouchableOpacity>
            </View>
            <View style={styles.cardDetails}>
              <FlatList
                data={creditCardArray}
                keyExtractor={(x, i) => x.id}
                extraData={this.state}
                renderItem={this.renderData.bind(this)}
                style={{backgroundColor:'#FFFFFF'}}
              />
            </View>
            <View style={styles.modalFooterStyle}>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.cancel} onPress={this.props.onClose}>
                  <View> <Text style={{color:"#009FDB"}}>Cancel </Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.done} onPress={this.props.onClose}>
                  <View> <Text style={{color:"#009FDB"}}>Done </Text></View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
  }
}

export default BillingModal;



var creditCardArray = [
  {
    id:'1',
    name:'ABCDABCD ABCD JOHN',
    last:'4242',
    cardType: "visa"
  },
  {
    id:'2',
    name:'EFGHEFGH EFGH JOHN',
    last:'3222',
    cardType: "master"
  },
  {
    id:'3',
    name:'IJKLIJKL IJKL JOHN',
    last:'0005',
    cardType: "american-express"
  },
  {
    id:'4',
    name:'MNOPMNOP MNOP JOHN',
    last:'5554',
    cardType: "visa"
  },
  {
    id:'5',
    name:'QRSTQRST QRST JOHN',
    last:'4444',
    cardType: "master"
  }
]
