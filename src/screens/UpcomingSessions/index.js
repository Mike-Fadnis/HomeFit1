import React, { Component } from "react";
import { View, Modal, AsyncStorage,FlatList} from "react-native";
import {Container,Header,Title,Content,Icon,Button,Left,Right,Body,Spinner} from "native-base";
import styles from "./styles";
import ModalDesign from "./ModalDesign";
import {ListItem} from "react-native-elements";
import API from "@utils/ApiUtils";

class UpcomingSessions extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible:false,
      dataItem:{},
      sessions:[],
      spinner: true
    };
  }
  componentWillMount(){
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var get_user = JSON.parse(getUserData);
      console.log("userData",get_user);
        if(get_user){
          this.getUpcomingSessionsList(get_user.id)
        }else{
        }
      }).done();
  }
  getUpcomingSessionsList(user_id){
    API.getUpcomingSessions(user_id).then(async (response) => {
      if(response){
        if(response.status === true){
          this.setState({
            sessions:response.data,
            spinner:false
          })
        }else{
          this.setState({
            spinner:false
          })
          alert("error")
        }
      }else{
        this.setState({
          spinner:false
        })
        alert("error")
      }
    }).done()
  }
  onClicked(item){
    this.setState({
      dataItem:item
    },()=>{
      this.setState({
        modalVisible:true
      });
    });
  }
  onModalClose(){
    this.setState({
      modalVisible:false
    });
  }
  renderData(item){
    return (
      <ListItem
        roundAvatar
        title={`${item.item.trainer_name}`}
        subtitle={`${item.item.appt_date}, ${item.item.appt_time}`}
        onPress={this.onClicked.bind(this,item)}
      />
    );
  }
  render(){
    console.log("LKAJSHFGFG: ",this.state.dataItem);
      return (
        <Container style={styles.container}>
          <Header style={styles.headerStyle}>
            <Left style={styles.ham}>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name = "ios-menu" style={{color: "white"}} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>UPCOMINGSESSIONS</Title>
            </Body>
            <Right/>
          </Header>
          {this.state.spinner === true ? (
              <View style={styles.container_spinner}>
                <View style={styles.spinnerView}>
                  <Spinner color="black"/>
                </View>
              </View>
            ) : (
              <Content>
                <View style={styles.contentStyle}>
                   <FlatList
                      data={this.state.sessions}
                      keyExtractor={(x, i) => x.id}
                      extraData={this.state}
                      renderItem={this.renderData.bind(this)}
                      style={{backgroundColor:'#FFFFFF'}}/>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}>
                  <View style={styles.modalView}>
                <ModalDesign onClose={this.onModalClose.bind(this)} dataItem={this.state.dataItem}/>
                </View>
                </Modal>
              </Content>
          )}
        </Container>
      );
  }
}
export default UpcomingSessions;

var data = [
  {
    "id": "1",
    "name": "John Doe A",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"26/07/2018",
    "timing":"12:00PM - 1:00PM"

  },
  {
    "id": "2",
    "name": "John Doe B",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"28/07/2018",
    "timing":"1:00PM - 2:00PM"

  },
  {
    "id": "3",
    "name": "John Doe C",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"27/07/2018",
    "timing":"2:00PM - 3:00PM"
  },
  {
    "id": "4",
    "name": "John Doe D",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"29/07/2018",
    "timing":"12:00PM - 1:00PM"

  },
  {
    "id": "5",
    "name": "John Doe E",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"31/07/2018",
    "timing":"3:00PM - 4:00PM"

  },
  {
    "id": "6",
    "name": "John Doe F",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"31/07/2018",
    "timing":"1:00PM - 2:00PM"

  }
];
