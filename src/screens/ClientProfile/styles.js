import {
  Dimensions
} from "react-native";
const window = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#009FDB",
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    borderRadius: window.width / 7.4, //50
    width: window.width / 3.7, //100
    height: window.width / 3.7
  },
  // Modal Styles Begins here
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000bf",
    justifyContent: "center",
    padding: 25
  },
  // statusBar: {
  //   height: Platform.OS === "ios" ? 20 : 44,
  // },
  BillingDetails: {
    flex: 0.8,
    backgroundColor: "white"
  },
  modalHeaderStyle:{
    flex:0.1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  cardDetails: {
    flex: 0.8
  },
  modalFooterStyle: {
    flex: 0.1,
    backgroundColor: "white"
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth:0.8,
    borderTopColor:"lightgrey"
  },
  cancel: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  done:{
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth:0.8,
    borderLeftColor:"lightgrey"
  },
  editButton:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    width: window.width / 4,
    height: "auto"
  },
  inputTextStyle:{
    fontSize:18
  },
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
};
