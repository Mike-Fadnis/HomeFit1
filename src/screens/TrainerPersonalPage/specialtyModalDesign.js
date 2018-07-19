import React, { Component } from 'react'
import {Text,View,Alert,TouchableOpacity,ListView,FlatList,Image,Dimensions,AsyncStorage,ActivityIndicator} from 'react-native'
import Images from "@theme/images/images";
import API from "@utils/ApiUtils";
const window = Dimensions.get('window');
var record = []

export default class SpecialtyModalDesign extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds,
      specialtiesData: [],
      pushSelectedSpeciality:[],
      spinner: true
    }
  }
  async componentWillMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.specialtiesData)
    })
    API.getSpecialties().then(async (response) => {
      if(response){
        this.setState({specialtiesData:response.data,spinner: false})
      }else{
        this.setState({spinner: false})
        alert("Error")
      }
    })
  }
  onSpecialitiesSelected(item){
    let count = 0
    //alert(JSON.stringify(item))
    // record.push(item)
    // this.setState({pushSelectedSpeciality:record},()=>{
    //   //alert("asdf:  "+JSON.stringify(this.state.pushSelectedSpeciality))
    // })

    // this.state.pushSelectedSpeciality.map((res1, j) => {
    //   if (res1.item.id === item.item.id) {
    //       alert("if both are same this should appear")
    //     // this.state.pushSelectedSpeciality.splice(j,1)
    //     // alert("splice:  "+ JSON.stringify(this.state.pushSelectedSpeciality))
    //   }
    // })



    if(this.state.pushSelectedSpeciality.length > 0){
      this.state.pushSelectedSpeciality.map((obj,j) => {
        if(obj.item.id === item.item.id){
          this.state.pushSelectedSpeciality.splice(j, 1)
          count++          
        }
      })
      if(count === 0){
        this.state.pushSelectedSpeciality.push(item)
      }
    } else{
      this.state.pushSelectedSpeciality.push(item)
    }
    this.setState({pushSelectedSpeciality: this.state.pushSelectedSpeciality})

  }
  onPropsModalDone() {
    if (this.state.pushSelectedSpeciality.length > 0) {
      this.props.getPushedSpecialityData(this.state.pushSelectedSpeciality)
    } else {
      alert('Please select atleast one time slot')
    }
  }
  renderData(item) {
    let data1
    let images = []
    let count = 0
    this.state.pushSelectedSpeciality.map((res1, j) => {
      if (res1.item.id === item.item.id) {
        console.log("resss:  "+res1.id + ":  "+ JSON.stringify(item.item.id))
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
      <View style={{flex:1}}>
        <TouchableOpacity style={{flexGrow: 1, flexDirection: 'row', marginTop: 5, height: 55}} onPress={this.onSpecialitiesSelected.bind(this, item)}>
          <View style={{flex: 0.8,justifyContent: 'center',paddingLeft: 15}}>
            <Text style={{fontWeight:"bold",fontSize:18}}>{item.item.speciality}</Text>
          </View>
          <View style={{flex: 0.2,justifyContent: 'center',alignItems: 'flex-end',paddingRight: 20}}>
            {images}
          </View>
        </TouchableOpacity>
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
        {this.state.spinner === true ? (
          <View style={{position: 'absolute',left: 0,right: 0,top: 0,bottom: 0,alignItems: 'center',justifyContent: 'center',backgroundColor:'rgba(0,0,0,0.2)'}}>
            <View style={{height:window.width/3, width:window.width/3, backgroundColor:'white', borderRadius:20, alignItems:'center', justifyContent:'center'}}>
              <ActivityIndicator size="large" color="black"/>
            </View>
          </View>
        ):(
            <View style={{ flex: 1 }}>
              <FlatList
                data={this.state.specialtiesData}
                renderItem={this.renderData.bind(this)}
                extraData={this.state}
              />
            </View>
          )}
      </View>
    )
  }
}
