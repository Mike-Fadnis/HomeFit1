import {
    StyleSheet,
    Dimensions
} from "react-native";

const window = Dimensions.get('window');
const styles: any = StyleSheet.create({
    container: {
        //backgroundColor: "#FFFFFF",
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
        borderWidth:1,
        borderColor:'black',
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
        borderWidth: 1,
        borderColor: 'black',
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
    // inputIcon: {
    //     padding: 16
    // },
    productBlockView:{                   
        //justifyContent: 'center',
        flexDirection: 'row',
        flex: 1, 
        //alignItems:'center'       
        //height: window.height * 0.28,
        // borderBottomWidth:0.7,
        // borderBottomColor:'lightgrey',        
        //backgroundColor:'orange'
    },
    productBlock: {
        //marginTop: 5,               
        flex:1,      
        flexDirection: "row",        
        margin: 5,        
        //display: "flex"
    },
    productDescription: {                 
        flex:1, 
        flexWrap: 'wrap',        
        margin: 5, 
        alignItems:'flex-start',
        //display: "flex",         
        //alignItems:'flex-start'
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
        fontSize: 20,
        paddingTop: 4,
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
        width: window.width * 0.18,
        height: window.height * 0.05,
        flexDirection: 'row',
        borderColor:"black",
        borderWidth: 1
    },
    quantityTextView: {
        width: "60%",
        alignItems:'center',
        justifyContent:'center'        
    },
    quantityPickerView:{
        width: "40%",
        backgroundColor:'lightgrey',
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
