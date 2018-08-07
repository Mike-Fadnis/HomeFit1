import React, { Component } from "react";
import { View ,Modal,TouchableOpacity,Image, FlatList,AsyncStorage,Alert} from "react-native";
import ImageSlider from "react-native-image-slider";
import { Calendar,CalendarList } from "react-native-calendars";
import moment from "moment";
import {Container,Header,Title,Content,Text,Icon,Footer,Button,FooterTab,Left,Right,Body,Spinner} from "native-base";
var ImagePicker = require("react-native-image-picker");

import { ButtonTwo, Card, CardSection } from "../common";
import ButtonOne from "./ButtonOne";
import CalendarModalOpenDesign from "./CalendarModalOpenDesign";
import styles from "./styles";
import Images from "@theme/images/images";
import API from "@utils/ApiUtils";
import TrainersMedia from "./TrainersMedia";
import SpecialtyModalDesign from "./specialtyModalDesign";

const _format = "YYYY-MM-DD";
var options = {
  title: "Select Avatar",
  customButtons: [
    {name: "fb", title: "Choose Photo from Facebook"},
  ],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
class TrainerPersonalPage extends Component {
  initialState = {}
  constructor() {
  super();
  this.state = {
  _markedDates: this.initialState,
  modalVisible: false,
  getSelectedTime: [],
  _selectedDay: "",
  finalSelectedDates: [],
  avatarSource: null,
  spinner:false,
  specialtyModal: false,
  selectedSpecialties: [],
  selectedTimes:[],
  loading:false,
  userData: null,
  specialtiesDataById:[],
  duplicateSpecialities:[],
  availableDatesss:[],
  isLoading:true,
  sessionValue:true,
  sessionId:null
  };
  this.onModalOpen = this.onModalOpen.bind(this);
  this.onModalClose = this.onModalClose.bind(this);
  // this.onAvailableDates = this.onAvailableDates.bind(this);
  this.onViewourOnlineStore = this.onViewourOnlineStore.bind(this);
  }
async componentWillMount(){
  AsyncStorage.getItem("@getUserType:key", (err, type) => {
    if (type === "Trainer"){
      AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
        var get_user = JSON.parse(getUserData);
        console.log("userData",get_user);
        this.setState({userData:get_user},()=>{
          this.getSpecialitiesById(this.state.userData.id);
          this.getAvailableSlots();
        });
      }).done();
    }
  });
  this.getPushedSpecialityData();
}
getAvailableSlots(){
  var Id = this.state.userData.id;
   API.getAvailableSlots(Id).then(async (response) => {
        console.log("Response",response.data);
        var subdata = {};
        if (response.status){
          this.setState({
            availableDatesss: response.data
          });
          response.data.map((res,i)=>{
            var date = moment(res.date).format(_format);
            subdata[date] = {selected: true};
          });
        this.setState({_markedDates:subdata});
        }
      }).catch((error)=>{
        console.log(error);
      });
}
onDaySelect = day => {
  console.log("avaialbledtae",this.state.availableDatesss);
  const _selectedDay = moment(day.dateString).format(_format);
  this.setState({ _selectedDay: _selectedDay });
  this.onModalOpen(true);
  var times = [];
  if (this.state.availableDatesss.length > 0) {

    this.state.availableDatesss.map((res, i) => {
      if (res.date === _selectedDay) {
       times.push({"time":res.time_slot});
      }
    });
    console.log("times",times);
    this.setState({selectedTimes :times });
  }
}

