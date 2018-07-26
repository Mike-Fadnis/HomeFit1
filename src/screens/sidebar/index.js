import React, { Component } from "react";
import { Image,View, AsyncStorage, ListView, Alert,Modal} from "react-native";
import {Content,Text,List,ListItem,Icon,Container,Left,Right,Button,Badge} from "native-base";
import styles from "./style";
import RadioForm from 'react-native-simple-radio-button';

var radio_props = [
 {label: 'User', value: 0 },
 {label: 'Trainer', value: 1 }
];

const dataUser = [
  {
    name: "Home",
    route: "ClientHome",
    icon: "navigate",
    bg: "#C5F442"
  },
  {
    name: "Notifications",
    route: "Notifications",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Upcoming Sessions",
    route: "UpcomingSessions",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Profile",
    route: "ClientProfile",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Cart",
    route: "AddToCart",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Rate your past trainers",
    route: "ClientRating",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Order History & Recurring Purchases",
    route: "OrderHistory",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Progress Tracker",
  //  route: "ClientSignup",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Track / Follow your Friends techniques",
    route: "TrackFriends",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Logout",
    icon: "navigate",
    bg: "#BE6F50"
  },
];


const dataTrainer = [
  {
    name: "Profile",
    route: "TrainerPersonalPage",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Notifications",
    route: "Notifications",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Upcoming Sessions",
    route: "UpcomingSessions",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Billing Information",
    route: "TrainerFinancialDetails",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Cart",
    route: "AddToCart",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Track your Commission & Payments",
    //route: "TrainerSignUp",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Order History & Recurring Purchases",
    route: "OrderHistory",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Track / Follow your Friends techniques",
    route: "TrackFriends",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Logout",
    icon: "navigate",
    bg: "#BE6F50"
  },
];
const emptyData =[
  {
    name: "Landing",
    route: "Landing",
    icon: "navigate",
    bg: "#C5F442"
  },
  {
    name: "Home",
    route: "ClientHome",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Browse Trainers",
    route: "BrowseTrainers",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "View Online Store",
     route: "OnlineStore",
    icon: "navigate",
    bg: "#BE6F50"
  },
]

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      userData:null,
      userType:'',
      modalVisible:false,
      radioButton:0
    };
    this.onLogin = this.onLogin.bind(this);
  }
  fetchData(){
    AsyncStorage.getItem('@getUserType:key', (err, type) => {
      if(type){
        this.setState({
          userType:type
        },()=>{
          if(this.state.userType === 'Trainer'){
            this.setState({
              dataSource:new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataTrainer)
            })
          }else{
            this.setState({
              dataSource:new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataUser)
            })
          }
        })
      }else{
        this.setState({
          dataSource:new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(emptyData)
        })
      }
    })
    AsyncStorage.getItem('@getUserData:key', (err, getUserData) => {
        var get_user = JSON.parse(getUserData)
        this.setState({
          userData:get_user
        })
     }).done()
  }
  componentWillMount(){
    this.fetchData();
  }
  componentWillReceiveProps(newProps){
    this.fetchData();
  }
  onLogoutOk(){
    AsyncStorage.removeItem('@getUserData:key')
    AsyncStorage.removeItem('@getUserType:key')
    this.props.navigation.navigate("Landing")
  }
  onClicking(data){
    if(data.name === "Logout"){
      Alert.alert(
        "Log-Out",
        "Are you sure you want to Log-out ?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed")
          },
          {
            text: "OK",
            onPress: () => this.onLogoutOk()
          },
        ], {
          cancelable: false
        }
      );
    }else{
      if(data.route){
        this.props.navigation.navigate(data.route)
      }else{
        alert("No Routing Given")
      }
    }
  }
renderData(data){
  return(
    <ListItem
      button
      noBorder
      onPress={this.onClicking.bind(this, data)}>
      <Left>
        <Icon
          active
          name={data.icon}
          style={{ color: "#fff", fontSize: 26, width: 30 }}/>
        <Text style={styles.text}>
          {data.name}
        </Text>
      </Left>
      {data.types &&
        <Right style={{ flex: 1 }}>
          <Badge
            style={{
              borderRadius: 3,
              height: 25,
              width: 72,
              backgroundColor: data.bg
            }}>
            <Text
              style={styles.badgeText}
            >{`${data.types} Types`}</Text>
          </Badge>
        </Right>}
    </ListItem>
  )
}
onLogin(){
  this.setState({modalVisible:true})
}
onModalClose(){
  this.setState({modalVisible:false})
}
onDone(){
  console.log("44556699:   ",JSON.stringify(this.state.radioButton))
  if(this.state.radioButton === 0){
    this.onModalClose();
    this.props.navigation.navigate("ClientLogin")
  }else{
    this.onModalClose();
    this.props.navigation.navigate("TrainerLogin")
  }
}
onCancel(){
  this.onModalClose();
}
onRadioFormPressed(value){
  this.setState({
    radioButton: value
  })
}
render() {
 console.log("USERDATA@@@@@:"+JSON.stringify(this.state.userData))
    return (
      <Container style={{backgroundColor: "#009FDB",}}>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#009FDB",
            marginTop : 30,  borderColor : '#fff',
            borderBottomWidth : 1 }}>
            <View style={{ alignItems:'center', justifyContent:'center'}}>
            <Icon name="ios-contact" style={{color: "white"}} />
            {this.state.userData === null ? (
            <Button onPress={this.onLogin} style={{alignSelf:"center"}} transparent>
              <Text style={{color: "white"}}>Sign Up/Log In</Text>
            </Button>
            ):
             this.state.userData.user_name? (
               <Text style={{color: "white",fontSize:20}}>{this.state.userData.user_name}</Text>):(<Text style={{color: "white",fontSize:20}}>{this.state.userData.name}</Text>)}
            </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={data =>
              data.name === "Logout"? (
                this.state.userData === null ?(null):(
                  this.renderData(data)
                )
              )
              :(<ListItem
                button
                noBorder
                onPress={this.onClicking.bind(this, data)}>
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#fff", fontSize: 26, width: 30 }}/>
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}>
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>)
              }
          />
        </Content>
        <Modal
         animationType="slide"
         transparent={true}
         visible={this.state.modalVisible}>
         <View style={styles.modalView}>
           <View style={styles.modalInnerView}>
               <View style={styles.modalTopView}>
                 <Text style={styles.modalTopText}>Do you want to Sign Up/Log In as ?</Text>
               </View>
               <View style={styles.modalMiddleView}>
               <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  onPress={this.onRadioFormPressed.bind(this)}
                  style={styles.modalRadioButtonStyles}
                  />
               </View>
                <View style={styles.modalBottomView}>
                   <Button transparent onPress={this.onCancel.bind(this)} style={styles.modalBotomButtonView}>
                      <Text style={styles.modalBottomButtonText}>Cancel</Text>
                   </Button>
                  <Button transparent onPress={this.onDone.bind(this)} style={styles.modalBotomButtonView}>
                     <Text style={styles.modalBottomButtonText}>Done</Text>
                  </Button>
               </View>
           </View>
        </View>
       </Modal>
      </Container>
    );
  }
}

export default SideBar;
