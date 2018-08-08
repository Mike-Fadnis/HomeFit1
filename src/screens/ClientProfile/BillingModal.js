import React, { Component } from "react";
import { Text, View,  Alert, Modal, TouchableOpacity, AsyncStorage, Image, FlatList} from "react-native";
import {Spinner,Item,Input,Label,Button} from "native-base";
// import { CreditCardInput } from "react-native-credit-card-input";

import CardDetailsModal from "./CardDetailsModal";
import ModalAddCard from "./ModalAddCard";
import styles from "./styles";
import Images from "@theme/images/images";
import API from "@utils/ApiUtils";

class BillingModal extends Component {
  constructor(){
    super();
    this.state = {
      itemId: "1",
      userType: null,
      cardsList:[],
      spinner: true,
      noCards: false,
      editCardModal: false,
      modalAddCard: false,
      cardDetails: null,
      user_cardDetails:{},
      address:"",
      city:"",
      stateValue:"",
      zipcode:"",
    };
    this.onClose = this.onClose.bind(this);
    this.onCloseModalCardDetails = this.onCloseModalCardDetails.bind(this);
    this.onAddcard = this.onAddcard.bind(this)
  }
  componentWillMount(){
    this.fetchData();
  }
  fetchData(){
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var get_user = JSON.parse(getUserData);
      this.setState({userData:get_user},()=>{
        this.getCardsList(this.state.userData.id);
      });
     }).done();
  }
  getCardsList(Id){
    API.getCards(Id).then(async (response) => {
      if (response) {
        if (response.status){
          this.setState({cardsList: response.data,spinner:false});
        } else {
            this.setState({noCards: true,spinner:false});
        }
      } else {
        this.setState({spinner:false});
        Alert.alert("Error");
      }
    });
  }
  onClose(){
    this.props.onClose()
  }
  onCloseModalCardDetails(){
    this.setState({editCardModal: false,spinner:true},()=>{
      this.getCardsList(this.state.userData.id);
    })
  }
  onRadioButtonPressed(item, index){
    this.setState({itemId: index},()=>{
        this.onCardDetails(item);
    });
  }
  onCardDetails(item){
    this.setState({cardDetails : item},()=>{
      this.setState({editCardModal:true});
    });
  }
  onAddcard(){
    this.setState({modalAddCard: true})
  }
  getDataObj(){
    this.setState({modalAddCard: false},()=>{
      this.fetchData();
    })
  }
  onButtonCloseAddcard(){
    this.setState({modalAddCard: false},()=>{
      this.getCardsList(this.state.userData.id);
    });
  }
  renderData = ({item, index}) => {
      var cardno = item.card_number.substr(item.card_number.length - 4);
      return (
        <TouchableOpacity style={{flex:1}} onPress={this.onRadioButtonPressed.bind(this,item,index)}>
          <View style={[styles.rowView,{borderColor:this.state.itemId === index ? ("#34ace0") : ("#f9f9f9")}]}>
            <View style={styles.radioIconView}>
              {this.state.itemId === index ? (
                <Image source={Images.success} style={styles.rowImageStyle} />
              ) : (
                <Image source={Images.emptyCircle} style={styles.rowImageStyle} />
              )}
            </View>
            <View style={styles.cardView}>
              {item.card_type === "master-card" ? (<Image source={Images.masterCard} style={styles.cardImgStyle} />) : item.card_type === "visa" ? (<Image source={Images.visaCard} style={styles.cardImgStyle} />) : (<Image source={Images.amexpCard} style={styles.cardImgStyle} />)}
            </View>
            <View style={styles.rowDataView}>
              <Text numberOfLines={1} style={styles.cardHolderNameStyle}>{item.card_holder_name}</Text>
              <View style={{flexDirection:"row"}}>
                <Text> ....  ....  ....  </Text>
                <Text>{cardno}</Text>
              </View>
            </View>
            <View style={styles.rowTextView}>
              <Text style={styles.rowTextStyle}>EXP. </Text>
              <Text style={styles.rowTextStyle}>{item.expiry_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
  render(){
      return (
        <View style={styles.modalContainer}>
          <View style={styles.BillingDetails}>
            <View style={{height:20}}/>
            <View style={styles.modalHeaderStyle}>
              <TouchableOpacity onPress={this.onClose}><Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Close</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.onAddcard}><Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Add</Text></TouchableOpacity>
            </View>
            <View style={styles.cardDetails}>
              {this.state.spinner ? (
                <Spinner color="black" />
              ) :
               this.state.noCards ? (
                 <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                     <Text style={{textAlign:"center"}}>{"No card information found for this user."}</Text>
                 </View>
               ) : (
                <FlatList
                  data={this.state.cardsList}
                  keyExtractor={(x, i) => x.id}
                  extraData={this.state}
                  renderItem={this.renderData.bind(this)}
                  style={{backgroundColor:"#FFFFFF"}}
                />
              )}
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.editCardModal}>
              <CardDetailsModal
                onClose={this.onCloseModalCardDetails.bind(this)}
                cardDetails={this.state.cardDetails}
              />
          </Modal>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalAddCard}>
              <ModalAddCard
                getDataObj={this.getDataObj.bind(this)}
                onClose={this.onButtonCloseAddcard.bind(this)}
              />
          </Modal>
        </View>
      );
  }
}

export default BillingModal;