onModalOpen(visible) {
  this.setState({ modalVisible: visible });
}
onModalClose() {
  console.log("_markedDates",this.state._markedDates);
  this.setState({ selectedTimes:[],modalVisible: false });
}
getDataObj(getSelectedTime) {
  this.setState({ modalVisible: false });
  this.getAvailableSlots();
  var subdata = {};
}
selectPhotoTapped() {
  this.setState({spinner:true});
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
    skipBackup: true
    }
  };
  ImagePicker.showImagePicker(options, (response) => {
    console.log("Response = ", response);
    if (response.didCancel) {
      this.setState({spinner:false});
      console.log("User cancelled photo picker");
    }
    else if (response.error) {
      this.setState({spinner:false});
      console.log("ImagePicker Error: ", response.error);
    }
    else if (response.customButton) {
      this.setState({spinner:false});
      console.log("User tapped custom button: ", response.customButton);
    } else {
      let source = { uri: response.uri };
      var base64 = "data:image/png;base64," + response.data;
      var string = {"action":"trainers_upload_image","trainer_id":this.state.userData.id,"data":base64};
      API.uploadImage(string).then(async (responseData) => {
        if (responseData) {
          if (responseData.status){
            Alert.alert("Home Fit",responseData.message);
            this.setState({avatarSource: { uri: responseData.imaage },spinner:false,})
          }
          else {
            Alert.alert("HomeFit",responseData.message);
          }
        } else {
          Alert.alert("Error","Error uploading image");
        }
      });
    }
  });
}
onSpecialtyPressed(){
  this.setState({userData:this.state.userData},()=>{
    this.setState({specialtyModal: true});
  });
}
onSpecialtyModalClose(){
  this.setState({specialtyModal: false});
}
getPushedSpecialityData(getSpecialtyData){
  var finalSelectedSpecialties = [];
  this.setState({specialtyModal: false,selectedSpecialties:getSpecialtyData},()=>{
    if (this.state.selectedSpecialties != undefined){
      this.state.selectedSpecialties.map((res,i)=>{
        var rec = {id: res.id,trainerId:this.state.userData.id, speciality: res.speciality};
        finalSelectedSpecialties.push(rec);
      });
      console.log("finaalllll:: ", JSON.stringify(finalSelectedSpecialties));
      this.addingSpecialities(finalSelectedSpecialties);
    } else {
      console.log("elseeeeee :  ",JSON.stringify(this.state.selectedSpecialties));
    }
  });
}
addingSpecialities(data){
  var dupArray = [];
  this.state.duplicateSpecialities.map((result, key)=>{
    var rec = {id: result.speciality,trainerId:this.state.userData.id, speciality: result.speciality_name};
    dupArray.push(rec);
  });
  for (var i = 0, len = dupArray.length; i < len; i++) {
    for (var j = 0, len2 = data.length; j < len2; j++) {
      if (dupArray[i].id === data[j].id) {
        data.splice(j, 1);
        len2 = data.length;
      }
    }
  }
  var array = JSON.stringify(data);
  var specialitiesData = {
    id:this.state.userData.id,
    dataArray:array
  };
  API.addingSpecialities(specialitiesData).then(async (response) => {
    if (response.status === true){
      Alert.alert(response.message,"");
      this.getSpecialitiesById(this.state.userData.id);
    } else {
      this.setState({spinner: false});
      Alert.alert(response.message,"");
    }
  });
}
onRemoveTimeSlots(selectedDate){
  this.state.finalSelectedDates.map((res,i)=>{
    if (res.date === selectedDate){
    this.state.finalSelectedDates.splice(i,1);
    }
  });
  var subdata = {};
  if (this.state.finalSelectedDates.length > 0){
    this.state.finalSelectedDates.map((res,i)=>{
    var date = moment(res.date).format(_format);
    subdata[date] = {selected: true};
    });
    this.setState({ _markedDates:subdata});
  } else {
    this.setState({ _markedDates:{},modalVisible: false });
  }
  this.setState({ selectedTimes:[],modalVisible: false });
}
getSpecialitiesById(id) {
  API.getSpecialitiesById(id).then(async (response) => {
    this.setState({selectedSpecialties:[],specialtiesDataById:[]});
    if (response.status === true) {
      response.data.map((res, key)=>{
        var record = {id: res.speciality, trainerId: res.trainer_id, speciality: res.speciality_name};
        this.state.specialtiesDataById.push(record);
      });
      this.setState({selectedSpecialties:this.state.specialtiesDataById,duplicateSpecialities:response.data,isLoading:false});
    } else {
      this.setState({isLoading: false});
      // Alert.alert(response.message,'',[{
      //   text: 'OK',
      //   }],
      //   {cancelable: false}
      // )
    }
  });
}

onStartSession(){
  this.setState({
    sessionValue:false,
    loading:true
  },()=>{
    API.startSession(this.state.userData.id).then(async (response) => {
      if(response){
        if(response.status=== true){
            this.setState({loading : false, sessionId:data},()=>{
              Alert.alert(response.message,'');
            });

        }else{
          this.setState({loading : false},()=>{
            Alert.alert(response.message,'');
          });
        }
      }else{
        this.setState({loading : false},()=>{
          Alert.alert("HomeFit","Error");
        });
      }
    })
  })
}
onStopSession(){
  this.setState({sessionValue:true,loading:true},()=>{
    API.stopSession(this.state.sessionId).then(async (response) => {
      if(response){
        if(response.status=== true){
            this.setState({loading : false},()=>{
              Alert.alert(response.message,'');
            });
        }else{
          this.setState({loading : false},()=>{
            Alert.alert(response.message,'');
          });
        }
      }else{
        this.setState({loading : false},()=>{
          Alert.alert("HomeFit","Error");
        });
      }
    })
  })
}

