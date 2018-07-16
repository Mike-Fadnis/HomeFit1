import React, { Component } from "react";
import { Image } from "react-native";
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
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container style={{backgroundColor: "#009FDB"}}>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#009FDB",
            marginTop : 30,  borderColor : '#fff',
            borderBottomWidth : 1 }}
        >
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#fff", fontSize: 26, width: 30 }}
                  />
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
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
