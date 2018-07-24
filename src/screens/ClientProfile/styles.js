import {
  Dimensions,
  Platform
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
  }
};