renderData(item){
  return (
    <View style={{flex:1,margin: 5,backgroundColor: "#EDEEF0",height: 50,justifyContent:"center"}}>
      <View style={{alignItems:"flex-start",paddingLeft:10,justifyContent:"center"}}>
        <Text>{item.item.speciality}</Text>
      </View>
    </View>
  );
}
onPayment(){
  this.props.navigation.navigate("Payment",{backFromPayment: "true"});
}
onViewourOnlineStore(){
  this.props.navigation.navigate("OnlineStore",{toOnlineStore: true});
}
render() {
  return (
    <Container style={styles.container}>
       <Header style={styles.headerStyle}>
       <Left style={styles.ham}>
          <Button style={styles.ham}
          transparent
          onPress={() => this.props.navigation.navigate("DrawerOpen")}>
          <Icon name="ios-menu" style={{color: "white"}}/>
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>Home</Title>
        </Body>
        <Right />
      </Header>
      {this.state.isLoading === true ? (
      <View style={styles.container_spinner}>
        <View style={styles.spinnerView}>
          <Spinner size="large" color="black"/>
        </View>
      </View>
      ) : (
      <Content padder>
        <View style={styles.onlineStore}>
           <View style={ {marginBottom: 20, alignItems:'center'}}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={[styles.avatar, styles.avatarContainer]}>
              { this.state.spinner ? (<Spinner color="black"/>) : this.state.avatarSource === null ? <Image style={styles.avatar} source={Images.user} /> :
                <Image style={styles.avatar} source={this.state.avatarSource} /> }
            </TouchableOpacity>
          </View>
          <View>
            <TrainersMedia onPayment={this.onPayment.bind(this)}/>
          </View>
          <View style={styles.buttonContainerStyle1}>
            <ButtonTwo style={styles.buttonStyle}
              onPress={this.onViewourOnlineStore}>
                VIEW OUR ONLINE STORE
            </ButtonTwo>
          </View>

          <View style={{flex:0.5,marginTop:20}}>
            <TouchableOpacity style={{flex: 1,flexDirection: "row",margin: 5,backgroundColor: "#EDEEF0",height: 50,borderWidth: 1.2,borderColor: "lightgrey"}} onPress={this.onSpecialtyPressed.bind(this)}>
              <View style={{flex: 0.7,justifyContent: "center",padding: 10}}>
                  <Text>Specialties</Text>
              </View>
              <View style={{flex: 0.3,justifyContent: "center",alignItems: "center",borderLeftWidth: 1.2,borderColor: "lightgrey"}}>
                <Image source={Images.dropdownIcon} style={{width:20,height:20}}/>
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.specialtyModal}>
                <SpecialtyModalDesign
                  onClose={this.onSpecialtyModalClose.bind(this)}
                  getPushedSpecialityData={this.getPushedSpecialityData.bind(this)}
                  sendSelectedData={this.state.selectedSpecialties}
                  // userData={this.state.userData}
                />
              </Modal>
          </View>
          <View style={{flex:1}}>
            <FlatList
              data={this.state.selectedSpecialties}
              renderItem={this.renderData.bind(this)}
              extraData={this.state}
              />
          </View>
          <View style={styles.buttonContainerStyle1}>
            <View style={styles.sessionSliderStyle}>
              <ImageSlider images={storeImages.map((album) => album.image) }/>
            </View>
          </View>
        </View>
        <View style={styles.hostLiveGrpSession}>
          <View style={styles.buttonContainerStyle1}>
            {this.state.sessionValue === true ?
            (<ButtonOne style={styles.buttonStyle} onPress={this.onStartSession.bind(this)}>
              LIVE GROUP SESSION START
            </ButtonOne>)
            :(<ButtonOne style={styles.buttonStyle} onPress={this.onStopSession.bind(this)}>
              LIVE GROUP SESSION STOP
              </ButtonOne>
            )}
          </View>
        </View>
        <View style={styles.hostLiveGrpSessionTextContainer}>
          <Text>
              (Host a free 15 minute session to attract more
          </Text>
          <Text>
              clients nationally.)
          </Text>
        </View>
        <View style={{ marginTop : 20}}>
          <Card>
            <CardSection style={ styles.totalClientsTextBox }>
              <Text style={styles.totalClientsText}>
                Total Clients Online :
              </Text>
              <Text style={styles.totalClientsTextTwo}>
                356
              </Text>
            </CardSection>
          </Card>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={this.onDaySelect}
            minDate={new Date()}
            markedDates={this.state._markedDates}/>
        </View>
       <View style={styles.onlineStore}>
          {/*<View style={styles.buttonContainerStyle1}>
              <ButtonTwo style={styles.buttonStyle}>
                  UPDATE AVAILABLE DATES
              </ButtonTwo>
            </View>*/}
          <Button full transparent style={{backgroundColor: "#009FDB",}}>
            <Text style={styles.bookText}>
              JOIN NEXT UPCOMING TRAINING SESSION
            </Text>
          </Button>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
        <CalendarModalOpenDesign
          onClose={this.onModalClose}
          getDataObj={this.getDataObj.bind(this)}
          userData={this.state.userData}
          selectedTimes={this.state.selectedTimes}
          onRemoveTimeSlots={this.onRemoveTimeSlots.bind(this)}
          selectedDate={this.state._selectedDay}/>
      </Modal>
      </Content>
      )}
     {this.state.loading === true ? (
      <View style={styles.container_spinner}>
        <View style={styles.spinnerView}>
          <Spinner size="large" color="black"/>
        </View>
      </View>
    ) : null}

    </Container>
  );
}
}

const storeImages = [
  {
      "id" : 3,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product1.jpg"
  },
  {
      "id" : 2,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product2.jpg"
  },
  {
      "id" : 1,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product1.jpeg"
  },
  {
      "id" : 0,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product3.jpg"
  },
  {
      "id" : 5,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product5.jpg"
  },
  {
      "id" : 6,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product6.jpg"
  }
];

export default TrainerPersonalPage;
