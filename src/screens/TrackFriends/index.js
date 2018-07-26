import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Spinner,
  Body,
  Left,
  Right,
  View
} from "native-base";
import { AsyncStorage, FlatList, Alert ,Text, Dimensions, TouchableOpacity, Modal,Image } from 'react-native';
import { Input, Card, CardSection } from '../common';
import styles from "./styles";
import { filter } from 'ramda'
import ModalShowFriends from './ModalShowFriends';
import ModalFriendDetails from "./ModalFriendDetails";
import Images from "@theme/images/images";


const windowSize = Dimensions.get('window');
const friends=[
    {
        "name":"John",
        "id":1,
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Mike",
        "id":2,
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Millin",
        "id":3,
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"George",
        "id":4,
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Friend",
        "id":5,
        "image":Images.noimage,
        "description":"description description description"
    },
    {
        "name":"Friend 1",
        "id":6,
        "image":Images.noimage,
        "description":"description description description"
    },
    {
        "name":"Friend 2",
        "id":7,
        "image":Images.noimage,
        "description":"description description description"
    }
]
class TrackFriends extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner:true,
            clientDetails:null,
            text:"",
            friendsArray:[],
            FriendModal:false,
            FriendAdded:[],
            friendDetailsModal:false
        }
    }
    componentWillMount(){
        AsyncStorage.getItem("@getUserData:key", (err,getUserData) => {
            var showUserData = JSON.parse(getUserData);
            //alert(JSON.stringify(showUserData))
            if (showUserData){
              this.setState({clientDetails: showUserData},()=>{
                  console.log("userdetails",this.state.clientDetails)
                  this.setState({spinner: false})
              })
            } else {
              this.setState({spinner: false})
            }
            if (err) {

            }
          })
    }
    onUsername(item,index){
        
        if (this.state.FriendAdded.includes(item)) {
           this.setState({friendDetailsModal:true})
        } else {
            Alert.alert(
                "Home Fit",
                "Do You Want to add him as friend?",
                [
                  {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'YES', onPress: () => {
                      this.onAddFriend(item)
                  }},
                ],
                { cancelable: false }
              )
        }
       
    }
    onAddFriend(item){
        let count = 0;
        if (this.state.FriendAdded.length > 0 ) {
            this.state.FriendAdded.map((res,i)=>{
                if(res.id === item.id){
                    count ++ ;
                }
            })
        } else {
            this.state.FriendAdded.push(item);
        }
        console.log("FRiendadded",this.state.FriendAdded)
        this.setState({
            FriendAdded  : this.state.FriendAdded
        })
    }
    renderData = ({item,index,section}) => {
        let data1;
        let images = [];
        let count = 0;
        this.state.FriendAdded.map((res1, j) => {
        if (res1.id === item.id) {
            data1 = 'true'
            count = count + 1;
        }
        if (count === 0) {
            data1 = '';
        }
        })
        if (data1 === 'true') {
        images.push(
            <Image source={Images.checked} style={{height:20,width:20}} />
        )
        } else {
        images.push( <Image source={Images.addFriend} style={{height:20,width:20}} />)
        }
        return (
            <TouchableOpacity onPress={this.onUsername.bind(this,item,index)}  style={{flex:1,flexDirection:"row"}}>
                <View style={{flex:0.8,flexDirection:"row",paddingBottom:15,paddingTop:15,paddingLeft:15}}>
                <Text style={{fontSize:18,fontWeight:"500"}}>{item.name}</Text>
                </View>
                <View style={{flex: 0.2,justifyContent: 'center',paddingLeft: 15}}>
                    {images}
                </View>
            </TouchableOpacity>
        )
      }
    onChangeText(text){
        this.setState({text},()=>{
            if (this.state.text.length > 2) {
              let searchArray = filter(this.filterFriends, friends);
               this.setState({friendsArray:searchArray});
            }
        });
    }
    filterFriends = item => {
        let name = item.name;
        let text = this.state.text;
        if (name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
          return item;
        }
      }
    onFriends(){
        this.setState({
            FriendModal: true
        })
    }
    onClose(){
        this.setState({
            FriendModal: false
        })
    }
    onCloseDeatils(){
        this.setState({
            friendDetailsModal : false
        })
    }
    
   render() {
    return (
        <Container style={styles.container}>
        <Header style={styles.headerStyle}>
        <Left style={styles.ham}>
          <Button style={styles.ham}
            transparent
            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name="ios-menu" style={{color: "white"}}/>
          </Button>
        </Left>
          <Body style={{flexWrap:"wrap"}}>
            <Text style={styles.title}>Track / Follow your Friends</Text>
          </Body>
          <Right style={styles.ham}>
          <TouchableOpacity style={styles.friendsTextContainer}
                onPress={this.onFriends.bind(this)}>
                  <Text style={styles.friendText}>Friends</Text>
          </TouchableOpacity>
        </Right>
        </Header>
         {this.state.spinner === true ? (
            <View style={styles.spinnerView}>
              <Spinner color={"black"} style={styles.spinnerPosition} />
            </View>
          ) : (
            <Content style={styles.content}>
                 <Card>
                    <CardSection>
                        <Input placeholder="Search..." onChangeText={this.onChangeText.bind(this)} value={this.state.text}/>
                    </CardSection>
                  </Card>
                  <FlatList
                        renderItem={this.renderData.bind(this)}
                        data={this.state.friendsArray}
                        ItemSeparatorComponent={ () => <View style={{marginLeft:10,width:windowSize.width,height: 1.5, backgroundColor: 'grey' } } /> }
                        keyExtractor={(item, index) => item + index}
                    />
            </Content>
          )}
          <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.FriendModal}>
                  <ModalShowFriends
                      onClose={this.onClose.bind(this)}
                      onDone = {this.onClose.bind(this)}
                  />
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.friendDetailsModal}>
                  <ModalFriendDetails
                      onClose={this.onCloseDeatils.bind(this)}
                      onDone = {this.onCloseDeatils.bind(this)}
                  />
            </Modal>
          </Container>
    );
  }
}

export default TrackFriends;
