import React, { Component } from "react";
import { View, TouchableOpacity,Alert,AsyncStorage,ActivityIndicator,Dimensions,FlatList,Image } from "react-native";
import { Container,Header,Title,Content,Text,Button,Icon,Left,Right,Body,Spinner,Item,Label,Input} from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import styles from "./styles";
import Images from "@theme/images/images";
import API from "@utils/ApiUtils";
// var CryptoJS = require("crypto-js");
const window = Dimensions.get("window");

class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_cardDetails:{},
      address:"",
      city:"",
      stateValue:"",
      zipcode:"",
      checkedSame:false,
      checkedDiff:false,
      userData:{},
      radioValue:"1",
      itemId: "1",
      spinner: false,
      isLoading:true,
      backFromPayment:this.props.navigation.getParam("backFromPayment"),
      userType:null,
      cardArray:[],
      keyVTrainer:this.props.navigation.getParam("keyVTrainer"),
      //afterConfirmSucces:this.props.navigation.getParam("afterSucces"),
      getSelectedData:this.props.navigation.getParam("getSelectedData"),
      radioButton: false,
      useNewCard: false

    };
  }
  componentWillMount(){
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      AsyncStorage.getItem("@getUserType:key", (err, user_Type) => {
          if (user_Type === "User"){
            this.setState({
              userType:0
            });
          }
          else {
            this.setState({
              userType:1
            });
          }
          var get_user = JSON.parse(getUserData);
          this.setState({
            userData:get_user
          },()=>{
            this.getCardsList(this.state.userData.id);
          });
       }).done();
     }).done();
  }
  getCardsList(Id){
    API.getCards(Id).then(async (response) => {
      if (response){
        if (response.status === true){
          this.setState({cardArray:response.data,isLoading: false});
        } else {
          this.setState({isLoading: false});
          Alert.alert("Error","");
        }
      } else {
        this.setState({isLoading: false});
        Alert.alert("Error","");
      }
    });
  }
  _onChange(values) {
    this.setState({
      user_cardDetails: values
    },()=>{
      console.log("CREDITCARDDETAILS@@@@ ",this.state.user_cardDetails);
    });
  }
  onRadioButtonPressed(item, index){
    this.setState({itemId: index,useNewCard:false},()=>{
      this.setState({radioButton: true});
      // if (this.state.keyVTrainer){
      //   Alert.alert("Are you sure ?"," Your Payment will be Done after ok pressed ",
      //     [
      //       {text: "OK", onPress: () => this.props.navigation.navigate("ViewTrainer",{keyViewTrainer:"keyViewTrainer", getSelectedData:this.state.getSelectedData})},
      //     ],
      //     { cancelable: false }
      //   );
      // } else {
      //   console.log("skjgfjkhf");
      // }
    });
  }
  onConfirmPayment() {
    if (this.state.useNewCard === false && this.state.radioButton === false){
      alert("You should Choose either existed card or Enter new card");
    } else {
        if (this.state.useNewCard === true){
          this.forAddNewcard();
        } else {
          if (this.state.keyVTrainer){
            Alert.alert("Are you sure ?","you will continue with Payment",
              [
                 {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: "OK", onPress: () => this.props.navigation.navigate("ViewTrainer",{keyViewTrainer:"keyViewTrainer", getSelectedData:this.state.getSelectedData})},
              ],
              { cancelable: false }
            );
          } else{
            Alert.alert("HomeFit")
          }
        }
    }
  }

  forAddNewcard() {
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
        } else if (this.state.user_cardDetails.values.expiry == "" || this.state.user_cardDetails.values.expiry == null) {
          Alert.alert("Exipry Date","Please enter expiry date");
        } else if (this.state.user_cardDetails.values.expiry.length < 5) {
          Alert.alert("Exipry Date","Please enter correct expiry date");
        } else if (this.state.user_cardDetails.values.cvc == "" || this.state.user_cardDetails.values.cvc == null) {
          Alert.alert("CVC","Please enter cvc");
        } else if (this.state.user_cardDetails.values.cvc.length < 3) {
          Alert.alert("CVC","Please enter 3 digits");
        } else if (this.state.user_cardDetails.values.name == "" || this.state.user_cardDetails.values.name == null) {
          Alert.alert("Name","Please enter Name");
        } else if (this.state.user_cardDetails.values.postalCode == "" || this.state.user_cardDetails.values.postalCode == null) {
          Alert.alert("Postal-Code","Please enter Postal-Code");
        }  else if (this.state.address == "" || this.state.address == null) {
          Alert.alert("Address","Please enter Address");
        } else if (this.state.city == "" || this.state.city == null) {
          Alert.alert("City","Please enter City");
        } else if (this.state.stateValue == "" || this.state.stateValue == null) {
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
                this.getCardsList(this.state.userData.id);
                if (this.state.keyVTrainer){
                  Alert.alert(response.message,"",
                    [
                      {text: "OK", onPress: () => this.props.navigation.navigate("ViewTrainer",{keyViewTrainer:"keyViewTrainer", getSelectedData:this.state.getSelectedData})},
                    ],
                    { cancelable: false }
                  );
                } else {
                    Alert.alert(response.message,"");
                }
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
  onCheckedSame(){
    this.setState({
      checkedSame:!this.state.checkedSame
    });
  }
  onCheckedDiff(){
    this.setState({
      checkedDiff:!this.state.checkedDiff
    });
  }
  onBack(){
    if (this.state.backFromPayment){
      this.props.navigation.navigate("TrainerPersonalPage");
    } else {
       this.props.navigation.navigate("ViewTrainer",{keyViewTrainer:"ourundefined"});
    }
  }
  useNewCard(){
    this.setState({useNewCard: true,radioButton: false,itemId:"1"});
  }
  pointEvent(){
    if (this.state.useNewCard === false || this.state.radioButton === true){
      "none";
    } else {
      "auto";
    }
  }
  renderData = ({item,index}) => {
    var cardno = item.card_number.substr(item.card_number.length - 4);
    return (
      <TouchableOpacity onPress={this.onRadioButtonPressed.bind(this,item, index)}>
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
            <Text style={styles.rowTextStyle}>{item.expiry_date} </Text>
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
              <Button style={{width:window.width * 0.15}} transparent onPress={this.onBack.bind(this)}>
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
                {this.state.isLoading === true ? (
                  <Spinner size="large" color="black"/>
                )
                : (<View style={{flex:1}}>
                    <FlatList
                      data={this.state.cardArray}
                      keyExtractor={(x, i) => x.id}
                      extraData={this.state}
                      renderItem={this.renderData.bind(this)}
                      style={{backgroundColor:"#FFFFFF"}}
                    />
                    <TouchableOpacity onPress={this.useNewCard.bind(this)}>
                      <View style={[styles.rowView,{borderColor:this.state.useNewCard === true ? ("#34ace0") : ("#f9f9f9")}]}>
                        <View style={styles.mainRowView}>
                        {this.state.useNewCard === true ? (
                        <Image source={Images.success} style={styles.rowImageStyle} />
                        ) : (
                        <Image source={Images.emptyCircle} style={styles.rowImageStyle} />
                        )}
                        </View>
                        <View style={styles.rowDataView}>
                          <Text> use new card</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                </View>
                )}
              </View>
              <View style={{flex: 1,width: null,height: null,paddingVertical:25}} pointerEvents={this.pointEvent.bind(this)}>
                  <View style={styles.cardView}>
                    <CreditCardInput
                      requiresName
                      requiresPostalCode
                      autoFocus={false}
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
                   <View style={styles.buttonView}>
                     <View style={styles.checkBoxView}>
                       <TouchableOpacity onPress={this.onCheckedSame.bind(this)}>
                       {this.state.checkedSame === true ?
                         (<Image source={Images.checkedIcon} style={styles.iconStyle} />) :
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
                      {this.state.checkedDiff === true ?
                        (<Image source={Images.checkedIcon} style={styles.iconStyle} />) :
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
                {this.state.radioButton === true || this.state.useNewCard === false ? (
                  <View style= {styles.overlay}/>
                ) : (<View/>)}
              </View>
              <Button block style={styles.confirmButtonView}
                onPress={this.onConfirmPayment.bind(this)}>
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
