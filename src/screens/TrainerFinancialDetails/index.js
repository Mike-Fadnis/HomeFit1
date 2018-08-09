import React, { Component } from "react";
import { View, TouchableOpacity, FlatList,Text,Image, Modal,AsyncStorage,Alert } from "react-native";
import {Container,Header,Title,Content,Button,Icon,Left,Right,Body,Spinner} from "native-base";

import styles from "./styles";
import Images from "@theme/images/images";
import ModalAddCard from "./ModalAddCard";
import CardDetailsModal from "./CardDetailsModal";
import API from "@utils/ApiUtils";

class TrainerFinancialDetails extends Component {
  constructor(){
    super();
    this.state = {
      userData:[],
      modalAddCard: false,
      cardsList:[],
      cardDetails:null,
      cardDetailsModal:false,
      noCards: false,
      spinner: true
    };
  }
  componentWillMount(){
    this.fetchData();
  }
  fetchData(){
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
        var get_user = JSON.parse(getUserData);
        this.setState({
          userData:get_user
        },()=>{
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
  onButtonAddCard(){
    this.setState({modalAddCard: true});
  }
  onButtonCloseAddcard(){
    this.setState({modalAddCard: false},()=>{
      this.getCardsList(this.state.userData.id);
    });
  }
  onRadioButtonPressed(item,index){
    this.setState({itemId: index},()=>{
        this.onCardDetails(item);
    });
  }
  onCardDetails(item){
    this.setState({cardDetails : item},()=>{
      this.setState({cardDetailsModal:true});
    });
  }
  onClose(){
    this.setState({ cardDetailsModal:false,spinner:true },()=>{
      this.getCardsList(this.state.userData.id)
    });
  }
  getDataObj(){
    this.setState({modalAddCard: false},()=>{
      this.fetchData();
    })
  }
  renderData = ({item, index}) => {
      var cardno = item.card_number.substr(item.card_number.length - 4);
      return (
        <TouchableOpacity onPress={this.onRadioButtonPressed.bind(this,item,index)}>
          <View style={[styles.rowView,{borderColor:this.state.itemId === index ? ("#34ace0") : ("#f9f9f9")}]}>
            <View style={styles.mainRowView}>
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
  render() {
    return (
      <Container style={styles.container}>
         <Header style={styles.headerStyle}>
          <Left style={styles.ham}>
            <Button transparent onPress={() => this.props.navigation.navigate("TrainerPersonalPage")}>
              <Icon name="ios-arrow-back" style={{color: "white"}}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Billing Info</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.onButtonAddCard.bind(this)}>
              <Image source={Images.add} style={styles.addIconStyle} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content padder>
          <View style={styles.contentView}>
            {this.state.spinner ? (
              <Spinner color="black" />
            ) :
             this.state.noCards ? (
               <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                   <Text style={{textAlign:"center"}}>{"No card information found for this user."}</Text>
               </View>
             ) :
            <FlatList
              data={this.state.cardsList}
              keyExtractor={(x, i) => x.card_primary_id}
              extraData={this.state}
              renderItem={this.renderData.bind(this)}
              style={{backgroundColor:"#FFFFFF"}}
            />
            }
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalAddCard}>
              <ModalAddCard
                getDataObj={this.getDataObj.bind(this)}
                onClose={this.onButtonCloseAddcard.bind(this)}
              />
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.cardDetailsModal}>
              <CardDetailsModal
                onClose={this.onClose.bind(this)}
                cardDetails={this.state.cardDetails}
              />
          </Modal>
        </Content>
      </Container>
    );
  }
}

export default TrainerFinancialDetails;

// var creditCardArray = [
//   {
//     id:"1",
//     name:"ABCDABCD ABCD JOHN",
//     last:"4242",
//     cardType: "visa"
//   },
//   {
//     id:"2",
//     name:"EFGHEFGH EFGH JOHN",
//     last:"3222",
//     cardType: "master"
//   },
//   {
//     id:"3",
//     name:"IJKLIJKL IJKL JOHN",
//     last:"0005",
//     cardType: "american-express"
//   },
//   {
//     id:"4",
//     name:"MNOPMNOP MNOP JOHN",
//     last:"5554",
//     cardType: "visa"
//   },
//   {
//     id:"5",
//     name:"QRSTQRST QRST JOHN",
//     last:"4444",
//     cardType: "master"
//   }
// ];
