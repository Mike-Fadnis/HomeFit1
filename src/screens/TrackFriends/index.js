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
import { AsyncStorage, FlatList, Image ,Text, Dimensions, TouchableOpacity } from 'react-native';
import { Input, Card, CardSection } from '../common';
import styles from "./styles";
import Images from "@theme/images/images";


const windowSize = Dimensions.get('window');
const friends=[
    {
        "name":"Friend 1",
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Friend 2",
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Friend 3",
        "image":Images.noimage,
        "description":"description description description description"
    },
    {
        "name":"Friend 4",
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
            text:"hello"
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
    renderData = ({item,index,section}) => {
        return (
            <View style={{flex:1,flexDirection:"row",paddingBottom:15,paddingTop:15,paddingLeft:10}}>
               <View style={{flex:0.35,justifyContent:"center"}}>
                   <Image source={item.image} style={{width:100,height:100}}/>
               </View>
               <View style={{flex:0.65,paddingLeft:10,justifyContent:"center"}}>
                   <Text style={{fontSize:18,fontWeight:"500"}}>{item.name}</Text>
                   <Text style={{fontSize:16,color:"grey"}}>{item.description}</Text>

               </View>
            </View>
        )
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
                onPress={() => alert("flfjl;as")}>
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
                        <Input placeholder="Search..." onChangeText={(text)=>this.setState({text:text})} value={this.state.text}/>
                    </CardSection>
                  </Card>
                  <FlatList
                        renderItem={this.renderData.bind(this)}
                        data={friends}
                        ItemSeparatorComponent={ () => <View style={{marginLeft:10,width:windowSize.width,height: 1.5, backgroundColor: 'grey' } } /> }
                        keyExtractor={(item, index) => item + index}
                    />
            </Content>
          )}
          </Container>
    );
  }
}

export default TrackFriends;
