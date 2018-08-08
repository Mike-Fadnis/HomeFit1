import {
  Dimensions
} from "react-native";
const window = Dimensions.get("window");

export default {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#009FDB",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentStyle: {
    flex: 1
  },
  profileImageStyle: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  ProfileDetails: {
    flex: 0.5,
    padding: 10
  },
  pictureViewStyle: {
    flex: 1,
    flexDirection: "row"
  },
  billingInfoViewStyle: {
    flex: 1,
    flexDirection: "row"
  },
  avatar: {
    borderRadius: window.width / 5.4, //50
    width: window.width / 2.7, //100
    height: window.width / 2.7,
    borderWidth:0.6,
    borderColor:"lightgrey"
  },
  // Modal Styles Begins here
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000bf",
    justifyContent: "center"
  },
  BillingDetails: {
    flex: 1,
    backgroundColor: "white"
  },
  modalHeaderStyle:{
    flex:0.1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-between",
    paddingHorizontal:10,
    borderBottomWidth:0.8
  },
  cardDetails: {
    flex: 1
  },
  // modalFooterStyle: {
  //   flex: 0.1,
  //   backgroundColor: "white"
  // },
  // buttons: {
  //   flex: 1,
  //   flexDirection: "row",
  //   borderTopWidth:0.8,
  //   borderTopColor:"lightgrey"
  // },
  // cancel: {
  //   flex: 0.5,
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // done:{
  //   flex: 0.5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderLeftWidth:0.8,
  //   borderLeftColor:"lightgrey"
  // },
  // editButton:{
  //   flexDirection:"row",
  //   alignItems:"center",
  //   justifyContent:"center",
  //   width: window.width / 4,
  //   height: "auto"
  // },
  inputTextStyle:{
    fontSize:18
  },
  rowView:{flexDirection:"row",margin:5,padding:5, height:70,backgroundColor:"#f9f9f9",borderRadius:5, borderWidth:2, alignItems:"center"},
  radioIconView:{flex:0.1,alignItems:"center",justifyContent:"center"},
  rowImageStyle:{height:20,width:20},
  cardView:{flex:0.2,backgroundColor:"white",alignItems:"center",justifyContent:"center"},
  cardImgStyle:{height:40,width:50},
  rowDataView:{flex:0.5,paddingLeft:20,alignItems:"flex-start",justifyContent:"center"},
  cardHolderNameStyle: {fontSize: window.width / 21},
  rowTextView:{flex:0.2,alignItems:"flex-end"},
  rowTextStyle:{color:"#b3b3b3"},
  container_spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.72)"
  },
  spinnerView: {
    height: window.width / 3,
    width: window.width / 3,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  creditcardView:{paddingTop:20,flex:0.5},
  inputView:{paddingLeft:20, paddingRight:20,flex:0.4},
};
