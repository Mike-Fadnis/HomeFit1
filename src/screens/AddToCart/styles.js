import {StyleSheet,Dimensions} from "react-native";

const window = Dimensions.get('window');
const styles: any = StyleSheet.create({
  container: {
      backgroundColor: "#edeeef",
      flex:1
  },
  allCenter:{
      justifyContent:'center',
      alignItems:'center'
  },
  content: {
      position: "relative",
      flex: 1,
      flexDirection: "column"
  },
	header: {
		backgroundColor: "#34ace0"
    },
  headerLeftStyle:{
    flexDirection:"row"
  },
  headerRightTextStyle:{
      color:'white',
      fontSize:16,
      marginRight:2
  },
	title: {
		fontFamily: "Arial",
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "bold"
    },
  subContainer: {
      height: window.height * 0.15,
      backgroundColor: '#edeeef',
      alignItems:'center'
  },
  discountedView: {
      marginTop:0.5,
      flexDirection: 'row',
      height: window.height * 0.05,
      width: window.width * 0.9
  },
  discountedTextView: {
      flex: 0.6,
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
  },
  discountedTextStyle:{
      fontSize:16
  },
  discountedPriceTextStyle:{
      fontSize:18,
      fontWeight:'bold'
  },
  discountedPriceView: {
      flex: 0.4,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
  },
  secureCheckOutView: {
      flex: 0.7,
      alignItems:'center',
      justifyContent:'center',
      height: window.height * 0.12,
      marginTop:10
  },
  secureCheckOutButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: window.height * 0.06,
      width: window.width * 0.9,
      backgroundColor: '#4eabee',
      marginTop:10
  },
  secureCheckOutTextStyle:{
      color: '#FFFFFF',
      fontSize:18
  },
  footerContainer:{
      backgroundColor: '#edeeef',
      alignItems:'center',
      borderTopWidth:0.5,
      borderTopColor:"grey"
  },
  footersecureCheckOutView: {
      flex: 0.7,
      alignItems: 'center',
      justifyContent: 'center',
      height: window.height * 0.08
  },
  continueShoppingView:{
      alignItems:'center',
      justifyContent:'center',
      height: window.height * 0.05,
  },
  continueShoppingTextStyle:{
      color:'blue'
  },
  //ProductBlock Styles When Edit Buttons are clicked
  productBlockEditView:{
    flexDirection: 'row',
    flex: 1,
    borderBottomColor:"grey",
    borderBottomWidth: 0.5,
    marginTop:15,
    width:window.width
  },
  deleteIconView:{
    alignItems:"center",
    justifyContent:"center"
  },
  deleteIconButton:{
    marginLeft:10,
    alignItems:"center",
    justifyContent:"center"
  },
  productImageView:{
    alignItems:"flex-end",
    padding:5
  },
  productImageStyle:{
    width: 150,
    height: 150
  },
  emptyFlexView:{
    flex:0.2
  },
  ProductDetailsTextView: {
    flex:0.1,
    alignItems:"flex-start"
  },
  quantityButtonView: {
    flex:0.3
  },
  dropdownImageStyle:{
    width:20,
    height:20
  },
  bgRed:{
    backgroundColor: "red"
  },
  fontBold: {
    fontWeight:"900"
  },
  //ProductBlock Styles When Swiped to Delete
  productBlockSwipeView:{
      flexDirection: 'row',
      flex: 1,
  },
  productBlock: {
      flex:1,
      flexDirection: "row",
      margin: 5,
  },
  productDescription: {
      flex:1,
      flexWrap: 'wrap',
      margin: 5,
      alignItems:'flex-start'
  },
  type: {
      color: "#4286f4",
      fontFamily: "Arial",
      fontSize: 14,
      fontWeight: "bold"
  },
  name: {
      color: "#4286f4",
      fontFamily: "Arial",
      fontWeight: "bold",
      fontSize: 20,
      paddingTop: 4,
  },
  price:{
      color: "black",
      fontFamily: "Arial",
      fontWeight: "bold",
      fontSize: 16
  },
  stock:{
      color:'green',
      fontSize: 14,
  },
  cartButtons: {
      backgroundColor:'#FFFFFF',
      height: window.height * 0.18,
      justifyContent:'center',
      alignItems:'center'
  },
  totalQuantityTextStyle: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  quantityView: {
      marginTop: 5,
      width: window.width * 0.20,
      height: window.height * 0.05,
      flexDirection: "row",
      borderColor:"black",
      borderWidth: 1
  },
  quantityTextView: {
      width: "70%",
      backgroundColor:'#FFF',
      alignItems:'center',
      justifyContent:'center'
  },
  quantityPickerView:{
      width: "30%",
      backgroundColor: '#f2efef',
      borderLeftColor:"black",
      borderLeftWidth:1,
      alignItems:'center',
      justifyContent:'center'
  },
  promocodeView: {
      height: window.height * 0.06,
      width: window.width / 1.05,
      backgroundColor:'blue',
      flexDirection:'row'
  },
  promocodeTextView:{
      width: window.width / 1.5,
      backgroundColor:'white',
      alignItems:'flex-start',
      justifyContent:'center',
      borderWidth:0.3
  },
  applyTextView:{
      width: window.width / 3.5,
      height: window.height * 0.06,
      backgroundColor:'white',
      alignItems: 'flex-start',
      justifyContent: 'center',
  },
  promocodeConidtionView: {
      alignItems: 'flex-start',
      height: window.height * 0.03,
      width: window.width / 1.02,
      justifyContent:'center',
      paddingLeft:5
  },
  promocodeConditionTextStyle:{
      color:'grey',
      fontSize:13
  },
  deleteTextStyle: {
      color:"white",
      fontWeight:"900",
      fontSize:15
  },
  spinnerView: {
      alignItems: 'center',
      justifyContent: 'center'
  },
  spinnerPosition: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center'
  }

});

export default styles;
