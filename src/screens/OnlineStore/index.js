import React, { Component } from "react";
import {Image,View,TouchableOpacity,FlatList,TextInput,Alert} from "react-native";
import {Container,Header,Title,Content,Text,Button,Card,CardItem,Icon,Spinner,Left,Right,Body} from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import { Dropdown } from "react-native-material-dropdown";

import { filter } from "ramda";
import styles from "./styles";
import API from "@utils/ApiUtils";
import {IMAGE_PATH} from "@common/global";
import Images from "@theme/images/images";

class OnlineStore extends Component {
  constructor(props){
    super(props);
    this.state = {
      allProducts: [],
      onlineProductsArray: [],
      spinner:true,
      fromTrainerPersonalPage:this.props.navigation.getParam("toOnlineStore"),
      onChangeColumn: false,
      fromClientHome:this.props.navigation.getParam("forBack"),
      searchedvalue:"",
      categoryvalue:"",
      allCategories:[],
      newCategoryarry:[],
      text:""
    };
    this.onGrid = this.onGrid.bind(this);
    this.onChangeDropdown = this.onChangeDropdown.bind(this);
    this.onCategoryChangeDropdown = this.onCategoryChangeDropdown.bind(this);
  }
  async componentWillMount(){
    this.getProducts();
    this.getCategories();
  }
  getProducts(){
    API.getProducts().then(async (response) => {
      if (response){
        if (response.status){
          this.setState({allProducts: response.data,spinner:false});
        } else {
          this.setState({spinner:false});
          alert("Error");
        }
      } else {
        this.setState({spinner:false});
        alert("Error getting product details | Check Network ");
      }
    }).catch((error)=> {
      this.setState({spinner:false});
      console.log("Console Error", error);
    });
  }
  getCategories(){
    API.getCategories().then(async (response) => {
      if (response){
        if (response.status) {
          this.setState({
            allCategories: response.data,
            spinner:false
          },()=>{
            var categoryarray = [];
             this.state.allCategories.map((res,i)=>{
               var rec = {
                 "id":res.id,
                 "value": res.name,
                 "status":res.status
               };
               categoryarray.push(rec);
             });
             this.setState({
               newCategoryarry : categoryarray
             });
          });
        }
        else {
          this.setState({spinner:false});
          Alert.alert("",response.message);
        }

      } else {
        this.setState({spinner:false});
        Alert.alert("Error getting product details | Check Network ");
      }
    }).catch((error)=> {
      this.setState({spinner:false});
        Alert.alert("Console Error", error);
    });
  }

