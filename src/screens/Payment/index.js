import React, { Component } from "react";
import { View, TouchableOpacity,Alert,AsyncStorage,ActivityIndicator,FlatList,Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  ListItem,
  CheckBox,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Spinner,
  Item,
  Label,
  Input
} from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import styles from './styles'
import Images from "@theme/images/images";
import API from "@utils/ApiUtils";
// var CryptoJS = require("crypto-js");

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
class Payment extends Component {
  constructor(props){
    super(props);
    this.state={
      user_cardDetails:{},
      address:'',
      city:'',
      stateValue:'',
      zipcode:'',
      checkedSame:false,
      checkedDiff:false,
      userData:{},
      radioValue:'1',
      itemId: '1',
      spinner: false,
      backFromPayment:this.props.navigation.getParam('backFromPayment')
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('@getUserData:key', (err, getUserData) => {
        var get_user = JSON.parse(getUserData)
        this.setState({
          userData:get_user
        })

     }).done()
  }
  _onChange(values) {
    this.setState({
      user_cardDetails: values
    },()=>{
      console.log("CREDITCARDDETAILS@@@@ ",this.state.user_cardDetails)
    })
  }
  onRadioButtonPressed(item){
    this.setState({itemId: item.id})
  }

  addingCreditCard() {
   console.log("adding card: "+JSON.stringify(this.state.userData))
    if (this.state.user_cardDetails.values === undefined) {
      alert('Please enter card details')
    } else {
      this.setState({spinner: true})
      var cardNumber = this.state.user_cardDetails.values.number
      var cardNumberDetails = cardNumber.replace(/\s/g, '')
      var expiry = this.state.user_cardDetails.values.expiry
      var cardExpiryDate = expiry.split('/')
      var expiryMonth = cardExpiryDate[0]
      var expiryYear = '20' + cardExpiryDate[1]
      var expiryDate= expiryMonth+'/'+expiryYear
      var cardDetailsObject = {
        user_id:this.state.userData.id,
        cardNumber:cardNumberDetails,
        expiryDate:expiryDate,
        cvc:this.state.user_cardDetails.values.cvc,
        cardType:this.state.user_cardDetails.values.type,
        cardHolderName:this.state.user_cardDetails.values.name,
        billingAddress:this.state.address,
        city:this.state.city,
        state:this.state.stateValue,
        zipCode:this.state.user_cardDetails.values.postalCode,
      }
      API.addCardDetails(cardDetailsObject).then(async (response) => {
        this.setState({spinner: false},()=> {
          Alert.alert("Payment",response.message)
        })
      }).catch((error)=>{
      this.setState({spinner:false})
        console.log("Console Error",error);
      });
    }
  }



  // addingCreditCard() {
  //    console.log("adding card: "+JSON.stringify(this.state.userData))
  //     if (this.state.user_cardDetails.values === undefined) {
  //       alert('Please enter card details')
  //     } else {
  //       this.setState({spinner: true})
  //       var cardNumber = this.state.user_cardDetails.values.number
  //       var cardNumberDetails = cardNumber.replace(/\s/g, '')
  //       var expiry = this.state.user_cardDetails.values.expiry
  //       var cardExpiryDate = expiry.split('/')
  //       var expiryMonth = cardExpiryDate[0]
  //       var expiryYear = '20' + cardExpiryDate[1]
  //       var expiryDate= expiryMonth+'/'+expiryYear
  //       var cardNumberCiphertext = CryptoJS.AES.encrypt(cardNumberDetails, 'secret key');
  //       var expiryCiphertext = CryptoJS.AES.encrypt(expiryDate, 'secret key');
  //       var CvcCiphertext = CryptoJS.AES.encrypt(this.state.user_cardDetails.values.cvc, 'secret key');
  //       console.log("cardnumber text "+cardNumberCiphertext.toString()+" expiryCiphertext "+expiryCiphertext.toString()+" CvcCiphertext "+CvcCiphertext.toString());
  //       // var cardDetailsObject = {
  //       //   user_id:this.state.userData.id,
  //       //   cardNumber:cardNumberDetails,
  //       //   expiryDate:expiryDate,
  //       //   cvc:this.state.user_cardDetails.values.cvc,
  //       //   cardType:this.state.user_cardDetails.values.type,
  //       //   cardHolderName:this.state.user_cardDetails.values.name,
  //       //   billingAddress:this.state.address,
  //       //   city:this.state.city,
  //       //   state:this.state.stateValue,
  //       //   zipCode:this.state.user_cardDetails.values.postalCode,
  //       // }
  //       // API.addCardDetails(cardDetailsObject).then(async (response) => {
  //       //   this.setState({spinner: false},()=> {
  //       //     Alert.alert("Payment",response.message)
  //       //   })
  //       // }).catch((error)=>{
  //       // this.setState({spinner:false})
  //       //   console.log("Console Error",error);
  //       // });
  //     }
  // }

  renderData(item){
      var item = item.item
      return(
          <TouchableOpacity onPress={this.onRadioButtonPressed.bind(this,item)}>
            <View style={[styles.rowView,{borderColor:this.state.itemId === item.id ? ("#34ace0"):("#f9f9f9")}]}>
                <View style={styles.mainRowView}>
                  {this.state.itemId === item.id ? (
                    <Image source={Images.success} style={styles.rowImageStyle} />
                  ): (
                    <Image source={Images.emptyCircle} style={styles.rowImageStyle} />
                  )}
                </View>
                <View style={styles.cardView}>
                  {item.cardType === "master" ? (<Image source={Images.masterCard} style={styles.cardImgStyle} />) : item.cardType === "visa" ? (<Image source={Images.visaCard} style={styles.cardImgStyle} />) : (<Image source={Images.amexpCard} style={styles.cardImgStyle} />)}
                </View>
                <View style={styles.rowDataView}>
                  <Text numberOfLines={1} style={styles.cardHolderNameStyle}>{item.name}</Text>
                  <View style={{flexDirection:"row"}}>
                    <Text> ....  ....  ....  </Text>
                    <Text>{item.last}</Text>
                  </View>
                </View>
                <View style={styles.rowTextView}>
                  <Text style={styles.rowTextStyle}>EXP. </Text>
                  <Text style={styles.rowTextStyle}>01/2018 </Text>
                </View>
            </View>
          </TouchableOpacity>
          )
  }
  onChangeAddress(text){
    this.setState({
      address:text
    })
  }
  onChangeCity(text){
    this.setState({
      city:text
    })
  }
  onChangeState(text){
    this.setState({
      stateValue:text
    })
  }
  onChangeZipcode(text){
    this.setState({
      zipcode:text
    })
  }
  onCheckedSame(){
    // alert(this.state.checked)
    this.setState({
      checkedSame:!this.state.checkedSame
    })
  }
  onCheckedDiff(){
    this.setState({
      checkedDiff:!this.state.checkedDiff
    })
  }
  onBack(){
    if (this.state.backFromPayment){
      this.props.navigation.navigate("TrainerPersonalPage")
    } else {
       this.props.navigation.navigate("ViewTrainer")
    }
  }

  render() {

    return (
        <Container style={styles.container}>
            <Header style={styles.headerStyle}>
            <Left style={styles.ham}>
              <Button style={styles.ham}
                transparent
    						onPress={this.onBack.bind(this)}>
    						<Icon name="ios-arrow-back" style={{color: "white"}}/>
              </Button>
            </Left>
              <Body>
                <Title style={styles.title}>Payment</Title>
              </Body>
              <Right />
            </Header>

            <Content style={styles.content}>
                <View style={styles.contentView}>
                  <FlatList
                      data={creditCardArray}
                      keyExtractor={(x, i) => x.id}
                      extraData={this.state}
                      renderItem={this.renderData.bind(this)}
                      style={{backgroundColor:'#FFFFFF'}}
                  />
                </View>
                <View style={styles.cardView}>
                  <CreditCardInput
                    requiresName
                    requiresPostalCode
                    // autoFocus={this.state.focusing}
                    inputStyle={styles.cardInputStyle}
                    validColor={'green'}
                    invalidColor={'red'}
                    placeholderColor={'darkgray'}
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
                 <View style={styles.buttonView}>
                   <View style={styles.checkBoxView}>
                     <TouchableOpacity onPress={this.onCheckedSame.bind(this)}>
                     {this.state.checkedSame === true?
                       (<Image source={Images.checkedIcon} style={styles.iconStyle} />):
                       (<Image source={Images.unChecked} style={styles.iconStyle} />
                     )}
                     </TouchableOpacity>
                   </View>
                   <View style={styles.textView}>
                      <Text style={styles.textStyle}>
                      SHIPPING ADDRESS SAME AS BILLING ADDRESS. In admin panel we need to be able to see that they clicked on this.
                      </Text>
                  </View>
                  <View style={styles.emptyView}/>
                </View>

                <View style={styles.buttonView}>
                  <View style={styles.checkBoxView}>
                    <TouchableOpacity onPress={this.onCheckedDiff.bind(this)}>
                    {this.state.checkedDiff === true?
                      (<Image source={Images.checkedIcon} style={styles.iconStyle} />):
                      (<Image source={Images.unChecked} style={styles.iconStyle} />
                    )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.textView}>
                     <Text style={styles.textStyle}>
                     ADD A DIFFERENT ADDRESS FOR SHIPPING (if they click this then open up 2 more fields one asking for address the other asking for city, state, zipcode).
                     </Text>
                 </View>
                 <View style={styles.emptyView}/>
               </View>

                <Button block style={styles.confirmButtonView}
                  onPress={this.addingCreditCard.bind(this)}>
                  <Text style={styles.confirmButtonText}>CONFIRM PAYMENT</Text>
                </Button>
            </Content>
            {this.state.spinner === true ? (
            <View style={styles.container_spinner}>
              <View style={styles.spinnerView}>
                <ActivityIndicator size="large" color="black"/>
              </View>
            </View>
            ) : null}
        </Container>
      );
  }
}

export default Payment;
