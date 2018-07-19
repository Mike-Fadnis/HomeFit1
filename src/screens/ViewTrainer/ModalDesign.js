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
export default class ModalDesign extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds,
      selectedTime: [],
      timesData: [],
      time_slot:[]
    }
  }
  componentWillMount() {
  var _selectedTimeArray = this.props.selectedTime
  _selectedTimeArray.map((res, key)=>{
      if(res.date === this.props.selectedDate){
        this.state.time_slot.push({timeSlot:res.time_slot})
      }
  })
    this.setState({ timesData: this.state.time_slot[0].timeSlot, selectedTime: [] })
  }
  onDatePressed(item) {
    var record = {date:this.props.selectedDate,time:item.item.time_slot}
    let count = 0
    if(this.state.selectedTime.length > 0){
      this.state.selectedTime.map((res,i)=>{
        if(res.time === item.item.time_slot){
          this.state.selectedTime.splice(i,1);
          count++;
        }
      })
      if(count === 0){
        this.state.selectedTime.push(record)
      }
    }else{
      this.state.selectedTime.push(record)
    }
    this.setState({ selectedTime: this.state.selectedTime }, () => {
       // alert(JSON.stringify(this.state.selectedTime))
      //this.props.getDataObj(this.state.selectedTime)
    })
  }
  onPropsModalClose() {
    this.props.onClose()
  }
  onPropsModalDone() {
    if (this.state.selectedTime.length > 0) {
      this.props.getDataObj(this.state.selectedTime)
    } else {
      alert('please select atleast one time slot')
    }
  }
  renderData(item) {
    let data1
    let images = []
    let count = 0
    this.state.selectedTime.map((res1, j) => {
      if (res1.time === item.item.time_slot) {
        data1 = 'true'
        count = count + 1
      }
      if (count === 0) {
        data1 = ''
      }
    })
    if (data1 === 'true') {
      console.log('112211:  ')
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
              {item.item.time_slot}
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
        <View style={{height: 44,backgroundColor: 'white',justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: 'grey', flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.onPropsModalDone.bind(this)}>
            <Text style={{fontSize:16, fontWeight:'800', color:'#009FDB'}}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.timesData}
            renderItem={this.renderData.bind(this)}
            extraData={this.state}
          />
        </View>
      </View>
    )
  }
}
