import * as React from "react";
import { Image, View ,Dimensions, TouchableOpacity, Modal} from "react-native";
import {Container,Header,Title,Content,Button,Icon,Left,Body,Badge,Right,Text,Item,Input,Picker,Form,List,ListItem,Thumbnail,Spinner} from "native-base";
import { Col, Grid } from "react-native-easy-grid";

import { connect } from "react-redux";
import {addToCartItem} from "@actions";
import API from "@utils/ApiUtils";
import {IMAGE_PATH} from "@common/global";
import styles from "./styles";
import moment from 'moment';
import ModalSizeDesignComponent from "./modalSizeDesignComponent";
import ModalFlavourDesignComponent from "./modalFlavourDesignComponent";
import ModalAddtoCart from "./modalAddtoCart";
const window = Dimensions.get('window');
export interface Props {
	navigation: any;
}
export interface State {}

var responseDuplicateArray =[];
var dataToModal = {};
class ProductDetails extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            selected3: undefined,
            productDetails:"",
            productId: this.props.navigation.state.params.productId,
            name: "",
            description: "",
            price: "",
            category: "",
            quantity: "",
            sub_heading: "",
            image: "",
            status: "",
            allProducts: [] ,
            badgeTotal: 0,
            qty:"1",
						customerReviews:[],
						spinner:true,
						modalSizeVisible: false,
						modalFlavourVisible: false,
						selectedSize: "",
						selectedFlavour:"",
						finalResponseArray:[],
						flavoursArray: [],
						flavour_id:'',
						size_id:'',
						modalAddtoCart: false,

        };
    }

	async	getCustomerReviews(){
		var getProductId = this.state.productId;
		API.getCustomerReviews(getProductId).then(async (response) => {
				if (response){
						this.setState({
								customerReviews: response.data,
								spinner:false
						});
				} else {
						alert("Error getting product details || Check Network ");
				}
		}).catch((error)=>{
				console.log("Console Error",error);
		});
	}
async getSizesFlavours(){
		var getProductId = this.state.productId;
		API.getSizesFlavours(getProductId).then(async (response) => {
						if (response){
								this.setState({
										productDetails: response.data
								},()=>{
										this.setState({
												name: this.state.productDetails.name,
												description: this.state.productDetails.description,
												price: response.data[0].price,//this.state.productDetails.price,
												category: this.state.productDetails.category,
												quantity: this.state.productDetails.quantity,
												sub_heading: this.state.productDetails.sub_heading,
												image:IMAGE_PATH + this.state.productDetails.image,
												status: this.state.productDetails.status
										});
										this.getNewResponse();
								});
						} else {
								alert("error getting product details || Check Network");
						}
				}).catch((error)=>{
						console.log("Console Error",error);
				});

}
componentWillMount(){
	responseDuplicateArray= []
	this.getCustomerReviews();
	this.getSizesFlavours();
	this.setState({
	    badgeTotal: this.props.cartTotal.addToCartItem.total
	});
}
componentWillReceiveProps(nextProps){
   this.setState({
       badgeTotal: nextProps.cartTotal.addToCartItem.total
   });
}

onValueChange3(value: string) {
    this.setState({
        selected3: value
    });
}
onAddToCardPressed(){
		if(this.state.selectedSize === ""){
			alert("Please select Size")
		} else if(this.state.selectedFlavour === ""){
				alert("Please select Flavour")
			} else {
					dataToModal={};
					this.setState({
							modalAddtoCart: true
						})
						var quantity = this.state.qty;
						var item = {
								id: this.state.productId,
								totalQuantity: quantity === "1" ? 1 : quantity === "" ? 1 : quantity,
								name: this.state.productDetails.name,
								description: this.state.productDetails.description,
								price: this.state.price,//this.state.productDetails.price,
								category: this.state.productDetails.category,
								quantity: this.state.productDetails.quantity,
								sub_heading: this.state.productDetails.sub_heading,
								image: IMAGE_PATH + this.state.productDetails.image,
								status: this.state.productDetails.status,
								size_id:this.state.size_id,
								flavour_id:this.state.flavour_id,
								size_name:this.state.selectedSize,
								flavour_name:this.state.selectedFlavour
						};
						this.props.dispatchAddCart(item);
						dataToModal= item
				}
}
onBack(){
   this.props.navigation.navigate("OnlineStore");
}
onCartIcon() {
    this.props.navigation.navigate("AddToCart");
}
onChangeText(text){
  this.setState({
    qty:text
  });
}
//for modal size
setModalVisible(visible) {
  this.setState({modalSizeVisible: visible});
}
onModalSizeBack(){
	this.setState({
		modalSizeVisible: false
	},()=>{
		responseDuplicateArray = []
	});
}
onModalAddtoCartClosed(){
	this.setState({modalAddtoCart: false});
}
onModalSizeClose(item){
	this.state.finalResponseArray.map((obj,index) => {
		if(obj.size === item.size){
			this.setState({
				flavoursArray: item.flavoursList
			},() => {
					console.log("abcdd: ", this.state.flavoursArray)
					this.setState({
						modalSizeVisible: false,
						modalFlavourVisible: true
					},()=>{

						responseDuplicateArray = []
					});
				})
		}
	})

}


