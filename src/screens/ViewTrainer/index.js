import React, { Component } from "react";
import { View, ScrollView, Image ,Modal, TouchableOpacity,AsyncStorage} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Spinner,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import { Calendar } from 'react-native-calendars';
import { Card, CardSection } from '../common';
import styles from "./styles";
import moment from 'moment';
import API from "@utils/ApiUtils";
const _format = 'YYYY-MM-DD';
import ModalDesign from "./ModalDesign";

class ViewTrainer extends Component {
  initialState = {}
  constructor(props) {
    super(props)
    this.state = {
      _markedDates: this.initialState,
      getSelectedTime: [],
      _selectedDay: '',
      modalVisible: false,
      finalSelectedDates: [],
      slotsAlloted:[],
      finalResponseArray:[],
      subdata:{},
      data:"sdls",
      getSelectedTimedata:[],
      showModal:false,
      spinner: false,
      afterBookSession: true,
      trainersList: this.props.navigation.getParam("trainersList")
    }
    this.onModalOpen = this.onModalOpen.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
    this.onShowModalClose = this.onShowModalClose.bind(this);
    this.onShowModalContinue = this.onShowModalContinue.bind(this)
    this.onBookSessionPressed = this.onBookSessionPressed.bind(this)
  }
  onDaySelect = day => {
    this.setState({spinner: true})
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var showUserData = JSON.parse(getUserData)
      if (showUserData === null){
        this.setState({spinner: false})
        this.props.navigation.navigate("ClientLogin",{afterBookSession : this.state.afterBookSession })
      }else{
        const _selectedDay = moment(day.dateString).format(_format)
        this.setState({ _selectedDay: _selectedDay })
        let selected = true;
        let markedDates = {}
        if (this.state._markedDates[_selectedDay]) {
          selected = !this.state._markedDates[_selectedDay].selected;
          markedDates = this.state._markedDates[_selectedDay]
        }
        markedDates = { ...markedDates, ...{ selected } }
        const updatedMarkedDates = {
          ...this.state._markedDates,
          ...{ [_selectedDay]: markedDates }
        }
        this.setState({ _markedDates: updatedMarkedDates })
        if (this.state.finalSelectedDates.length > 0) {
          this.state.finalSelectedDates.map((res, i) => {
            if (res.date === _selectedDay) {
              this.onShow(res);
              this.state.finalSelectedDates.splice(i, 1);
              this.setState({
                finalSelectedDates: this.state.finalSelectedDates
              },()=>{
               // alert('1456:kajkdklcfkadsjnk'+ JSON.stringify(this.state.finalSelectedDates))
              });
            } else {
              this.setState({spinner: false})
              this.onModalOpen(true);
            }
          });
        } else {
          this.setState({spinner: false})
          this.onModalOpen(true);
        }

      }
    })
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
    self.setState({
      subdata:obj
    });
  }
  onModalOpen(visible) {
    this.setState({ modalVisible: visible })
  }
  onModalClose() {
    this.setState({ modalVisible: false })
  }
  getDataObj(getSelectedTime) {
     this.setState({ getSelectedTimedata:getSelectedTime,modalVisible:false},()=>{
       this.setState({showModal: true})
     })
  }
  onShowModalClose(){
     this.setState({
       showModal: false
     },()=>{
       console.log("getselected temas: ",this.state.finalSelectedDates)
     })
  }
 onShowModalContinue(){
   this.setState({
     showModal: false
   },()=>{
     this.state.getSelectedTimedata.map((res,i)=>{
       this.state.getSelectedTime.push(res);
     });
     this.setState({ finalSelectedDates: this.state.getSelectedTime  }, () => {
       this.props.navigation.navigate("Payment");
       //   let count = 0;
       //   var self = this;
       //   Object.keys(self.state.subdata).forEach(function (key) {
       //     self.state.finalSelectedDates.map((res,i)=>{
       //       if (res.date === key) {
       //         count++;
       //       } else {
       //         count = 0;
       //       }
       //     });
       //     if (count !== 0) {
       //         self.state.subdata[key] = {selected:true,selectedColor:"green"};
       //     }
       //   });
       //   var obj = {}
       //   Object.keys(self.state.subdata).forEach(function (key) {
       //     obj[key] = {selected:self.state.subdata[key].selected ,selectedColor:self.state.subdata[key].selectedColor};
       //   });
       //   self.setState({
       //     subdata:obj
       //   });
     });
   })
 }
  componentWillMount(){
    console.log("ssssssssssssssss:  ", JSON.stringify(this.state.trainersList))
    var Id="22";
     API.getAvailableSlots(Id).then(async (response) => {
       this.setState({
         slotsAlloted:response.data
       },()=>{
         this.getNewResponse()
       })
       var subdata = {};
       response.data.map((res,i)=>{
         var date = moment(res.date).format(_format);
         subdata[date] = {selected: true};
       })
       this.setState({subdata:subdata})
        }).catch((error)=>{
        this.setState({isLoading:false});
        });
  }
  getNewResponse(){
    let count = 0;
		let responseArray = this.state.slotsAlloted;
		let finalResponseArray = [];
		responseArray.map((res, key) => {
			let date = res.date;
			if (finalResponseArray.length === 0) {
				let listArray = []
				listArray.push({time_slot:res.time_slot})
				var record = { id: res.id,date: date, time_slot: listArray }
				finalResponseArray.push(record);
			} else {
				finalResponseArray.map((finalres, index) => {
					if (finalres.date === date) {
						finalres.time_slot.push({time_slot:res.time_slot})
						count++;
					} else {
						count = 0;
					}
				})
				if (count === 0) {
					let listArray = [];
					listArray.push({time_slot:res.time_slot});
					let record = { id: res.id,date: date, time_slot: listArray  };
					finalResponseArray.push(record);
				}
			}
		});
    this.setState({
        finalResponseArray: finalResponseArray
    });
  }
  onBookSessionPressed(){
    this.setState({spinner: true})
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var showUserData = JSON.parse(getUserData)
      if (showUserData === null){
        this.setState({spinner: false})
        this.props.navigation.navigate("ClientLogin",{afterBookSession : this.state.afterBookSession })
      } else{
        this.setState({spinner: false})
        this.props.navigation.navigate("Payment");
      }
    })
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
              <Title style={styles.title}>Trainer</Title>
            </Body>
            <Right />
          </Header>
          {this.state.spinner === true ? (
              <View style={styles.spinnerView}>
                <Spinner color={"black"} style={styles.spinnerPosition} />
              </View>
            ):(
              <Content style={styles.content}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{this.state.trainersList.name}</Text>
                </View>
                <CardSection style={styles.singleImageContainer}>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 175}}
                      source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                    </View>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 175}}
                      source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                  </View>
                </CardSection>
                <CardSection style={styles.singleImageContainer}>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 115 }}
                      source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                    </View>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 115}}
                      source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                  </View>
                  <View style={styles.imageBig}>
                    <Image style={{ height : 150, width : 115}}
                      source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
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
                  <Text style={styles.bio}>{this.state.trainersList.text}</Text>
                </View>
                <View style={styles.calendarContainer}>
                <Text style={styles.specialityTitle}>Available Slots :</Text>
                {Object.keys(this.state.subdata).length > 0 ? (
                  <Calendar
                    onDayPress={this.onDaySelect}
                    markedDates={this.state.subdata}/>
                ) : <Spinner color="black" />}
                </View>
                <View style={{marginTop:10,alignSelf:"center"}}>
                  <Button full style={styles.bookSessionView} onPress={this.onBookSessionPressed}>
                    <View style={styles.bookSessionButton}>
                      <Text style={{color:"white"}}> Book a one hour session </Text>
                    </View>
                  </Button>
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
                 animationType="slide"
                 transparent={true}
                 visible={this.state.showModal}>
                 <View style={styles.modalView}>
                   <View style={{width: 300, alignSelf:"center", marginTop:window.height/3,height: 120,backgroundColor:"white",borderWidth:1,borderColor:"white",borderRadius:10}}>

                     <View style={{flex:0.5,justifyContent:"center",alignItems:"center",margin:10}}>
                       <Text style={{textAlign:"center",fontSize:16,fontWeight:"700"}}>{"Do you want to book this Date and time ? It costs $1.00"}</Text>
                     </View>

                     <View style={{flex:0.5,marginBottom:10,flexDirection:"row"}}>
                      <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity onPress={this.onShowModalContinue}>
                           <Text style={{textAlign:"center",fontSize:18,fontWeight:"800", color:'#009FDB'}}>Continue</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity onPress={this.onShowModalClose}>
                           <Text style={{textAlign:"center",fontSize:18,fontWeight:"800", color:'#009FDB'}}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                     </View>
                   </View>
                </View>
               </Modal>
              </Content>
          )}
      </Container>
    );
  }
}

export default ViewTrainer;
