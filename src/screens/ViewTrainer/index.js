import React, { Component } from "react";
import { View, Image ,Modal, TouchableOpacity,AsyncStorage, Alert,Dimensions} from "react-native";
import {Container,Header,Title,Content,Text,Button,Spinner,Icon,Left,Right,Body} from "native-base";
import { Calendar } from "react-native-calendars";
import { Card, CardSection } from "../common";
import styles from "./styles";
import moment from "moment";
import API from "@utils/ApiUtils";
const _format = "YYYY-MM-DD";
import ModalDesign from "./ModalDesign";

const window = Dimensions.get('window');
class ViewTrainer extends Component {
  initialState = {}
  constructor(props) {
    super(props);
    this.state = {
      _markedDates: this.initialState,
      getSelectedTime: [],
      _selectedDay: "",
      modalVisible: false,
      finalSelectedDates: [],
      slotsAlloted:[],
      finalResponseArray:[],
      subdata:{},
      data:"sdls",
      getSelectedTimedata:[],
      showModal:false,
      spinner: false,
      availableslotsspinner:true,
      afterBookSession: true,
      isLoading:true,
      trainersList: this.props.navigation.getParam("trainersList"),
      trainerData:{},
      noslots:false,
      keyValue: this.props.navigation.getParam("keyValue"),
      keyViewTrainer:this.props.navigation.getParam("keyViewTrainer"),
      getSelectedData:this.props.navigation.getParam("getSelectedData")
    };
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onShowModalClose = this.onShowModalClose.bind(this);
    this.onShowModalContinue = this.onShowModalContinue.bind(this);
    this.onBookSessionPressed = this.onBookSessionPressed.bind(this);
  }
  componentWillMount(){
    this.getAvailableSlots();
    this.getTrainersData();
    console.log("4455454885656:* ",this.state.keyViewTrainer)
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var get_user = JSON.parse(getUserData);
      if(get_user != null) {
        if (this.state.keyViewTrainer === "keyViewTrainer"){
          console.log("userData",get_user);
          if (get_user){

            this.addingSlotsForUser(get_user);
          } else {

          }
        } else {
          }
          this.getParticularAppointments(get_user.id)
      } else {
        this.props.navigation.navigate("ClientLogin")
      }
    }).done();
  }
  addingSlotsForUser(userData){
    var timing = this.state.getSelectedData[0].time;
    var getTime = timing.replace(/\s/g, "");
    var record = {
      user_id:userData.id,
      trainer_id:this.state.trainersList.item.id,
      date:this.state.getSelectedData[0].date,
      time:getTime,
    };
    API.addingSlotsForUser(record).then(async (response) => {
      if (response){
        //alert("API response:  "+JSON.stringify(response))
        if (response.status === true){
          Alert.alert(response.message,"");
          this.getParticularAppointments(userData.id);
        } else {
          Alert.alert(response.message,"");
        }
      } else {
        alert("Error || Please check network");
      }
     });
  }
  onDaySelect = day => {
    this.setState({spinner: true});
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var showUserData = JSON.parse(getUserData);
      if (err) {
        Alert.alert("","Can't get data");
      }
      if (showUserData === null){
        this.setState({spinner: false});
        this.props.navigation.navigate("ClientLogin",{afterBookSession : this.state.afterBookSession });
      } else {
        const _selectedDay = moment(day.dateString).format(_format);
        this.setState({ _selectedDay: _selectedDay });
        let selected = true;
        let markedDates = {};
        if (this.state._markedDates[_selectedDay]) {
          selected = !this.state._markedDates[_selectedDay].selected;
          markedDates = this.state._markedDates[_selectedDay];
        }
        markedDates = { ...markedDates, ...{ selected } };
        const updatedMarkedDates = {
          ...this.state._markedDates,
          ...{ [_selectedDay]: markedDates }
        };
        this.setState({ _markedDates: updatedMarkedDates });
        if (this.state.finalSelectedDates.length > 0) {
          this.state.finalSelectedDates.map((res, i) => {
            if (res.date === _selectedDay) {
              this.onShow(res);
              this.state.finalSelectedDates.splice(i, 1);
              this.setState({
                finalSelectedDates: this.state.finalSelectedDates
              });
            } else {
              this.setState({spinner: false});
              this.onModalOpen(true);
            }
          });
        } else {
          this.setState({spinner: false});
          this.onModalOpen(true);
        }
      }
    });
  }
  onShow(res){
    var self = this;
    Object.keys(self.state.subdata).forEach(function (key) {
        if (res.date === key) {
            self.state.subdata[key] = {selected:true};
        }
    });
    var obj = {};
    Object.keys(self.state.subdata).forEach(function (key) {
      obj[key] = {selected:self.state.subdata[key].selected ,selectedColor:self.state.subdata[key].selectedColor};
    });
    self.setState({subdata:obj});
  }
  onModalOpen(visible) {
    this.setState({ modalVisible: visible });
  }
  onModalClose() {
    this.setState({ modalVisible: false });
  }
  getDataObj(getSelectedTime) {
     this.setState({ getSelectedTimedata:getSelectedTime,modalVisible:false},()=>{
       this.setState({showModal: true});
     });
  }
  onShowModalClose(){
     this.setState({
       showModal: false
     });
  }
 onShowModalContinue(){
  this.setState({showModal: false},()=>{
    this.props.navigation.navigate("Payment",{keyVTrainer:"keyVTrainer",getSelectedData:this.state.getSelectedTimedata});
   });
 }
