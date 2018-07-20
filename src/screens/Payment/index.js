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
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import styles from './styles'
import Images from "@theme/images/images";
var creditCardArray = [
  {
    id:'1',
    name:'visa',
    last:'.... 4242'
  },
  {
    id:'2',
    name:'master',
    last:'.... 3222'
  },
  {
    id:'3',
    name:'american-express',
    last:'.... 0005'
  },
  {
    id:'4',
    name:'visa',
    last:'.... 5554'
  },
  {
    id:'5',
    name:'master',
    last:'.... 4444'
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
      checkedDiff:false
    }
  }
  _onChange(values) {
    this.setState({
      user_cardDetails: values
    },()=>{
      console.log("CREDITCARDDETAILS@@@@ ",this.state.user_cardDetails)
    })
  }

  addingCreditCard() {
    if (this.state.user_cardDetails.values === undefined) {
      alert('Please enter card details')
    } else {
      alert("CREDITCARD: "+JSON.stringify(this.state.user_cardDetails) +" Address: "+this.state.address+ " City: "+this.state.city+ " State: "+this.state.stateValue+ " Zipcode: "+this.state.zipcode)
    }
  }

  renderData(item){
      var item = item.item
      return(
          <TouchableOpacity>
            <View style={{flex:1, height:50, flexDirection:'row', justifyContent:'space-between', borderBottomColor:'grey', borderWidth:0.5, alignItems:'center'}}>
            <Text style={{color:'black', fontSize:16, fontWeight:'600', marginLeft:5}}>{item.name}</Text>
              <Text style={{color:'black', fontSize:16, fontWeight:'600', marginRight:15}}>{item.last}</Text>
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
    // this.props.navigation.navigate("TrainerPersonalPage")
    this.props.navigation.goBack()
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
                <View style={{flex:1}}>
                  <FlatList
                      data={creditCardArray}
                      keyExtractor={(x, i) => x.id}
                      extraData={this.state}
                      renderItem={this.renderData.bind(this)}
                      style={{backgroundColor:'#FFFFFF'}}
                  />
                </View>
                <View style={{margin:10}}>
                  <CreditCardInput
                    autoFocus
                    requiresName
                    inputStyle={{ fontSize: 16, color: 'black' }}
                    validColor={'green'}
                    invalidColor={'red'}
                    placeholderColor={'darkgray'}
                    onChange={this._onChange.bind(this)}/>
                </View>
                <View style={{marginLeft:20, marginRight:20}}>
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
                  <Item stackedLabel>
                     <Label>Zipcode</Label>
                     <Input placeholder="530013" value={this.state.zipcode} onChangeText={this.onChangeZipcode.bind(this)}/>
                  </Item>
                 </View>
                 <View style={{flex:1,flexDirection:'row', marginTop:10}}>
                   <View style={{flex:0.15, alignItems:'center',justifyContent:'center'}}>
                     <TouchableOpacity onPress={this.onCheckedSame.bind(this)}>
                     {this.state.checkedSame === true?
                       (<Image source={Images.checkedIcon} style={{height:20,width:20, marginLeft:20}} />):
                       (<Image source={Images.unChecked} style={{height:20,width:20, marginLeft:20}} />
                     )}
                     </TouchableOpacity>
                   </View>
                   <View style={{flex:0.8}}>
                      <Text style={{textAlign:'justify', fontSize:14}}>
                      SHIPPING ADDRESS SAME AS BILLING ADDRESS. In admin panel we need to be able to see that they clicked on this.
                      </Text>
                  </View>
                  <View style={{flex:0.05}}/>
                </View>

                <View style={{flex:1,flexDirection:'row', marginTop:10}}>
                  <View style={{flex:0.15, alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.onCheckedDiff.bind(this)}>
                    {this.state.checkedDiff === true?
                      (<Image source={Images.checkedIcon} style={{height:20,width:20, marginLeft:20}} />):
                      (<Image source={Images.unChecked} style={{height:20,width:20, marginLeft:20}} />
                    )}
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:0.8}}>
                     <Text style={{textAlign:'justify', fontSize:14}}>
                     ADD A DIFFERENT ADDRESS FOR SHIPPING (if they click this then open up 2 more fields one asking for address the other asking for city, state, zipcode).
                     </Text>
                 </View>
                 <View style={{flex:0.05}}/>
               </View>

                <Button block style={{backgroundColor:'#009FDB', margin:20}}
                  onPress={this.addingCreditCard.bind(this)}>
                  <Text style={{fontWeight:'700'}}>CONFIRM PAYMENT</Text>
                </Button>
            </Content>
        </Container>
      );
  }
}

export default Payment;
