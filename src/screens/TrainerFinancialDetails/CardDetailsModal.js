import React, {Component} from "react";
import {View,TouchableOpacity} from "react-native";
import {Container,Content,Text,Item,Input,Label} from "native-base";
import Images from "@theme/images/images";
import { CreditCardInput } from "react-native-credit-card-input";
import styles from "./styles";

export default class CardDetailsModal extends Component {
  constructor(props){
      super(props);
      this.state = {
          user_cardDetails:{},
          address:"",
          city:"",
          stateValue:"",
          zipcode:"",
      };
  }
  componentWillMount(){
      console.log("cardDetails",this.props.cardDetails);
      if (this.props.cardDetails){
        var carddetails = {
            cvc: this.props.cardDetails.cvc,
            expiry:this.props.cardDetails.expiry_date,
            name:this.props.cardDetails.card_holder_name,
            number: this.props.cardDetails.card_number,
            postalCode: this.props.cardDetails.zip_code,
            type: this.props.cardDetails.card_type
        };
        this.setState({
          user_cardDetails: carddetails,
          address:this.props.cardDetails.billing_address,
          city: this.props.cardDetails.city,
          stateValue: this.props.cardDetails.state,
         // zip_code:this.props.cardDetails.zip_code
        },()=>{
            console.log("hjj",this.state.user_cardDetails);
        });
      }
  }
  _onChange(values) {
      console.log("values",values);
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
    onChangeZipcode(text){
      this.setState({
        zipcode:text
      });
    }
    onPropsModalDone(){
      this.props.onClose();
    }
    componentDidMount(){
      this.CCInput.setValues(this.state.user_cardDetails);
    }
  render(){
      return (
          <Container>
          <View style={{ height: 20 }}/>
              <View style={{height: 44,backgroundColor: "white",justifyContent:"space-between",alignItems:"center", paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: "grey", flexDirection: "row"}}>
                  <TouchableOpacity onPress={this.props.onClose}>
                  <Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPropsModalDone.bind(this)}>
                  <Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Done</Text>
                  </TouchableOpacity>
              </View>
              <Content>
               <View style={styles.creditcardView}>
                  <CreditCardInput
                   ref={(c) => this.CCInput = c}
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
                  </View>
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
              </Content>
          </Container>
      );
  }
}