//for modal flavour
setModalVisibleFlavour(visible){
		if(this.state.selectedSize === ""){
			alert("Please Select Size First")
		}else{
			this.setState({modalFlavourVisible: visible});
		}
}
onModalFlavourClose(){
    this.setState({modalFlavourVisible: false})
}


getItem(item){
    console.log("selectedSize:  ",JSON.stringify(item))
    this.setState({
        selectedSize: item.size,
				size_id:item.id
    })
}
getFlavourItem(item){
    console.log("selectedFlavour:  ",JSON.stringify(item))
     this.setState({
        selectedFlavour: item.flavour_name,
				flavour_id:item.flavour_id,
				price:item.price
    })
}

getNewResponse(){
		var typeofCheck = this.state.productDetails;
		Object.keys(this.state.productDetails).map((res, index) =>{
		var objectType = this.state.productDetails[res]
			if(objectType){
				if(typeof objectType === 'object') {
             responseDuplicateArray.push(this.state.productDetails[res])
			  }
			}
		});
		let count = 0
    let responseArray = responseDuplicateArray
    let finalResponseArray = []
    responseArray.map((res, key) => {

        let size = res.size_name
        if (finalResponseArray.length === 0) {
            let listArray = []
            listArray.push({flavour_id:res.flavor,flavour_name:res.flavor_name, price:res.price})
            var record = { id: res.id,size: size, flavoursList: listArray }
            finalResponseArray.push(record)
        } else {
            finalResponseArray.map((finalres, index) => {
                if (finalres.size === size) {
                    finalres.flavoursList.push({flavour_id:res.flavor,flavour_name:res.flavor_name, price:res.price})
                    count++
                } else{
									count = 0
									}
            })
            if (count === 0) {
                let listArray = []
                listArray.push({flavour_id:res.flavor,flavour_name:res.flavor_name, price:res.price})
                let record = { id: res.id,size: size, flavoursList: listArray }
                finalResponseArray.push(record)
            }
						console.log("length!=0: ", JSON.stringify(finalResponseArray))
        }
    })
    this.setState({
        finalResponseArray: finalResponseArray
    })

}

