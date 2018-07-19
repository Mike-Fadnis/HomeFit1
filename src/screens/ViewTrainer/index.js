import React, { Component } from "react";
import { View, ScrollView, Image ,Modal} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { Calendar } from 'react-native-calendars'
import { Card, CardSection } from '../common';
import styles from "./styles";
import moment from 'moment'
import API from "@utils/ApiUtils";
const _format = 'YYYY-MM-DD'
import ModalDesign from "./ModalDesign"
const image  = [
  {
      "id" : 3,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/image4.jpeg"
  }
];
var finalRecordData = []
class ViewTrainer extends Component {
  initialState = {}
  constructor() {
    super()
    this.state = {
      _markedDates: this.initialState,
      getSelectedTime: [],
      _selectedDay: '',
      modalVisible: false,
      finalSelectedDates: [],
      getSelectedTime: [],
      slotsAlloted:[],
      finalResponseArray:[],
      subdata:{}
    }
    this.onModalOpen = this.onModalOpen.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
  }
  onDaySelect = day => {
    const _selectedDay = moment(day.dateString).format(_format)
    this.setState({ _selectedDay: _selectedDay })
    let selected = true
    let markedDates = {}
    if (this.state._markedDates[_selectedDay]) {
      selected = !this.state._markedDates[_selectedDay].selected
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
          this.state.finalSelectedDates.splice(i, 1)
          console.log('1456:  ', JSON.stringify(this.state.finalSelectedDates))
        } else {
          this.onModalOpen(true)
        }
      })
    } else {
      this.onModalOpen(true)
    }
  }
  onModalOpen(visible) {
    this.setState({ modalVisible: visible })
  }
  onModalClose() {
    this.setState({ modalVisible: false })
  }
  getDataObj(getSelectedTime) {
    this.setState({ getSelectedTime: getSelectedTime }, () => {
      let finalRecord = {
        date: this.state._selectedDay,
        time: this.state.getSelectedTime
      }
      finalRecordData.push(finalRecord)
      this.setState({ finalSelectedDates: getSelectedTime }, () => {
      console.log("PICKED HOURS AND DATES",this.state.finalSelectedDates)
        this.setState({ modalVisible: false })
      })
    })
  }
  componentWillMount(){
    var Id="16"
     API.getAvailableSlots(Id).then(async (response) => {
       this.setState({
         slotsAlloted:response.data
       },()=>{
         this.getNewResponse()
       })
       var subdata = {};
       response.data.map((res,i)=>{
         var date = moment(res.date).format(_format);
         subdata[date] = {selected: true}
       })
       this.setState({subdata:subdata})
       var record = {subdata}
       console.log("recordDate",record)
        }).catch((error)=>{
        this.setState({isLoading:false})
          console.log("Console Error",error);
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
    },()=>{
      // alert(JSON.stringify(this.state.finalResponseArray))
    });
  }
  render() {
    return (
      <ScrollView>
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

        <Content style={styles.content}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>John Doe</Text>
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
            <Text style={styles.bio}>
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            </Text>
          </View>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={this.onDaySelect}
              markedDates={this.state.subdata}/>
          </View>
          <View style={styles.book}>
            <Text style={styles.bookText}>
              BOOK SESSION NOW! ONLY {"$34.99"}
            </Text>
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
        </Content>
      </Container>
    </ScrollView>
    );
  }
}

export default ViewTrainer;