getTrainersData(){
  var Id = this.state.trainersList.item.id;
  API.getTrainersData(Id).then(async (response) => {
    this.setState({isLoading:false,trainerData:response.data});
   }).catch((error)=>{
    this.setState({isLoading:false});
   });
}
getAvailableSlots(){
  var Id = this.state.trainersList.item.id;
  this.setState({availableslotsspinner: true});
   API.getAvailableSlots(Id).then(async (response) => {
      if (response.status) {
        this.setState({slotsAlloted:response.data,},()=>{
          this.getNewResponse();
        });
        var subdata = {};
        response.data.map((res,i)=>{
          var date = moment(res.date).format(_format);
          subdata[date] = {selected: true};
        });
        this.setState({subdata:subdata,availableslotsspinner:false});
      } else {
          this.setState({noslots:true,availableslotsspinner:false,noslotsText:response.message});
      }
    }).catch((error)=>{
      Alert.alert("Error",error);
    });
}
getNewResponse(){
  let count = 0;
	let responseArray = this.state.slotsAlloted;
	let finalResponseArray = [];
	responseArray.map((res, key) => {
		let date = res.date;
		if (finalResponseArray.length === 0) {
			let listArray = [];
			listArray.push({time_slot:res.time_slot});
			var record = { id: res.id,date: date, time_slot: listArray };
			finalResponseArray.push(record);
		} else {
			finalResponseArray.map((finalres, index) => {
				if (finalres.date === date) {
					finalres.time_slot.push({time_slot:res.time_slot});
					count++;
				} else {
					count = 0;
				}
			});
			if (count === 0) {
				let listArray = [];
				listArray.push({time_slot:res.time_slot});
				let rec = { id: res.id,date: date, time_slot: listArray };
				finalResponseArray.push(rec);
			}
		}
	});
  this.setState({
      finalResponseArray: finalResponseArray
  });
}
onBookSessionPressed(){
  this.setState({spinner: true});
  AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
    var showUserData = JSON.parse(getUserData);
    if (err){
      Alert.alert("","Can't get data");
    }
    if (showUserData === null){
      this.setState({spinner: false});
      this.props.navigation.navigate("ClientLogin",{afterBookSession : this.state.afterBookSession });
    } else {
      this.setState({spinner: false});
      this.props.navigation.navigate("Payment");
    }
  });
}
onBack(){
  if (this.state.keyValue === true){
    this.props.navigation.navigate("FeaturedTrainers");
  } else if (this.state.keyValue === false){
    this.props.navigation.navigate("BrowseTrainers");
  }
}
getParticularAppointments(userId){
  var primaryId = {
    userId: userId,
    trainerId: this.state.trainersList.item.id
  }
 API.getParticularAppointments(primaryId).then(async (response) => {
    console.log("particularAppount Response:  ", JSON.stringify(response))
    if (response.status === true) {
        this.forSelectedGreenArray(response.data);
    } else {
      this.setState({noslots: true,noslotsText: response.message})
    }
  }).catch((error)=>{
    Alert.alert("Error",error);
  });
}
forSelectedGreenArray(resData){
  let count = 0;
  var self = this;
  Object.keys(self.state.subdata).forEach(function (key) {
    resData.map((res,i)=>{
      if (res.appt_date === key) {
        self.state.subdata[key] = {selected:true,selectedColor:"green",disabled: true, disableTouchEvent: true};
       } else {
         count = 0;
      }
   });
   if (count !== 0) {
    self.state.subdata[key] = {selected:true,selectedColor:"green",disabled: true, disableTouchEvent: true};
   }
  });
  var obj = {}
  Object.keys(self.state.subdata).forEach(function (key) {
   obj[key] = {selected:self.state.subdata[key].selected ,selectedColor:self.state.subdata[key].selectedColor,disabled:self.state.subdata[key].disabled, disableTouchEvent:self.state.subdata[key].disableTouchEvent};
  });
  self.setState({subdata:obj,isLoading: false});
}

