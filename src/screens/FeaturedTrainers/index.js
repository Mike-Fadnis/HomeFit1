import React, { Component } from "react";
import {Container,Header,Title,Content,Spinner,Icon,Button,Left,Right,Body} from "native-base";
import {  Text, View, Image, FlatList } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Card, CardSection } from "../common";
import styles from "./styles";
import API from "@utils/ApiUtils";


class FeaturedTrainers extends Component {
  constructor(props){
    super(props);
    this.state = {
      trainersList:[],
      spinner:true,
      searchedvalue:"",
      specialitiesArray:[],
      specialityvalue:"",
      emptyText:true,
      emptyResponseData:''
    };
    this.onChangeDropdown = this.onChangeDropdown.bind(this);
    this.onSpecialityChangeDropdown = this.onSpecialityChangeDropdown.bind(this);
  }
async componentWillMount(){
  this.fetchTrainerList();
}
fetchTrainerList(){
  API.getFeaturedTrainersList().then(async (response) => {
    if (response){
      if (response.status){
        var newarray = this.checkDuplicates(response.data);
        this.setState({trainersList: response.data,spinner:false,emptyText:false});
      }else{
        this.setState({spinner:false,emptyText:true, emptyResponseData:response.status});
      }
    } else {
      this.setState({spinner:false});
      alert("error");
    }
  });
}
renderData(item){
  var res =  item.item.name.split(" ");
  var firstname = "";
  var lastname = "";
  if (res[1] === undefined) {
      firstname = res[0].charAt(0);
      lastname = "";
  } else {
      firstname = res[0].charAt(0);
      lastname = res[1].charAt(0);
  }
  var rating = ""
  if(item.item.avg_rating === null || item.item.avg_rating === undefined ){
      rating = 0.0
  }else{
     rating = item.item.avg_rating.substring(0, item.item.avg_rating.length - 3)
  }

  // var rating = sub_rating
  console.log("RATINGGGGG:::@@@ ",rating)
  return (
  <Card onPress={() => this.props.navigation.navigate("ViewTrainer",{trainersList: item,keyValue:true})}>
    <CardSection>
        <View style={styles.trainerImage}>
          {item.item.image === "" ? (
            <View style={styles.emptyImageStyle}><Text style={styles.emptyImageTextStyle}>{firstname.toUpperCase()}{lastname.toUpperCase()}</Text></View>
              ) : (
                <Image style={styles.trainerImage} source={{uri : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg"}} />
                )
          }
        </View>
        <View style={styles.trainerDescription}>
            <Text style={styles.descriptionLine}> Name : {item.item.name} </Text>
            <Text style={styles.descriptionLine}> Rating : {rating}/10 </Text>
            <View style={{flex: 1}}>
              <Text numberOfLines={2} style={styles.descriptionLine3}>
                  {item.item.review}
              </Text>
            </View>
        </View>
    </CardSection>
  </Card>
  );
}
onChangeDropdown(item,index){
  this.setState({
    searchedvalue : item
  },()=>{
     this.getTrainersList();
  });
}
checkDuplicates(a) {
  var r = [];
  var count = 0;
  o: for (var i = 0, n = a.length; i < n; i++){
     for (var x = 0, y = r.length; x < y; x++){
        if (r[x].id === a[i].id){
           continue o;
        }

     }
     r.push(a[i]);
  }
  //Return the reconstructed array of unique values
  return r;
}

getTrainersList(){
  let filterdkey = this.state.searchedvalue;
  if (filterdkey === "Highest rated") {
    this.setState({
      spinner : true
    });
    API.getHighestRatedTrainerList().then(async (response) => {
      if (response) {
        if(response.status){
          var newarray = this.checkDuplicates(response.data);
           var sortedArray = newarray.sort(function(a, b){
              return parseFloat(b.avg_rating) - parseFloat(a.avg_rating);
           });
           this.setState({trainersList: sortedArray,spinner:false,emptyText:false});
        }else{
          this.setState({spinner:false,emptyText:true, emptyResponseData:response.message});
          Alert.alert("Homefit", response.message);
        }
      } else {
        this.setState({spinner:false});
        Alert.alert("Error");
      }
    });
  } else if (filterdkey === "Most no. of sessions"){
      this.setState({
        spinner : true
      });
      API.getTrainersWithMostSessions().then(async (response) => {
        if (response) {
          if(response.status){
            var newarray = this.checkDuplicates(response.data);
             var sortedArray = newarray.sort(function(a, b){
                return b.num_of_sessions - a.num_of_sessions;
             });
             console.log("PPLLLMMKKAASS: ",sortedArray)
             this.setState({trainersList: sortedArray,spinner:false,emptyText:false});
          }
          else{
            this.setState({spinner:false,emptyText:true, emptyResponseData:response.message});
          }
        } else {
          this.setState({spinner:false});
          Alert.alert("Error");
        }
      });
  }else if(filterdkey === "speciality"){
    this.setState({
      spinner : true
    });
    API.getAllSpecialties().then(async (response) => {
      // console.log("RESPONSEDATAAAA@@@@@: ",response.data)
      if (response) {
        if(response.status){
          response.data.map((res, key)=>{
            var record = { id:res.id ,value: res.speciality}
            this.state.specialitiesArray.push(record)
          })
          this.setState({
            spinner : false
          })
        }else{
          this.setState({spinner:false});
          Alert.alert(response.message,'');
        }
        // this.setState({specialitiesArray: response.data,spinner:false});
        console.log("RESPONSEDATAAAA@@@@@wwwwww:", this.state.specialitiesArray)
      } else {
        this.setState({spinner:false});
        Alert.alert("Error");
      }
    });
  }else if(filterdkey === "male"){
    this.setState({
      spinner : true
    });
    var id = 0
    API.getTrainersByGender(id).then(async (response) => {
      console.log("RESPONSEDATAAAA@@@@@: ",response.data)
      if (response) {
        if(response.status){
          var newResponseArray = this.checkDuplicates(response.data);
           this.setState({trainersList: newResponseArray,spinner:false, emptyText:false});
        }else{
          this.setState({spinner:false, emptyResponseData:response.message,emptyText:true});
        }
      } else {
        this.setState({spinner:false});
        Alert.alert("Error");
      }
    });
  }else if(filterdkey === "female"){
    this.setState({
      spinner : true
    });
    var id = 1
    API.getTrainersByGender(id).then(async (response) => {
        if (response) {
          if(response.status){
        var newResponseArray = this.checkDuplicates(response.data);
        this.setState({
          spinner : false,
          trainersList:newResponseArray,
          emptyText:false
        })
      }else{
        this.setState({spinner:false, emptyResponseData:response.message,emptyText:true});
      }
      } else {
        this.setState({spinner:false});
        Alert.alert("Error");
      }
    });
  }
}
onSpecialityChangeDropdown(item,index){
  this.setState({specialityvalue : item},()=>{
    let me = this.refs.specialityref;
    var selectedItem =  me.selectedItem();
    this.setState({spinner: true});
    this.getTrainersBySpeciality(selectedItem.id);
  });
}
getTrainersBySpeciality(id){
  API.getTrainersBySpecialityId(id).then(async (response) => {
    if (response) {
      if(response.status){
       var newarray = this.checkDuplicates(response.data);
        this.setState({trainersList: response.data,spinner:false,emptyText:false});
    }else{
        this.setState({spinner:false, emptyResponseData:response.message,emptyText:true});
    }
    } else {
      this.setState({spinner:false});
      Alert.alert("Error");
    }
  });
}
render() {
  let data = [{
       value: "Highest rated",
     }, {
       value: "Most no. of sessions",
     }, {
       value: "speciality",
     },{
       value: "available right now",
     },{
       value: "male",
     },{
       value: "female",
     }];
  return (
    <Container style={styles.container}>
      <Header style={styles.headerStyle}>
        <Left style={styles.ham}>
          <Button style={styles.ham} transparent onPress={() => this.props.navigation.navigate("ClientHome")}>
              <Icon name="ios-arrow-back" style={{color: "white"}}/>
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>Featured</Title>
        </Body>
        <Right />
      </Header>


        <Content padder>
          <View style={styles.container}>
          <Dropdown
             label={this.state.searchedvalue === "" ? "Select Search Type.." : ""}
             data={data}
             value={this.state.searchedvalue}
             dropdownPosition={0}
             onChangeText={this.onChangeDropdown}
             inputContainerStyle={{borderBottomColor:"transparent"}}
             containerStyle={{borderWidth:1,borderColor:"#009FDB",height:50,justifyContent:"center",paddingBottom:10,paddingLeft:10,marginLeft:5,marginRight:5}}
           />
           {this.state.searchedvalue === "speciality"?(
             <Dropdown
               label={this.state.specialityvalue === "" ? "Select Speciality.." : ""}
               data={this.state.specialitiesArray}
               value={this.state.specialityvalue}
               dropdownPosition={0}
               ref={"specialityref"}
               onChangeText={this.onSpecialityChangeDropdown}
               inputContainerStyle={{borderBottomColor:"transparent"}}
               containerStyle={{borderWidth:1,borderColor:"#009FDB",height:50,justifyContent:"center",margin:5,padding:10}}
              />
           ):(null)}
          {this.state.spinner === true ? (
               <Spinner size="large" color="black"/>
           ) : this.state.emptyText === true ?(
             <Text>{this.state.emptyResponseData}</Text>
           ):(
            <FlatList
              data={this.state.trainersList}
              keyExtractor={(x, i) => x.id}
              renderItem={this.renderData.bind(this)}
              />)}
          </View>
        </Content>

    </Container>
  );
  }
}

export default FeaturedTrainers;
