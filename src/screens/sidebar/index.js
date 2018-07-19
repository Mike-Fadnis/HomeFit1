import React, { Component } from "react";
import { Image,View, AsyncStorage, ListView, Alert,Modal} from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Button,
  Badge
} from "native-base";
import styles from "./style";
import RadioForm from 'react-native-simple-radio-button';
var radio_props = [
 {label: 'User', value: 0 },
 {label: 'Trainer', value: 1 }
];

const dataUser = [
  {
    name: "Home",
    //route: "ClientHome",
    icon: "navigate",
    bg: "#C5F442"
  },
  {
    name: "Notifications",
    //route: "BrowseTrainers",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Upcoming Sessions",
    //route: "ViewTrainer",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Profile",
  //  route: "OnlineStore",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Cart",
    //route: "TrainerLogin",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Rate your past trainers",
    //route: "TrainerSignUp",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Order History & Recurring Purchases",
    //route: "TrainerPersonalPage",
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
    route: "ClientLogin",
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
    name: "Notifications",
    //route: "BrowseTrainers",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Upcoming Sessions",
    //route: "ViewTrainer",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Profile",
  //  route: "OnlineStore",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Billing Information",
  //  route: "OnlineStore",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Cart",
    //route: "TrainerLogin",
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
    //route: "TrainerPersonalPage",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Track / Follow your Friends techniques",
    route: "ClientLogin",
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
    //route: "ClientHome",
    icon: "navigate",
    bg: "#C5F442"
  },
  {
    name: "Home",
    //route: "BrowseTrainers",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Browse Trainers",
    //route: "ViewTrainer",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "View Online Store",
  //  route: "OnlineStore",
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
  onClicking(data){
    if(data.name === "Logout"){
      AsyncStorage.removeItem('@getUserData:key')
      AsyncStorage.removeItem('@getUserType:key')
      this.props.navigation.navigate("Landing")
    }else{
    //  this.props.navigation.navigate(data.route)
    alert("HI")
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
  // Alert.alert("HomeFit", "Do you want to login as ?", [
  //   {
  //     text: "User",
  //     onPress: () => {
  //         this.props.navigation.navigate("ClientLogin")
  //     }
  //   },
  //   {
  //     text: "Trainer",
  //     onPress: () => {
  //         this.props.navigation.navigate("TrainerLogin")
  //     }
  //   },
  //   { text: "Cancel", onPress: () => console.log("cancel Pressed") }
  // ])
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
           <View style={{flex:1,backgroundColor:"white",borderWidth:1,borderColor:"white",borderRadius:10}}>
             <View style={{flex:0.2,margin:10,alignItems:"center",justifyContent:"center"}}>
                <Button transparent style={{flex:1,alignItems:"flex-end"}} onPress={this.onModalClose.bind(this)}>
                  <Text style={{fontSize:16,fontWeight:"500"}}>x</Text>
                </Button>
             </View>
             <View style={{flex:0.3,justifyContent:"center",alignItems:"center",margin:10}}>
               <Text style={{textAlign:"center",fontSize:16,fontWeight:"500"}}>Do you want to Sign Up/Log In as ?</Text>
             </View>
             <View style={{flex:0.4,justifyContent:"center"}}>
             <RadioForm
                 radio_props={radio_props}
                 initial={0}
                 formHorizontal={true}
                 style={{flex:1,justifyContent:"space-around",alignItems:"center"}}
                 buttonColor={'#009FDB'}
                 onPress={this.onRadioFormPressed.bind(this)}
               />
             </View>
             <View style={{flex:0.3,justifyContent:"center",alignItems:"center",marginBottom:10,flexDirection:"row"}}>
                <Button onPress={this.onDone.bind(this)}>
                   <Text style={{textAlign:"center",fontSize:18,fontWeight:"500"}}>Done</Text>
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