render() {
  if (this.state.trainerData.name !== undefined){
    var res =  this.state.trainerData.name.split(" ");
    var firstname = "";
    var lastname = "";
    if (res[1] === undefined) {
      firstname = res[0].charAt(0);
      lastname = "";
    } else {
      firstname = res[0].charAt(0);
      lastname = res[1].charAt(0);
    }
  }
  return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
        <Left>
          <Button style={{width:window.width * 0.15}}
            transparent
            onPress={this.onBack.bind(this)}>
            <Icon name="ios-arrow-back" style={{marginLeft:5,color: "white"}}/>
          </Button>
        </Left>
          <Body>
            <Title style={styles.title}>Trainer</Title>
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
              <Content style={styles.content}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{this.state.trainerData.name.toUpperCase()}</Text>
                </View>
                <View style={styles.imageView}>
                {this.state.trainerData.image === "" ? (<View style={styles.imageContainer}><Text style={styles.imageEmptyText}>{firstname.toUpperCase()}{lastname.toUpperCase()}</Text></View>) : (<Image style={styles.trainerImage} source={{uri : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg"}} />)}
                </View>
                <CardSection style={styles.singleImageContainer}>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 115 }}
                      source={{uri : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg"}} />
                    </View>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 115}}
                      source={{uri : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg"}} />
                  </View>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 115}}
                      source={{uri : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg"}} />
                  </View>
                </CardSection>
                <Card>
                  <Text style={styles.specialityTitle}>Specialities :</Text>
                    <CardSection>
                      <Text>Speciality 1</Text>
                    </CardSection>
                    <CardSection>
                      <Text>Speciality 2</Text>
                    </CardSection>
                    <CardSection>
                      <Text>Speciality 3</Text>
                    </CardSection>
                </Card>
                <View style={styles.bioContainer}>
                  <Text style={styles.bio}>{this.state.trainerData.review}</Text>
                </View>
                <View style={styles.calendarContainer}>
                  <Text style={styles.specialityTitle}>Available Slots :</Text>
                  {this.state.availableslotsspinner ? (
                    <Spinner color="black" />
                  ) :
                   this.state.noslots ? (
                      <Text style={{textAlign:"center",padding:10}}>This trainer has not listed any available time slots.</Text>
                   ) :
                    <Calendar
                      onDayPress={this.onDaySelect}
                      minDate={new Date()}
                      markedDates={this.state.subdata}/>
                  }
                </View>
                <View style={{marginTop:10,alignSelf:"center"}}>
                {this.state.noslots ? (
                  <Button disabled full style={[styles.bookSessionView,{backgroundColor: "grey"}]}>
                    <View style={styles.bookSessionButton}>
                      <Text style={{color:"white"}}> Book a one hour session </Text>
                    </View>
                  </Button>
                ):(
                  <Button full style={styles.bookSessionView} onPress={this.onBookSessionPressed}>
                    <View style={styles.bookSessionButton}>
                      <Text style={{color:"white"}}> Book a one hour session </Text>
                    </View>
                  </Button>
                )}
                  <Button full style={styles.quickAdviceView} onPress={this.onBookSessionPressed}>
                    <View style={styles.quickAdviceButton}>
                      <Text style={{color:"white"}}> Have a quick 5 minute advice </Text>
                    </View>
                  </Button>
                </View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}>
                <ModalDesign
                  onClose={this.onModalClose}
                  getDataObj={this.getDataObj.bind(this)}
                  selectedDate={this.state._selectedDay}
                  selectedTime={this.state.finalResponseArray}/>
              </Modal>
              <Modal
                 animationType="fade"
                 transparent={true}
                 visible={this.state.showModal}>
                   <View style={styles.modalView}>
                     <View style={{width: 300, alignSelf:"center",height: 120,backgroundColor:"white",borderWidth:1,borderColor:"white",borderRadius:10}}>
                       <View style={{flex:0.5,justifyContent:"center",alignItems:"center",margin:10}}>
                         <Text style={{textAlign:"center",fontSize:16,fontWeight:"700"}}>{"Do you want to book this Date and time ? It costs $1.00"}</Text>
                       </View>
                       <View style={{flex:0.5,marginBottom:10,flexDirection:"row"}}>
                        <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                          <TouchableOpacity onPress={this.onShowModalContinue}>
                            <Text style={{textAlign:"center",fontSize:18,fontWeight:"800", color:"#009FDB"}}>Continue</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                          <TouchableOpacity onPress={this.onShowModalClose}>
                            <Text style={{textAlign:"center",fontSize:18,fontWeight:"800", color:"#009FDB"}}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                       </View>
                     </View>
                  </View>
               </Modal>
              </Content>
          )}
          {this.state.spinner === true ? (
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

export default ViewTrainer;
