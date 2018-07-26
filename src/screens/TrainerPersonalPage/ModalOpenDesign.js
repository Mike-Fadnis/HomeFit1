import React, { Component } from 'react'
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Modal,
  ListView,
  FlatList,
  Image
} from 'react-native'
import moment from 'moment'
import Images from "@theme/images/images";

var rowData = []
var selectedTime = []
export default class ModalOpenDesign extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds,
      selectedTime: [],
      timesData: []
    }
  }
  componentWillMount() {
  console.log("SELECTED_DATE",this.props.selectedDate)
  console.log("SELECTED_TIMES",this.props.selectedTimes)
    selectedTime = []
    var times = []
    var periods = ['AM', 'PM']
    var hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    var prop = null
    var hour = null
    var min = null
    for (prop in periods) {
      for (hour in hours) {
        let present = hours[hour]
        let nexthour
        if (hours[parseInt(hour) + 1]) {
          nexthour = hours[parseInt(hour) + 1]
        } else {
          nexthour = hours[0]
        }
        var rec =('0' + hours[hour]).slice(-2) +
            ' ' +
            periods[prop] +
            ' ' +
            '-' +
            ' ' +
            ('0' + nexthour).slice(-2) +
            ' ' +
            periods[prop]

        times.push(rec);
      }
    }
    this.setState({ timesData: times, selectedTime: [] }, () => {
      if (this.props.selectedTimes) {
        this.props.selectedTimes.map((res,i)=>{
          var record = {date:this.props.selectedDate,time:res.time}
          this.state.selectedTime.push(record);
        });
      }
    });
  }
  componentWillReceiveProps(newProps){
    console.log("newprops",newProps)
  }
  onDatePressed(item) {
    let count = 0
    var record = {date:this.props.selectedDate,time:item.item}
     if (this.state.selectedTime.length === 0) {
       this.state.selectedTime.push(record)
       console.log("comparism",  this.state.selectedTime)
     } else {
       this.state.selectedTime.map((res, i) => {
         if (item.item === res.time) {
            //
             count++;
             Alert.alert(
              'Home FIt',
              'Do you want to remove this Time slot ?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'YES', onPress: () =>{
                   this.state.selectedTime.splice(i, 1);
                   this.setState({selectedTime: this.state.selectedTime})
                }},
              ],
              { cancelable: false }
            )
         }
       })
       if (count === 0) {
          console.log("count ++000")
          this.state.selectedTime.push(record);
        }else{
          console.log("count ++000")
        }
     }
     this.setState({
       selectedTime: this.state.selectedTime
     })
  }
  onPropsModalClose() {
    this.props.onClose(this.state.selectedTime)
  }
  onPropsModalDone() {
    if (this.state.selectedTime.length > 0) {
      this.props.getDataObj(this.state.selectedTime)
    } else {
      Alert.alert("Home Fit","You Did not select any timeslot do you want to close ?",[
       {text: "NO", onPress: () => console.log("Cancel Pressed")},
       {text: "YES", onPress: () =>{
         this.props.onRemoveTimeSlots(this.props.selectedDate)
       }},
     ])
    }
  }
  renderData(item) {
    let data1
    let images = []
    let count = 0
    this.state.selectedTime.map((res1, j) => {
      if (res1.time === item.item) {
        data1 = 'true'
        count = count + 1
      }
      if (count === 0) {
        data1 = ''
      }
    })
    if (data1 === 'true') {
      images.push(
          <Image source={Images.checked} style={{height:20,width:20}} />
      )
    } else {
      images.push(<View />)
    }
    return (
      <View style={{flexGrow: 1, flexDirection: 'row', marginTop: 5, height: 55}}>
        <View style={{flex: 0.8,justifyContent: 'center',paddingLeft: 15}}>
          <TouchableOpacity onPress={this.onDatePressed.bind(this, item)}>
            <Text style={{ color: 'black', fontSize: 18 }}>
              {item.item}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.2,justifyContent: 'center',alignItems: 'flex-end',paddingRight: 20}}>
          {images}
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }}/>
        <View style={{height: 44,backgroundColor: 'white',justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: 'grey', flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.props.onClose}>
            <Text style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPropsModalDone.bind(this)}>
            <Text style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.timesData}
            removeClippedSubviews={true}
            renderItem={this.renderData.bind(this)}
            extraData={this.state}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </View>
    )
  }
}
