import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Spinner,
  Text,
  Body,
  Left,
  Right,
  View
} from "native-base";
import { AsyncStorage, SectionList, Image , Dimensions, FlatList } from 'react-native';
import styles from "./styles";
import Images from "@theme/images/images";


const windowSize = Dimensions.get('window');
const Orders = [
    {
        title:"Order No: 123345678978945",
        data:[
            {
                "name": "Product 1",
                "price":"$1.00",
                "description":"Description smaple hereo",
                "image":Images.noimage,
                "quantity":2,
                "status":"Delivered"
            },
            {
                "name": "Product 2",
                "price":"$5.00",
                "description":"Description smaple hereo",
                "image":Images.noimage,
                "quantity":1,
                "status":"Delivered"
            }
        ]
    },
    {
        title:"Order No: 9876543210987",
        data:[
            {
                "name": "Product 3",
                "price":"$1.00",
                "description":"Description smaple hereo",
                "image":Images.noimage,
                "quantity":2,
                "status":"Delivered"
            }
        ]
    }
]
const RecurringItems =[
    {
        "name": "Product 1",
        "price":"$1.00",
        "description":"Description smaple hereo",
        "image":Images.noimage,
    },
    {
        "name": "Product 2",
        "price":"$5.00",
        "description":"Description smaple hereo",
        "image":Images.noimage,
    }

]
class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner:true,
            clientDetails:null
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
             <View style={{flex:0.65,paddingLeft:10,justifyContent:"space-between"}}>
                 <Text style={{fontSize:18,fontWeight:"500"}}>{item.name}</Text>
                 <Text style={{fontSize:16,color:"grey"}}>{item.description}</Text>
                 <Text style={{fontSize:15,color:"grey"}}>Price: {item.price}</Text>
                 <Text style={{fontSize:15,color:"grey"}}>Qty: {item.quantity}</Text>
                 {item.status  === 'Delivered' ? (
                     <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:16,color:"grey"}}>{item.status}</Text>
                        <Image source={require("@images/success.png")} style={{width:18,height:18,marginLeft:10}}/>
                     </View>
                 ):<Text style={{fontSize:16,color:"grey"}}>{item.status}</Text>}
             </View>
          </View>
      )
    }
    renderRecurringData = ({item,index,section}) => {
        return (
            <View style={{flex:1,flexDirection:"row",paddingBottom:15,paddingTop:15,paddingLeft:10}}>
               <View style={{flex:0.35,justifyContent:"center"}}>
                   <Image source={item.image} style={{width:100,height:100}}/>
               </View>
               <View style={{flex:0.65,paddingLeft:10,justifyContent:"center"}}>
                   <Text style={{fontSize:18,fontWeight:"500"}}>{item.name}</Text>
                   <Text style={{fontSize:16,color:"grey"}}>{item.description}</Text>
                   <Text style={{fontSize:15,color:"grey"}}>Price: {item.price}</Text>
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
          <Body>
            <Title style={styles.title}>Order History</Title>
          </Body>
          <Right />
        </Header>
         {this.state.spinner === true ? (
            <View style={styles.spinnerView}>
              <Spinner color={"black"} style={styles.spinnerPosition} />
            </View>
          ) : (
            <Content style={styles.content}>
                <View style={{flex:1,marginTop:15}}>
                    <Text style={{fontSize:18,fontWeight:"800",padding:10,color:"#34ace0"}}>Order History:</Text>
                    <SectionList
                        renderItem={this.renderData.bind(this)}
                        renderSectionHeader={({section: {title}}) => (
                            <View style={{backgroundColor:"lightgrey",padding:10,opacity:0.5}}>
                                 <Text style={{fontWeight: 'bold'}}>{title}</Text>
                            </View>
                        )}
                        sections={Orders}
                        ItemSeparatorComponent={ () => <View style={{marginLeft:10,width:windowSize.width,height: 1, backgroundColor: 'grey' } } /> }
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
                <View style={{flex:1,marginTop:15}}>
                    <Text style={{fontSize:18,fontWeight:"800",padding:10,color:"#34ace0"}}>Recurring Purchases:</Text>
                    <FlatList
                        renderItem={this.renderRecurringData.bind(this)}
                        data={RecurringItems}
                        ItemSeparatorComponent={ () => <View style={{marginLeft:10,width:windowSize.width,height: 1.5, backgroundColor: 'grey' } } /> }
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
            </Content>
          )}
          </Container>
    );
  }
}

export default OrderHistory;