  onBackPressed(){
    if (this.state.fromTrainerPersonalPage){
      this.props.navigation.navigate("TrainerPersonalPage");
    } else if (this.state.fromTrainerPersonalPage){
      this.props.navigation.navigate("ClientHome");
    } else {
      this.props.navigation.navigate("ClientHome");
    }
  }
  onGrid(){
    this.setState({onChangeColumn: !this.state.onChangeColumn});
  }
  onChangeDropdown(item,index){
    this.setState({
      searchedvalue : item
    },()=>{
      if (this.state.searchedvalue === "Search by None" || this.state.searchedvalue === "Search by Name"){
        this.getProducts();
      }
    });
  }
  onCategoryChangeDropdown(item,index){
    this.setState({categoryvalue : item},()=>{
      let me = this.refs.categoryref;
      var selectedItem =  me.selectedItem();
      this.setState({spinner: true});
      this.getProductsByCategory(selectedItem.id);
    });
  }
  getProductsByCategory(id){
        API.getProductsByCategory(id).then(async (response) => {
          if (response){
            if (response.status) {
              this.setState({allProducts: response.data,spinner:false});
            }
            else {
              this.setState({spinner:false});
            }
          } else {
            this.setState({spinner:false});
            Alert.alert("Error getting product details | Check Network ");
          }
        }).catch((error)=> {
          this.setState({spinner:false});
            Alert.alert("Console Error", error);
        });
  }
  onChangeSearchText(text){
    this.setState({text},()=>{
      if (this.state.text.length > 2) {
        let products = this.state.allProducts;
        let searchArray = filter(this.filterProducts, products);
         this.setState({allProducts:searchArray});
      } else if (this.state.text.length === 0 ){
          this.getProducts();
        }
    });
  }
  filterProducts = item => {
    let name = item.name;
    let text = this.state.text;
    if (name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
      return item;
    }
  }
  renderData = ({item, index}) => {
    return (
      this.state.onChangeColumn === true ? (
        <TouchableOpacity  style={styles.colOnestoreProducts} onPress = {() => {this.props.navigation.navigate("ProductDetails",(user = { productId: item.id}));}}>
          <View style={styles.colOneContent}>
            <View style={styles.colOneImageinRow}>
              <View style={styles.colOneIndexLabelView}>
                <View style={styles.colOneIndexLabelSubView}>
                  <Text style={{color: "#FFFFFF", fontFamily: "Arial"}}>{index + 1}</Text>
                </View>
              </View>
              <View style={styles.colOneImageView}>
                <Image source = {{uri: IMAGE_PATH + item.image}} style = {{width: 150,height: 150}}/>
              </View>
            </View>
            <View style={styles.colOneProductDescription}>
              <Text numberOfLines={1} style={styles.colOnetype}>{item.cat_name}</Text>
              <Text numberOfLines={1} style={styles.colOnename}>{item.name}</Text>
              <Text numberOfLines={5} style={styles.colOnedescription}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
        ) : (
        <TouchableOpacity  style={styles.storeProducts} onPress = {() => {this.props.navigation.navigate("ProductDetails",(user = { productId: item.id}));}}>
            <View style={styles.productsHeader}>
              <View style={styles.productCount}>
                  <Text style={{color: "#FFFFFF", fontFamily: "Arial",}}>
                     {index + 1}
                  </Text>
              </View>
            </View>
            <View style={styles.cardImage}>
              <Image source = {{uri: IMAGE_PATH + item.image}} style = {{width: 100,height: 100}}/>
            </View>
            <View style={styles.cardContent}>
              <Text numberOfLines={1} style={styles.type}>{item.cat_name}</Text>
              <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
              <Text numberOfLines={3} style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
      )
      );
  }
  render() {
    let data = [
      {
        value: "Search by Name",
       }, {
        value: "Search by Category",
       }, {
        value: "Search by None",
       }
    ];
    return (
      <Container style={styles.container}>
         <Header style={styles.headerStyle}>
          <Left style={[styles.ham,{flexDirection:"row"}]}>
            {this.state.fromTrainerPersonalPage || this.state.fromClientHome ? (
            <Button style={styles.ham}
              transparent
              onPress={this.onBackPressed.bind(this)}>
                <Icon name="ios-arrow-back" style={{color: "white"}}/>
            </Button>) : (
            <Button style={styles.ham}
              transparent
              onPress = {() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name = "ios-menu" style={{color: "white"}}/>
            </Button>
            )}
          </Left>
          <Body>
            <Title style={styles.title}>Store</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{flex:1,marginTop:5,paddingTop:10}}>
            <Dropdown
              label={this.state.searchedvalue === "" ? "Select Search Type.." : ""}
              data={data}
              value={this.state.searchedvalue}
              dropdownPosition={0}
              onChangeText={this.onChangeDropdown}
              inputContainerStyle={{borderBottomColor:"transparent"}}
              containerStyle={{borderWidth:1,borderColor:"#009FDB",height:50,justifyContent:"center",margin:5,padding:10}}
             />
          </View>

          {this.state.searchedvalue === "Search by Name" ? (
            <View style={{flex:1,flexDirection:"row",borderWidth:1,borderColor:"#009FDB",height:50,margin:5}}>
              <View style={{flex:0.15,justifyContent:"center",alignItems:"center"}}>
                <Icon active name="search" style={styles.inputIcon}/>
              </View>
              <View style={{flex:0.85,justifyContent:"center",alignItems:"flex-start"}}>
                <TextInput placeholder="Search" style={{flex:1,fontSize:18,marginLeft:10}} onChangeText={this.onChangeSearchText.bind(this)}  value={this.state.text}/>
              </View>
            </View>
          ) : this.state.searchedvalue === "Search by Category" ? (
            <Dropdown
              label={this.state.categoryvalue === "" ? "Select Categories.." : ""}
              data={this.state.newCategoryarry}
              value={this.state.categoryvalue}
              dropdownPosition={0}
              ref={"categoryref"}
              onChangeText={this.onCategoryChangeDropdown}
              inputContainerStyle={{borderBottomColor:"transparent"}}
              containerStyle={{borderWidth:1,borderColor:"#009FDB",height:50,justifyContent:"center",margin:5,padding:10}}
             />
            ) : (<View/>)}
          <Card style={[styles.card,{marginTop:10}]}>
            <Image source={{uri: "https://www.t-nation.com/system/publishing/articles/10003259/original/The-Single-Best-Muscle-Building-Method.jpg?1451932310"}} style={{ width: "100%", height: 200 }}  />
            <CardItem>
              <Body>
                <Text style={styles.cardTitle}>
                  BROWSE OUR PRODUCTS
                </Text>
                <Text style={styles.cardDescription}>
                  Only the elite gets to earn a position in our store.These proven supplements can help you achieve the results that you are working
                  for.
                </Text>
              </Body>
            </CardItem>
          </Card>
          <View style={styles.storeHeader}>
            <Grid>
              <Col size={4} style={{ backgroundColor: "#FFFFFF", height: 50, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingLeft: 16 }}>
                 <Text>Products</Text>
              </Col>
              <Col size={1} style={{flex:1, backgroundColor: "#FFFFFF"}} >
                <TouchableOpacity onPress={this.onGrid} style={{flex:1,borderLeftColor: "#C8C8C8", borderLeftWidth: 1,justifyContent: "center", alignItems: "center" }}>
                  {this.state.onChangeColumn === false ? (
                    <Image source = {Images.productsinList} style = {{width: 25,height: 25}}/>
                    ) : (
                    <Image source = {Images.productsinGrid} style = {{width: 25,height: 25}}/>
                  )}
                </TouchableOpacity>
              </Col>
            </Grid>
          </View>
          <View style={styles.storeItems}>
              {this.state.spinner === true ? (
                  <View style={styles.spinnerView}>
                    <Spinner color={"black"} style={styles.spinnerPosition} />
                  </View>
                ) : this.state.allProducts === [] || this.state.allProducts.length === 0 ? (<View style={{justifyContent:"center",alignItems:"center"}}><Text>No Products</Text></View>) :
                <FlatList
                  data={this.state.allProducts}
                  keyExtractor={(x, i) => x.id}
                  extraData={this.state}
                  renderItem={this.renderData.bind(this)}
                  removeClippedSubViews={true}
                  numColumns={ this.state.onChangeColumn === true ? 1 : 2 }
                  key = {( this.state.onChangeColumn ) ? "ONE COLUMN" : "TWO COLUMN" }
                  style={{backgroundColor:"#dce2ef"}}
                  />
              }
          </View>
        </Content>
      </Container>
    );
  }
}
export default OnlineStore;
