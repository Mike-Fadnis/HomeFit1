import React, { Component } from "react";
import { View,Text,StyleSheet,Alert,ScrollView,TouchableWithoutFeedback,AsyncStorage,ActivityIndicator,Dimensions,TouchableOpacity } from "react-native";
import { Container,Content,Item,Label,Input,Button} from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
var dismissKeyboard = require("dismissKeyboard");

import Images from "@theme/images/images";
import API from "@utils/ApiUtils";

export default class ModalAddCard extends Component {
  constructor(){
    super();
    this.state = {
      user_cardDetails:{},
      address:"",
      city:"",
      stateValue:"",
      userData:{},
      spinner: false
    };
    this.onConformalertOk = this.onConformalertOk.bind(this);
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
        //  this.getCardsList(this.state.userData.id);
        });
     }).done();
  }
  _onChange(values) {
    this.setState({
      user_cardDetails: values
    },()=>{
      console.log("CREDITCARDDETAILS@@@@ ",this.state.user_cardDetails);
    });
  }
  onChangeAddress(text){
    this.setState({
      address:text
    });
  }
  onChangeCity(text){
    this.setState({
      city:text
    });
  }
  onChangeState(text){
    this.setState({
      stateValue:text
    });
  }
  onConformalertOk(){
    this.props.getDataObj();
  }
  addingCreditCard() {
    if (this.state.user_cardDetails.values === undefined) {
      Alert.alert("Please enter card details","");
    } else {
      var cardNumber = this.state.user_cardDetails.values.number;
      var cardNumberDetails = cardNumber.replace(/\s/g, "");
      // var expiry = this.state.user_cardDetails.values.expiry
        if (cardNumber === "" || cardNumber === null) {
          Alert.alert("Card Number","Please enter card number");
        } else if (cardNumber.length < 16) {
          Alert.alert("Card Number","Please enter 16 digits");
        } else if (this.state.user_cardDetails.values.expiry === "" || this.state.user_cardDetails.values.expiry === null) {
          Alert.alert("Exipry Date","Please enter expiry date");
        } else if (this.state.user_cardDetails.values.expiry.length < 5) {
          Alert.alert("Exipry Date","Please enter correct expiry date");
        } else if (this.state.user_cardDetails.values.cvc === "" || this.state.user_cardDetails.values.cvc === null) {
          Alert.alert("CVC","Please enter cvc");
        } else if (this.state.user_cardDetails.values.cvc.length < 3) {
          Alert.alert("CVC","Please enter 3 digits");
        } else if (this.state.user_cardDetails.values.name === "" || this.state.user_cardDetails.values.name === null) {
          Alert.alert("Name","Please enter Name");
        } else if (this.state.user_cardDetails.values.postalCode === "" || this.state.user_cardDetails.values.postalCode === null) {
          Alert.alert("Postal-Code","Please enter Postal-Code");
        }  else if (this.state.address === "" || this.state.address === null) {
          Alert.alert("Address","Please enter Address");
        } else if (this.state.city === "" || this.state.city === null) {
          Alert.alert("City","Please enter City");
        } else if (this.state.stateValue === "" || this.state.stateValue === null) {
          Alert.alert("State","Please enter State");
        } else {
        this.setState({spinner: true});
        var cardDetails = {
          user_id:this.state.userData.id,
          user_type:this.state.userType,
          cardNumber:cardNumberDetails,
          expiryDate:this.state.user_cardDetails.values.expiry,//06/20
          cvc:this.state.user_cardDetails.values.cvc,
          cardType:this.state.user_cardDetails.values.type,
          cardHolderName:this.state.user_cardDetails.values.name,
          billingAddress:this.state.address,
          city:this.state.city,
          state:this.state.stateValue,
          zipCode:this.state.user_cardDetails.values.postalCode,
        };
        var cardDetailsObject = JSON.stringify(cardDetails);
        API.addCardDetails(cardDetailsObject).then(async (response) => {
          if (response){
            if (response.status === true){
              this.setState({spinner: false,user_cardDetails:{}},()=>{
                Alert.alert(response.message,"",[{
                  "text": "ok", onPress: this.onConformalertOk
                }]);
              });
            } else {
              this.setState({spinner: false});
                Alert.alert("Error","");
            }
          } else {
            this.setState({spinner: false});
            Alert.alert("Error","");
          }
        });
      }
    }
  }
  render() {
    return (
    <Container>
      <View style={styles.container}>
        <View style={{ height: 20 }}/>
        <View style={{height: 44,backgroundColor: "white",justifyContent:"center",alignItems:"flex-end", paddingRight: 10, borderBottomWidth: 1, borderBottomColor: "grey"}}>
          <TouchableOpacity onPress={this.props.onClose}>
            <Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainView}>
          <Content>
            <View style={styles.cardView}>
              <CreditCardInput
                requiresName
                requiresPostalCode
                // autoFocus={this.state.focusing}
                inputStyle={styles.cardInputStyle}
                validColor={"green"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}
                cardImageFront={Images.cardFront}
                cardImageBack={Images.cardBack}
                onFocus={this._onFocus}
                onChange={this._onChange.bind(this)}/>

                <View style={styles.inputView}>
                  <Item stackedLabel>
                    <Label>Billing Address</Label>
                    <Input placeholder="321/A" value={this.state.address} onChangeText={this.onChangeAddress.bind(this)}/>
                  </Item>
                  <Item stackedLabel>
                    <Label>City</Label>
                    <Input placeholder="VSP" value={this.state.city} onChangeText={this.onChangeCity.bind(this)}/>
                  </Item>
                  <Item stackedLabel>
                    <Label>State</Label>
                    <Input placeholder="AP" value={this.state.stateValue} onChangeText={this.onChangeState.bind(this)}/>
                  </Item>
                </View>
                <Button full style={styles.confirmButtonView}
                  onPress={this.addingCreditCard.bind(this)}>
                    <Text style={styles.confirmButtonText}>CONFIRM PAYMENT</Text>
                </Button>
            </View>
          </Content>
        </View>

        {this.state.spinner === true ? (
        <View style={styles.container_spinner}>
          <View style={styles.spinnerView}>
            <ActivityIndicator size="large" color="black"/>
          </View>
        </View>
        ) : null}
      </View>
</Container>
    );
  }
}
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    justifyContent:"center",
  },
  mainView:{
    flex:1,
    backgroundColor:"white",
    marginTop:10
  },
  cardView:{
    flex:1,
    backgroundColor:"white",
  },
  inputView:{marginLeft:20, marginRight:20},
  container_spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.72)"
  },
  spinnerView: {
    height: window.width / 3,
    width: window.width / 3,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  confirmButtonView:{backgroundColor:"#009FDB", margin:20},
  confirmButtonText:{fontSize:18,fontWeight:"700",color:"white"},

});
