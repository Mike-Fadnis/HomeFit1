import {
    StyleSheet,
    Dimensions
} from "react-native";

const window = Dimensions.get('window');
const styles: any = StyleSheet.create({
    container: {
		backgroundColor: "#FFFFFF",
	},
    content: {
        position: "relative",
        flex: 1,
        flexDirection: "column"
    },
	header: {
		backgroundColor: "#34ace0"
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




    inputIcon: {
        padding: 16
    },
    productBlockView:{
        // shadowColor: 'red',        
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,                
        //height: window.height * 0.28,
        borderBottomWidth:0.7,
        borderBottomColor:'grey',
        justifyContent:'center',        
    },
    productBlock: {
        marginTop: 5,
        display: "flex",
        flexDirection: "row"
    },
    productDescription: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 16,        
        width: "51%"
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
        height: window.height * 0.18,        
        justifyContent:'center',
        alignItems:'center'        
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
    }

});

export default styles;
