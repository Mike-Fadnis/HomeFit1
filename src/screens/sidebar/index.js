import React, { Component } from "react";
import { Image,View, AsyncStorage, ListView } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const datas = [
  {
    name: "Landing",
    route: "Landing",
    icon: "navigate",
    bg: "#477EEA"
  },
  {
    name: "Home",
    route: "ClientHome",
    icon: "navigate",
    bg: "#C5F442"
  },
  {
    name: "Browse Trainers",
    route: "BrowseTrainers",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "View Trainer",
    route: "ViewTrainer",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Visit Online Store",
    route: "OnlineStore",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Trainer Login",
    route: "TrainerLogin",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Trainer Sign Up",
    route: "TrainerSignUp",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Trainer Home",
    route: "TrainerPersonalPage",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Client Sign Up",
    route: "ClientSignup",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Client Login",
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

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      userData:null
    };
  }
  componentWillMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(datas)
    })
    AsyncStorage.getItem('@getUserData:key', (err, getUserData) => {

        var get_user = JSON.parse(getUserData)
        // alert(JSON.stringify(get_user))
      this.setState({
        userData:get_user
      })
     }).done()
  }
  componentWillReceiveProps(newProps){
    this.setState({
      dataSource:new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(datas)
    })
    AsyncStorage.getItem('@getUserData:key', (err, getUserData) => {

        var get_user = JSON.parse(getUserData)
        // alert(JSON.stringify(get_user))
      this.setState({
        userData:get_user
      })
     }).done()
  }
  onClicking(data){
    if(data.name === "Logout"){
      AsyncStorage.removeItem('@getUserData:key')
      this.props.navigation.navigate("Landing")
    }else{
      this.props.navigation.navigate(data.route)
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
render() {
 console.log("USERDATA@@@@@:"+JSON.stringify(this.state.userData))
    return (
      <Container style={{backgroundColor: "#009FDB"}}>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#009FDB",
            marginTop : 30,  borderColor : '#fff',
            borderBottomWidth : 1 }}>
            <View style={{ alignItems:'center', justifyContent:'center'}}>
            <Icon name="ios-contact" style={{color: "white"}} />
            {this.state.userData === null ? (<Text style={{color: "white"}}>Login</Text>):
             this.state.userData.user_name? (<Text style={{color: "white"}}>{this.state.userData.user_name}</Text>):(  <Text style={{color: "white"}}>{this.state.userData.name}</Text>)}
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
      </Container>
    );
  }
}

export default SideBar;
