import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body} from "native-base";
var ImagePicker = require('react-native-image-picker');

import { Input, Card, CardSection } from '../common';
import styles from "./styles";
import Images from "@theme/images/images";
import BillingModal from "./BillingModal";

class ClientProfile extends Component {
  constructor(){
    super()
    this.state ={
      userData: {},
      avatarSource:"",
      modalVisible: false
    }
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onBillingInfo = this.onBillingInfo.bind(this);
  }
  componentWillMount(){
    this.fetchData();
  }
  fetchData(){
    AsyncStorage.getItem('@getUserData:key', (err, getUserData) => {
        var get_user = JSON.parse(getUserData)
        this.setState({
          userData:get_user
        })
     }).done()
  }
  onImageUpload(){
    const options = {
      title: "Upload Picture",
      takePhotoButtonTitle: "Take Photo",
      chooseFromLibraryButtonTitle: "Choose from Library",
      quality: 0.5,
      storageOptions: {
        skipBackup: true
      },
      allowsEditing: true
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
       // this.setState({imagepicker:false});
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {

        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;
        if (Platform.OS === "android") {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace("file://", ""), isStatic: true};
        }
        this.setState({
          avatarSource: source
        });
      }
      });
  }
  onBillingInfo(){
    this.setState({modalVisible: true})
  }
  onBillingInfoClose(){
    this.setState({modalVisible: false})
  }
  render(){
      console.log("aaaaaa: ", JSON.stringify(this.state.userData))
      return(
        <Container style={styles.container}>
          <Header style={styles.headerStyle}>
            <Left style={styles.ham}>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name = "ios-menu" style={{color: "white"}} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>{this.state.userData.user_name}</Title>
            </Body>
            <Right/>
          </Header>
          <Content>
            <View style={styles.contentStyle}>
              <View style={styles.profileImageStyle}>
                {this.state.avatarSource === "" ? (
                  <Image source={Images.user} style={{width:120,height:120}}/>
                ):(
                  <Image source={this.state.avatarSource} style={styles.avatar}/>
                  )}

              </View>
              <View style={styles.ProfileDetails}>
                  <View style={{margin:10}}>
                    <Input
                      label="User Name"
                      placeholder="For Example John Doe"
                      keyboardType = "default"
                    />
                  </View>
                  <TouchableOpacity onPress={this.onImageUpload} style={{margin:10}}>
                    <View style={styles.pictureViewStyle}>
                      <Text style={{flex:0.4,color:"black",fontSize:18,paddingLeft:10}}>Picture</Text>
                      <Text style={{flex:0.6,color : '#c7c7cd',paddingRight : 5,paddingLeft : 5,fontSize : 16,lineHeight : 23,}}>{this.state.avatarSource === "" ? ("No Picture"):("Picture Selected")}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{margin:10}}>
                    <Input
                      label="Phone Number"
                      placeholder="+91 9876543210"
                      keyboardType = "default"
                    />
                  </View>
                  <TouchableOpacity onPress={this.onBillingInfo} style={{margin:10}}>
                    <View style={styles.pictureViewStyle}>
                      <Text style={{flex:0.4,color:"black",fontSize:18,paddingLeft:10}}>Billing Info</Text>
                      <Text style={{flex:0.6,color : '#c7c7cd',paddingRight : 5,paddingLeft : 5,fontSize : 16,lineHeight : 23,}}>You can update/Edit here</Text>
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
        </Container>
      );
  }
}

export default ClientProfile;
