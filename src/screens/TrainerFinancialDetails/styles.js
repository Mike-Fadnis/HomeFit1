import {
  Dimensions
} from "react-native";
const window = Dimensions.get("window");
export default {
  container: {
    backgroundColor: "#fff",
    flex : 1
  },
  headerStyle : {
    backgroundColor: "#009FDB",
  },
  title : {
    color : "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  ham : {
  backgroundColor :  "#009FDB",
  },
  titleText : {
    fontSize : 20,
    fontWeight : "bold",
    //marginTop : 20
  },
  subTitleText : {
    fontSize : 16,
    color : "#4e5259",
    //marginTop : 10
  },
  imputBoxContainer : {
    //marginTop : 20
  },
  billingAddressTitle : {
    fontWeight : "bold",
    marginTop : 20
  },
  contentView:{flex:1},
  rowView:{flexDirection:"row",margin:5,padding:5, height:70,backgroundColor:"#f9f9f9",borderRadius:5, borderWidth:2, alignItems:"center"},
  mainRowView:{flex:0.1,alignItems:"center",justifyContent:"center"},
  rowImageStyle:{height:20,width:20},
  cardView:{flex:0.2,backgroundColor:"white",alignItems:"center",justifyContent:"center"},
  cardImgStyle:{height:40,width:50},
  rowDataView:{flex:0.5,paddingLeft:20,alignItems:"flex-start",justifyContent:"center"},
  cardHolderNameStyle: {fontSize: window.width / 21},
  rowTextView:{flex:0.2,alignItems:"flex-end"},
  rowTextStyle:{color:"#b3b3b3"},
  inputView:{marginLeft:20, marginRight:20},
  creditcardView:{marginTop:20},
  container_spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.72)'
  },
  spinnerView: {
    height: window.width / 3,
    width: window.width / 3,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addIconStyle:{
    height:window.width / 17,
    width:window.width / 17,
  }
};