renderItem(item){
	var reviewDate =  moment(item.created_at).format('LL');
	var reviewUserImg = IMAGE_PATH+item.image
	var res =  item.user_name.split(" ");
	var firstname = ''
	var lastname = ''
	if(res[1] === undefined){
		 firstname = res[0].charAt(0);
		 lastname = ''
	}else{
	 firstname = res[0].charAt(0);
	 lastname = res[1].charAt(0);
	}

	return(
		<ListItem style={styles.reviewItem}>
		{item.image === ''?(<View style={{height:window.width/5, width:window.width/5, backgroundColor:'lightblue', marginLeft:5, alignItems:'center', justifyContent:'center'}}><Text style={styles.type}>{firstname}{lastname}</Text></View>):(<Thumbnail square size={80} source={{ uri: reviewUserImg }} style={{marginLeft:5}}/>)}
				<Body>
						<Text style={styles.type}>{item.user_name}</Text>
						<Text style={styles.subtitle}>{item.review}</Text>
						<Text style={styles.reviewDate}>{reviewDate}</Text>
				</Body>
		</ListItem>
	)
}
render() {
  const product =
      {
        ratings: "9.2"
      };
  return (
      <Container style={styles.container}>
          <Header style={styles.header}>
                <Left style={[styles.ham,{flexDirection:"row"}]}>
                  <Button style={styles.ham}
                  transparent
                  onPress={this.onBack.bind(this)}>
                  <Icon name="ios-arrow-back" style={{color: "white"}}/>
                  </Button>
									<Button style={[styles.ham,{marginLeft:10}]}
									 transparent
									 onPress = {() => this.props.navigation.navigate("DrawerOpen")}>
									 <Icon name = "ios-menu" style={{color: "white"}}/ >
								 </Button>
              </Left>
              <Body>
                  <Title style={styles.title}> Store</Title>
              </Body>
              <Right style={styles.ham}>
                  <Button style={styles.ham} transparent onPress={this.onCartIcon.bind(this)}>
                      {this.state.badgeTotal > 9 && this.state.badgeTotal <= 99 ?
                          (<Icon name = "ios-cart" style={{color: "white",marginRight:30}}/>) :
                              this.state.badgeTotal >= 100 ? (<Icon name = "ios-cart" style={{color: "white",marginRight:40}}/>) :
                                  (<Icon name = "ios-cart" style={{color: "white",marginRight:15}}/>)}
                      {this.state.badgeTotal === 0 ? (null) : <Badge danger style={{position:"absolute",marginRight:5}}>
                      <Text style={{fontWeight:"bold" }}>{this.state.badgeTotal}</Text>
                      </Badge>}
                  </Button>
              </Right>
          </Header>

          <Content>
              <View style={styles.content}>
                  {/* search block
                  <Item style={styles.search}>
                      <Icon active name="search" style={styles.inputIcon}/>
                      <Input placeholder="Search" />
                  </Item>*/}

                  {/* product image and description block */}
                  <View style={styles.productBlock}>
                      <View size={1} style={{alignItems:'center', justifyContent:'center'}}>
                          <Image source={{uri: this.state.image}} style={{ width: 135, height: 150 }}  />
                      </View>
                      <View size={1.5} style={styles.productDescription}>
                          <Text style={styles.type}>Category {this.state.category}</Text>
                          <Text style={styles.name}>{this.state.name}</Text>
                          <Text style={styles.description}>{this.state.description}</Text>
                          <Text style={styles.subtitle}>empty subtitle{this.state.subtitle}</Text>
                          <Text />
                      </View>
                      <View style={{display: "flex", alignItems: "flex-end",
                                  paddingRight : 10}}>
                          <View style={styles.productRating}>
                              <Text style={{color: "#9a9b9c", fontSize: 12, fontWeight: "bold"}}>9.2</Text><Text style={{color: "#9a9b9c", fontSize: 7,  fontFamily: "Arial", fontWeight: "bold"}}>RATING</Text>
                              <Text style={{color: "#9a9b9c", fontSize: 7,  fontFamily: "Arial", fontWeight: "bold"}}>{product.ratings}</Text>
                          </View>
                      </View>
                  </View>
									<View style={{display: "flex", alignItems: "flex-start", flex: 1, marginTop: 16, flexDirection:"row", margin:10}}>
									<View style={{flex:0.5,flexDirection:"row"}}>
	 												 <TouchableOpacity
	 													 style={{flex:1,flexDirection:"row",margin:5,backgroundColor:'#EDEEF0',height:50,borderWidth:1.2,borderColor:"lightgrey"}}
	 													 onPress={() => {
	 														 this.setModalVisible(true);
	 													 }}>
	 														<View style={{flex:0.7,justifyContent:"center",padding:10}}>
	 															{this.state.selectedSize === "" ? (
	 																		<Text>Size</Text>
	 																):(
	 																		<Text>{this.state.selectedSize}</Text>
	 																)}
	 														</View>
	 														<View style={{flex:0.3,justifyContent:"center",alignItems:"center",borderLeftWidth:1.2,borderColor:"lightgrey"}}>
	 															<Icon name = "ios-arrow-forward" style={{color: "grey"}}/>
	 														</View>
	 												 </TouchableOpacity>
	 										 </View>
	 										 <View style={{flex:0.5,}}>
	 												 <TouchableOpacity
	 													 style={{flex:1,flexDirection:"row",margin:5,backgroundColor:'#EDEEF0',height:50,borderWidth:1.2,borderColor:"lightgrey"}}
	 													 onPress={() => {
	 														 this.setModalVisibleFlavour(true);
	 													 }}>
	 															<View style={{flex:0.7,justifyContent:"center",padding:10}}>
	 															 {this.state.selectedFlavour === "" ? (
	 																			 <Text>Flavour</Text>
	 																	 ):(
	 																			 <Text>{this.state.selectedFlavour}</Text>
	 																	 )}
	 															</View>
	 															<View style={{flex:0.3,justifyContent:"center",alignItems:"center",borderLeftWidth:1.2,borderColor:"lightgrey"}}>
	 																<Icon name = "ios-arrow-forward" style={{color: "grey"}}/>
	 															</View>
	 												 </TouchableOpacity>
	 										 </View>
										 <Modal
												 animationType="slide"
												 transparent={false}
												 visible={this.state.modalSizeVisible}
												 onRequestClose={() => {
												 alert('Modal has been closed.');
										 }}>
												 <ModalSizeDesignComponent
													 onClose={this.onModalSizeClose.bind(this)}
													 onSelect={this.setModalVisibleFlavour.bind(this)}
													 sendItem={this.getItem.bind(this)}
													 responseDuplicateArray={this.state.finalResponseArray}
													 onModalBack={this.onModalSizeBack.bind(this)}

												 />

										 </Modal>

										 <Modal
												 animationType="slide"
												 transparent={false}
												 visible={this.state.modalFlavourVisible}
												 onRequestClose={() => {
												 alert('Modal has been closed.');
										 }}>
												 <ModalFlavourDesignComponent
														 onClose={this.onModalFlavourClose.bind(this)}
														 sendFlavourItem={this.getFlavourItem.bind(this)}
														 flavoursArray={this.state.flavoursArray}

												 />
										 </Modal>
								 </View>


                  <View style={styles.priceBlock}>
                      <Text style={styles.price}>${this.state.price}</Text>
                  </View>

                  <View style={styles.freeShipping}>
                      <Text style={styles.freeShippingText}>Free Shipping</Text>
                      <Text style={styles.freeShippingAdditionalText}>on orders over $49</Text>
                  </View>

                  <View style={styles.cartButtons}>
                      <Grid>
                          <Col size={1} style={styles.qty}>
                              <Text style={styles.freeShippingAdditionalText}>Qty:</Text>
                              <Item regular style={{width: "40%", maxHeight: 46, marginLeft: 25}}>
                                  <Input keyboardType={"numeric"} onChangeText = {
                                      this.onChangeText.bind(this)
                                  }
                                    value={this.state.qty} />
                              </Item>
                          </Col>
                          <Col size={2}>
                              <Button full style={{backgroundColor: "#34ace0"}}
                              onPress={this.onAddToCardPressed.bind(this)}>
                                  <Text style={styles.addCartButton}>{"Add to Cart".toUpperCase()}</Text>
                              </Button>
															{/* Modal open after Add to cart Pressed*/}
															<Modal
																 animationType="fade"
																 transparent={true}
																 visible={this.state.modalAddtoCart}
																 onRequestClose={() => {
																 alert('Modal has been closed.');
																}}>
																 <ModalAddtoCart
																	onClose={this.onModalAddtoCartClosed.bind(this)}
																	productDetailsData={dataToModal}
																	productQtyData={this.state.qty}
																	viewCart={this.onCartIcon.bind(this)}
																	/>
														 </Modal>
                          </Col>

                      </Grid>
                  </View>

                  <View style={styles.reviewsHeadingBlock}>
                      <Text style={styles.reviewsHeading}>{"Reviews".toUpperCase()}</Text>
                  </View>

                  <View style={styles.userReviewsBlock}>
									{this.state.spinner == true ?
										(<Spinner color='black' />)
										:(<List dataArray={this.state.customerReviews}
										 renderRow={this.renderItem.bind(this)}/>)}
                  </View>
              </View>
          </Content>

      </Container>
  );
}
}

function mapStateToProps(state) {
  return {
    cartTotal: state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatchAddCart: item => dispatch(addToCartItem(item))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
