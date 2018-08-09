import React, { Component } from "react";
import { Text, View,Modal, TouchableOpacity, AsyncStorage, Image, Alert,TextInput} from "react-native";
import {Container,Header,Title,Content,Button,Icon,Left,Right,Body,Spinner} from "native-base";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
var ImagePicker = require("react-native-image-picker");
//var dismissKeyboard = require("dismissKeyboard");

//import { Input } from "../common";
import styles from "./styles";
import Images from "@theme/images/images";
import BillingModal from "./BillingModal";
import API from "@utils/ApiUtils";

class ClientProfile extends Component {
  constructor(){
    super();
    this.state = {
      userData: {},
      avatarSource:"",
      modalVisible: false,
      onEditButton: false,
      userName:"",
      phoneNumber:"",
      statusFalse: false,
      ifnoResponse: false,
      spinner : true,
      updatedProfileDetails:{}
    };
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onBillingInfo = this.onBillingInfo.bind(this);
  }
  componentWillMount(){
    this.fetchData();
  }
  fetchData(){
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
        var get_user = JSON.parse(getUserData);
        this.setState({userData:get_user},()=>{
          this.getClientProfileDetails(this.state.userData.id);
        });
     }).done();
  }
  getClientProfileDetails(id){
    API.getClientProfileDetails(id).then(async (response) => {
      if (response) {
        if (response.status){
          this.setState({userName: response.data.user_name,avatarSource: { uri: response.data.profile_picture },phoneNumber:response.data.phone_number,spinner:false})
        }
        else {
          Alert.alert("HomeFit",response.message);
        }
      } else {
          Alert.alert("Error","");
      }
    });
  }
  onImageUpload(){
    const options = {
      title: "Upload Picture",
      takePhotoButtonTitle: "Take Photo",
      chooseFromLibraryButtonTitle: "Choose from Library",
      quality: 0.5,
      storageOptions: {skipBackup: true},
      allowsEditing: true
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
       // this.setState({imagepicker:false});
        console.log("User cancelled photo picker");
      }
      else if (response.error) {
        console.log("ImagePickerManager Error: ", response.error);
      }
      else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        var base64 = "data:image/png;base64," + response.data;
        var string = {"action":"user_upload_image","user_id":this.state.userData.id,"data":base64};
        console.log("jfkj",this.state.userData)
        this.setState({spinner:true})
        API.uploadImage_clientPRofilepic(string).then(async (responseData) => {
          if (responseData) {
            if (responseData.status){
              this.setState({avatarSource: { uri: responseData.imaage },spinner:false})
            }
            else {
              Alert.alert("HomeFit",responseData.message);
            }
          } else {
              Alert.alert("Error","Error uploading image");
          }
        });
      }
    });
  }
  onBillingInfo(){
    this.setState({modalVisible: true});
  }
  onBillingInfoClose(){
    this.setState({modalVisible: false});
  }
  onEditButton(){
    this.setState({onEditButton: true})
    if (this.state.onEditButton === true) {
      this.postClientProfileDetails();
    }
  }
  onChangeUserName(text){
    this.setState({userName:text});
  }
  onChangePhoneNumber(text){
    this.setState({phoneNumber:text});
  }
  validPhoneNumber = PhoneNumber => {
     var phoneNumber = /^\d{10}$/
     return phoneNumber.test(PhoneNumber);
   }
  postClientProfileDetails(){
    if(this.state.avatarSource === "" || this.state.avatarSource === null){
      Alert.alert("Profile Picture","profilePicture is mandatory ");
    } else if (this.state.userName === "" || this.state.userName === null){
      Alert.alert("User Name","userName should not be empty");
    } else if (this.state.phoneNumber === "" || this.state.phoneNumber === null){
      Alert.alert("Phone Number","phoneNumber should not be empty");
    } else if (!this.validPhoneNumber(this.state.phoneNumber)) {
       Alert.alert("Phone Number","Please enter Valid phoneNumber");
    } else {
      this.setState({onEditButton:false,spinner: true})
      var ProfileDetails ={
        userId: this.state.userData.id,
        userName: this.state.userName,
        phoneNumber: this.state.phoneNumber,
        profilePicture: this.state.avatarSource.uri
      }
      API.postClientProfileDetails(ProfileDetails).then(async (response) => {
        this.setState({
          userName: "",
          phoneNumber: "",
          avatarSource:""
        })
        if (response) {
          if (response.status){
            Alert.alert("Profile Status",response.message);
            this.setState({spinner:false,userName: response.data.userName,phoneNumber: response.data.phoneNumber,avatarSource: { uri: response.data.profilePicture }});
          } else {
            Alert.alert("Profile Status",response.message);
            this.setState({spinner:false,statusFalse: true,statusFalseText: response.message});
          }
        } else {
            this.setState({spinner:false,ifnoResponse: true});
            Alert.alert("Profile Status",response.message);
        }
      });
    }
  }
  onUpdateClose(){
    //this.setState({onEditButton: false,userName: this.state.userName,phoneNumber: this.state.phoneNumber,avatarSource: this.state.avatarSource })
    this.setState({onEditButton: false,spinner:true},()=>{
      this.fetchData();
    })
  }
  render(){
      //console.log("aaaaaa: ", JSON.stringify(this.state.userData));
      return (
        <Container style={styles.container}>
          <Header style={styles.headerStyle}>
            <Left style={{flex:0.3,alignItems:"flex-start",justifyContent:"center"}}>
              {this.state.onEditButton ? (
                <Button transparent onPress={this.onUpdateClose.bind(this)}>
                  <FontAwesomeIcon name = "times-circle" size={20} color="white"/>
                </Button>
                ) : (
                <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                  <Icon name = "ios-menu" style={{color: "white"}} />
                </Button>)
              }
            </Left>
            <Body>
              <Title style={styles.title}>{this.state.userData.user_name}</Title>
            </Body>
            <Right style={{flex:0.35,alignItems:"center",justifyContent:"center"}}>
              <Button transparent full onPress={this.onEditButton.bind(this)} style={{flex:1}}>
                {this.state.onEditButton ? (
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",padding:5}}>
                      <Text style={{color:"white",fontWeight:"bold",fontSize:14}}>Update</Text>
                      <FontAwesomeIcon name="refresh" size={20} color="white" style={{paddingLeft:5}}/>
                    </View>
                ) : (
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",padding:5}}>
                      <Text style={{color:"white",fontWeight:"bold",fontSize:14,paddingRight:5}}>Edit</Text>
                      <FontAwesomeIcon name="edit" size={20} color="white" />
                    </View>
                )}
              </Button>
            </Right>
          </Header>
        {this.state.statusFalse || this.state.ifnoResponse ? (
        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"green"}}>
          {this.state.statusFalse ? (<Text> status false </Text>) : (<Text> check network connection </Text>)}
        </View>
        ) : (
        <Content>
          <View style={styles.contentStyle}>
            <View style={styles.profileImageStyle}>
              {this.state.avatarSource === "" ? (
                <View>
                  <Image source={Images.user} style={styles.avatar}/>
                    {this.state.onEditButton ? (
                    <View style={{flex:0.1,backgroundColor:"white",borderWidth:1,borderColor:"lightgrey",padding:3,position:"absolute",bottom:2,right:2}}>
                      <TouchableOpacity onPress={this.onImageUpload}>
                        <Image source={Images.cameraIcon} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                    </View>
                    ) : (<View/>)}
                </View>
                ) : (
                  <View>
                    <Image source={this.state.avatarSource} style={styles.avatar}/>
                    {this.state.onEditButton ? (
                    <View style={{flex:0.1,backgroundColor:"white",borderWidth:1,borderColor:"lightgrey",padding:3,position:"absolute",bottom:2,right:2}}>
                      <TouchableOpacity onPress={this.onImageUpload}>
                        <Image source={Images.cameraIcon} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                    </View>
                    ) : (<View/>)}
                  </View>)
              }
            </View>
            <View style={[styles.ProfileDetails,{width: null,height: null,paddingVertical:25}]} pointerEvents={this.state.onEditButton ? 'auto' : 'none'}>
              <View style={{margin:10,flexDirection:"row",padding:10}}>
                <Text style={styles.inputTextStyle}>User Name : </Text>
                <TextInput
                  style={{flex:1,fontSize:18}}
                  placeholder="For Example John Doe"
                  keyboardType = "default"
                  onChangeText={this.onChangeUserName.bind(this)}
                  value={this.state.userName}
                />
              </View>
          {/*
              <TouchableOpacity onPress={this.onImageUpload} style={{margin:10}}>
                <View style={styles.pictureViewStyle}>
                  <Text style={{flex:0.4,color:"black",fontSize:18,paddingLeft:10}}>Picture</Text>
                  <Text style={{flex:0.6,color : "#c7c7cd",paddingRight : 5,paddingLeft : 5,fontSize : 16,lineHeight : 23,}}>{this.state.avatarSource === "" ? ("No Picture") : ("Picture Selected")}</Text>
                </View>
              </TouchableOpacity>
              <TextInput
                style={{borderWidth:1,fontSize:18}}
                placeholder="+91"
                keyboardType = "default"
                onChangeText={this.onChangePhoneNumber.bind(this)}
                value={this.state.phoneNumber}
              />
          */}
              <View style={{margin:10,flexDirection:"row",padding:10}}>
                <Text style={styles.inputTextStyle}>Phone Number : </Text>
                <TextInput
                  style={{flex:1,fontSize:18}}
                  placeholder="9876543210"
                  keyboardType = "default"
                  onChangeText={this.onChangePhoneNumber.bind(this)}
                  value={this.state.phoneNumber}
                />
              </View>
              <TouchableOpacity onPress={this.onBillingInfo} style={{margin:10}}>
                <View style={styles.billingInfoViewStyle}>
                  <Text style={{flex:0.4,color:"black",fontSize:18,paddingLeft:10}}>Billing Info : </Text>
                  <Text style={{flex:0.6,color : "#c7c7cd",paddingRight : 5,paddingLeft : 5,fontSize : 18,lineHeight : 23,}}>Update Billing Info</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <BillingModal onClose={this.onBillingInfoClose.bind(this)}/>
          </Modal>
        </Content>
        )}
        {this.state.spinner ? (
        <View style={styles.container_spinner}>
          <View style={styles.spinnerView}>
            <Spinner size="large" color="black"/>
          </View>
        </View>
        ) : (null)}
        </Container>
      );
  }
}

export default ClientProfile;
