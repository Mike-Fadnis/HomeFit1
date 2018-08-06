import React, { Component } from "react";
import {Container, Header, Title, Content, Spinner, Icon, Button, Left, Right, Body} from "native-base";
import { Text, View, Image, FlatList, Alert } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Card, CardSection } from "../common";
import styles from "./styles";
import API from "@utils/ApiUtils";
class BrowseTrainers extends Component {
  constructor(props){
    super(props);
    this.state = {
      trainersList: [],
      spinner: true,
      text:"",
      searchedvalue:"",
      specialitySearchedValue:"",
      specialitiesData:[],
      allSpecialtiesList:[],
      newallSpecialtiesListArray:[],
      specailityDatabyId:[],
      ifnoResponse: false,
      notrainerData: false
    };
    this.onChangeDropdown = this.onChangeDropdown.bind(this);
    this.onSpecialityChangeDropdown = this.onSpecialityChangeDropdown.bind(this);
  }
  async componentWillMount() {
    this.fetchTrainerList();
  }
  fetchTrainerList(){
    API.getTrainerList().then(async (response) => {
      if (response) {
        if (response.status){
           var newarray = this.checkDuplicates(response.data);
           this.setState({trainersList: newarray,spinner:false});
        } else {
          Alert.alert("HomeFit",response.message);
        }
      } else {
        this.setState({spinner:false,ifnoResponse: true});
      }
    });
  }
  onChangeDropdown(item,index){
    this.setState({searchedvalue : item},()=>{
       this.getTrainersList();
    });
  }
  onSpecialityChangeDropdown(item,index){
    this.setState({specialitySearchedValue : item},()=>{
      let me = this.refs.specialityref;
      var selectedItem =  me.selectedItem();
      this.setState({spinner: true});
      this.getTrainersBySpecialityId(selectedItem.id);
    });
  }
  getTrainersList(){
    let filterdkey = this.state.searchedvalue;
    if (filterdkey === "Highest rated") {
      this.setState({spinner : true});
      API.getHighestRatedTrainerList().then(async (response) => {
        if (response) {
          if (response.status){
          var newarray = this.checkDuplicates(response.data);
           var sortedArray = newarray.sort(function(a, b){
              return parseFloat(b.avg_rating) - parseFloat(a.avg_rating);
           });
           this.setState({trainersList: sortedArray,spinner:false});
          } else {
            this.setState({spinner:false,notrainerData: true,notrainerDataText: response.message});
          }
        } else {
          this.setState({spinner:false,ifnoResponse: true});
        }
      });
    } else if (filterdkey === "Most no. of sessions"){
        this.setState({spinner : true});
        API.getTrainersWithMostSessions().then(async (response) => {
          if (response) {
            if (response.status){
              var newarray = this.checkDuplicates(response.data);
              var sortedArray = newarray.sort(function(a, b){
                return b.num_of_sessions - a.num_of_sessions;
              });
              this.setState({trainersList: sortedArray,spinner:false});
            } else {
              this.setState({spinner:false,notrainerData: true,notrainerDataText: response.message});
            }
          } else {
            this.setState({spinner:false,ifnoResponse: true});
          }
        });
    } else if ( filterdkey === "speciality"){
        this.setState({spinner: true});
        API.getAllSpecialties().then(async (response) => {
          if (response){
            if (response.status){
              this.setState({allSpecialtiesList: response.data,spinner:false},()=>{
                var specialitiesListArray = [];
                 response.data.map((res,i)=>{
                  var rec = {
                     id:res.id,
                     value: res.speciality,
                     status:res.status
                    };
                  specialitiesListArray.push(rec);
                 });
                 this.setState({newallSpecialtiesListArray : specialitiesListArray});
              });
            } else {
              this.setState({spinner:false,notrainerData: true,notrainerDataText: response.message});
            }
          } else {
            this.setState({spinner:false,ifnoResponse: true});
          }
        });
    } else if ( filterdkey === "male"){
        this.setState({spinner : true});
        var maleId = 0;
        API.getTrainersByGender(maleId).then(async (response) => {
          if (response) {
            if (response.status) {
              var newarray = this.checkDuplicates(response.data);
              this.setState({trainersList: newarray,spinner:false});
            } else {
              this.setState({spinner:false,notrainerData: true,notrainerDataText: response.message});
            }
          } else {
            this.setState({spinner:false,ifnoResponse: true});
          }
        });
    } else if ( filterdkey === "female"){
        this.setState({spinner : true});
        var femaleId = 1;
        API.getTrainersByGender(femaleId).then(async (response) => {
          if (response) {
            if (response.status){
              var newarray = this.checkDuplicates(response.data);
              this.setState({trainersList: newarray,spinner:false});
            } else {
              this.setState({spinner:false,notrainerData: true,notrainerDataText: response.message});
            }
          } else {
            this.setState({spinner:false,ifnoResponse: true});
          }
        });
      }
  }
  getTrainersBySpecialityId(id){
    this.setState({spinner : true});
    API.getTrainersBySpecialityId(id).then(async (response) => {
      if (response) {
        if (response.status){
          var newarray = this.checkDuplicates(response.data);
          var sortedArray = newarray.sort(function(a, b){
            return parseFloat(b.avg_rating) - parseFloat(a.avg_rating);
          });
          this.setState({trainersList: sortedArray,spinner:false});
        } else {
          this.setState({spinner:false,notrainerData: true,notrainerDataText: response.message});
        }
      } else {
        this.setState({spinner:false,ifnoResponse: true});
      }
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
             // else {
             //   count = 0
             // }
          }
          r.push(a[i]);
       }
       return r;
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
    var rating = "";
    if (item.item.avg_rating === null || item.item.avg_rating === undefined ){
      rating = 0.0;
    } else {
      rating = item.item.avg_rating.substring(0, item.item.avg_rating.length - 3);
    }
    return (
    <Card onPress={() => this.props.navigation.navigate("ViewTrainer",{trainersList: item,keyValue:false,keyViewTrainer:"undefined"})}>
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
  _keyExtractor = (item, index) => item.id;
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
              <Icon name="ios-arrow-back" style={{color: "white",width:30,height:30}}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Browse</Title>
          </Body>
          <Right />
        </Header>
      {this.state.ifnoResponse === true || this.state.notrainerData === true ? (
        <View style={{flex:1,alignItems:"center",marginTop:25}}>
          {this.state.ifnoResponse === true ? (
            <Text>Please Check Your Network Connection</Text>
            ) : (
              <Text>{this.state.notrainerDataText}</Text>
            )}
        </View>
      ) : (
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
            {this.state.searchedvalue === "speciality" ? (
            <Dropdown
               label={this.state.specialitySearchedValue === "" ? "Select Search Speciality.." : ""}
               data={this.state.newallSpecialtiesListArray}
               value={this.state.specialitySearchedValue}
               dropdownPosition={0}
               onChangeText={this.onSpecialityChangeDropdown}
               ref={"specialityref"}
               inputContainerStyle={{borderBottomColor:"transparent"}}
               containerStyle={{borderWidth:1,borderColor:"#009FDB",height:50,justifyContent:"center",paddingBottom:10,paddingLeft:10,marginLeft:5,marginRight:5,marginTop:5}}
             />
            ) : (<View/>)}
            {this.state.spinner === true ? (
                <Spinner size="large" color="black"/>
            ) : (
              <FlatList
                data={this.state.trainersList}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                removeClippedSubviews={false}
                renderItem={this.renderData.bind(this)}
                />
            )}
          </View>
        </Content>
      )}
      </Container>
    );
  }
}

export default BrowseTrainers;
