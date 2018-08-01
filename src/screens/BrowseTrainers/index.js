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
      searchedvalue:""
    };
    this.onChangeDropdown = this.onChangeDropdown.bind(this);
  }
  async componentWillMount() {
    this.fetchTrainerList();
  }
  fetchTrainerList(){
    API.getTrainerList().then(async (response) => {
      if (response) {
        this.setState({trainersList: response.data,spinner:false});
      } else {
        this.setState({spinner:false});
        Alert.alert("Error");
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
              <Text style={styles.descriptionLine}> Rating : {item.item.avg_rating.substring(0, item.item.avg_rating.length - 3)}/10 </Text>
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
  getTrainersList(){
    let filterdkey = this.state.searchedvalue;
    if (filterdkey === "Highest rated") {
      this.setState({
        spinner : true
      });
      API.getHighestRatedTrainerList().then(async (response) => {
        if (response) {
          var sortedArray = response.data.sort(function(a, b){
             return parseFloat(b.avg_rating) - parseFloat(a.avg_rating);
          });
          this.setState({trainersList: sortedArray,spinner:false});
        } else {
          this.setState({spinner:false});
          Alert.alert("Error");
        }
      });
    }
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
            <Title style={styles.title}>Browse</Title>
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
                 containerStyle={{borderWidth:1,borderColor:"#009FDB",height:50,justifyContent:"center",paddingBottom:10,paddingLeft:10,marginLeft:5,marginRight:5}}
               />
               {this.state.spinner === true ? (
                    <Spinner size="large" color="black"/>
                ) : (
                  <FlatList
                    data={this.state.trainersList}
                    keyExtractor={(x, i) => x.id}
                     removeClippedSubviews={false}
                    renderItem={this.renderData.bind(this)}
                    />
                )}
            </View>
          </Content>
      </Container>
    );
  }
}

export default BrowseTrainers;
