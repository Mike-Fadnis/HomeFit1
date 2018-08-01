import React, { Component } from "react";
import {Text,View,TouchableOpacity,ListView,FlatList,Image} from "react-native";
import Images from "@theme/images/images";

// var rowData = [];
var selectedTime = [];
export default class ModalDesign extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      selectedTime: [],
      timesData: [],
      time_slot:[],
      forEmptyTimeSlot: false,
      indexValue:null,
      duplicateArray:[]
    };
  }
  componentWillMount() {
  var _selectedTimeArray = this.props.selectedTime;
  _selectedTimeArray.map((res, key)=>{
      if (res.date === this.props.selectedDate){
        this.state.time_slot.push({timeSlot:res.time_slot});
      }
  });
    if (this.state.time_slot === [] || this.state.time_slot.length === 0){
      console.log("jjkkll:  ", JSON.stringify(this.state.time_slot));
      this.setState({forEmptyTimeSlot: true},()=>{
        console.log("Hiiii123");
      });
    } else {
      this.setState({ forEmptyTimeSlot: false,timesData: this.state.time_slot[0].timeSlot, selectedTime: [] });
    }

  }
  // onDatePressed(item) {
  //   var record = {date:this.props.selectedDate,time:item.item.time_slot};
  //   let count = 0;
  //   if (this.state.selectedTime.length > 0){
  //     this.state.selectedTime.map((res,i)=>{
  //       if (res.time === item.item.time_slot){
  //         this.state.selectedTime.splice(i,1);
  //         count++;
  //       }
  //     });
  //     if (count === 0){
  //       this.state.selectedTime.push(record);
  //     }
  //   } else {
  //     this.state.selectedTime.push(record);
  //   }
  //   this.setState({ selectedTime: this.state.selectedTime }, () => {
  //      // alert(JSON.stringify(this.state.selectedTime))
  //     // this.props.getDataObj(this.state.selectedTime)
  //   });
  // }
  onPropsModalClose() {
    this.props.onClose();
  }
  onPropsModalDone() {
      if (this.state.duplicateArray.length > 0) {
        var finalArray = []
        var rec = {date:this.props.selectedTime[0].date, time:this.state.duplicateArray[0].time_slot}
        finalArray.push(rec)
        // console.log("this.state.selectedTime@@@@@: ",finalArray)
        this.props.getDataObj(finalArray)
      } else {
        alert('please select atleast one time slot')
      }
  }
  onSingleSelection(item, index){
    this.setState({
      indexValue:index
    },()=>{
      this.state.duplicateArray.push(item)
    })
  }
  renderData = ({item, index}) =>  {
    // let data1;
    // let images = [];
    // let count = 0;
    // this.state.selectedTime.map((res1, j) => {
    //   if (res1.time === item.item.time_slot) {
    //     data1 = "true";
    //     count = count + 1;
    //   }
    //   if (count === 0) {
    //     data1 = "";
    //   }
    // });
    // if (data1 === "true") {
    //   console.log("112211:  ");
    //   images.push(
    //       <Image source={Images.checked} style={{height:20,width:20}} />
    //   );
    // } else {
    //   images.push(<View />);
    // }
    return (
      <View style={{flexGrow: 1, flexDirection: "row", marginTop: 5, height: 55}}>
        <View style={{flex: 0.8,justifyContent: "center",paddingLeft: 15}}>
          <TouchableOpacity onPress={this.onSingleSelection.bind(this, item,index)}>
            <Text style={{ color: "black", fontSize: 18 }}>
               {item.time_slot}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.2,justifyContent: "center",alignItems: "flex-end",paddingRight: 20}}>
          {this.state.indexValue === index ?(<Image source={Images.checked} style={{height:20,width:20}} />):(null)}
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }}/>

          {this.state.forEmptyTimeSlot === true ? (
            <View style={{height: 44,backgroundColor: "white",justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: "grey", flexDirection: "row"}}>
              <TouchableOpacity onPress={this.props.onClose}>
                <Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{height: 44,backgroundColor: "white",justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: "grey", flexDirection: "row"}}>
              <TouchableOpacity onPress={this.props.onClose}>
                <Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPropsModalDone.bind(this)}>
                <Text style={{fontSize:16, fontWeight:"800", color:"#009FDB"}}>Done</Text>
              </TouchableOpacity>
            </View>
          )}


      {this.state.forEmptyTimeSlot === true ? (
        <View>
          <Text> Nothing to display</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.timesData}
            renderItem={this.renderData.bind(this)}
            extraData={this.state}
          />
        </View>
      )}
      </View>
    );
  }
}
