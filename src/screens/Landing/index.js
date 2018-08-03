import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet,Alert,Dimensions } from "react-native";
import { Container,Content, Text, Footer,FooterTab } from "native-base";
import ImageSlider from "react-native-image-slider";
import { Button, Header } from "../common";
import API from "@utils/ApiUtils";
import {IMAGE_PATH} from "@common/global";

var PushNotification = require("react-native-push-notification");

class Landing extends Component {
  constructor(){
    super();
    this.state = {
      libraries: []
    };
  }
  static navigationOptions = {
      title: "Landing",
    };
  componentWillMount(){
    this.onPushNotification();
    this.getLandingPageImages();
  }
  onPushNotification(){
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( "TOKEN@@@@@@:",token);
             AsyncStorage.setItem("@token:key", JSON.stringify(token));
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log( "NOTIFICATION:", notification );

            // process the notification

            // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "YOUR GCM SENDER ID",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });
  }
  getLandingPageImages(){
    API.getLandingPageImages().then(async (response) => {
      this.setState({loading : false});
      if (response.status) {
        this.setState({libraries: response.data});
      } else {

      }
    }).catch((error)=>{
      this.setState({spinner:false});
      console.log("Console Error",error);
    });
  }
  onEnter(){
    AsyncStorage.getItem("@getUserType:key", (err, type) => {
      if (err){
        Alert.alert("HomeFit", "Can't Fetch the Data");
      }
      if (type){
        this.setState({
          userType:type
        },()=>{
          if (type === "Trainer"){
            this.props.navigation.navigate("TrainerPersonalPage");
          } else {
            this.props.navigation.navigate("ClientHome");
          }
        });
      } else {
        this.props.navigation.navigate("ClientHome");
      }
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header headerText="HomeFit" />
        <Content>
          <View>
            <View style={styles.sliderStyle}>
              <ImageSlider autoPlayWithInterval={3000}
              images={this.state.libraries.map((album) => IMAGE_PATH + album.image) }/>
            </View>
            <View style={styles.lowerContainer}>
              <View style={styles.cardStyle}>
                <Text style={styles.subTitle}>One Stop Shop For All Your Gym Needs!</Text>
              </View>
            </View>
            <View style={styles.lowerTextContainer}>
              <Text style={styles.lowerText}>Browse our professaional trainers! {"\n"} Have video consultations with them! {"\n"} Pay by the hour! {"\n"} Buy the best products!</Text>
            </View>
          </View>
        </Content>
        <Footer>
          <FooterTab style={{marginBottom:10}}>
              <Button full transparent onPress={this.onEnter.bind(this)} style={{alignItems:"center",justifyContent:"center"}}>
                <Text style={{color : "#009FDB",fontSize:18}}>Enter</Text>
              </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default Landing;

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container : {
    backgroundColor : "#fff"
  },
  sliderStyle : {
      width: "100%",
      height: window.height * 0.5 ,
      marginTop: 10,
      margin:10
  },
  subTitle : {
      color : "#fff",
      fontSize : 18,
      lineHeight : 60,
      alignItems : "center",
      fontWeight : "800",
      shadowColor : "#000",
      shadowOffset : { width : 0, height : 2 },
      shadowOpacity : 0.8,
      elevation : 2,
      position : "relative"
  },
  lowerContainer : {
    //height : '100%',
    flex:1,
    marginTop:5
  },
  cardStyle : {
      borderRadius : 5,
      justifyContent : "center",
      marginHorizontal:10,
      margin:2,
      alignItems : "center",
      backgroundColor  : "#009FDB",
      shadowColor : "#000",
      shadowOffset : { width : 0, height : 2 },
      shadowOpacity : 0.8,
      // elevation : 2,
      // position : "relative"
  },
  lowerTextContainer : {
      alignItems : "center",
      justifyContent : "center",
      backgroundColor : "#FFF",
      padding:15
  },
  lowerText : {
      fontSize : window.width / 20,
      color : "#009FDB",
      fontWeight : "600",
      textAlign:"center"
  }
});
