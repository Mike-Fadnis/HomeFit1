import {
  Dimensions
} from "react-native";
const window = Dimensions.get("window");
export default {
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  headerStyle: {
    backgroundColor: "#009FDB",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  ham: {
    backgroundColor: "#009FDB",
  },
  buttonContainerStyle: {
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: "#009FDB",
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  SpecialityButton: {
    backgroundColor: "#009FDB",
    color: "#fff",
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  onlineStore: {
    marginTop: 10,
    // shadowColor: "#000",
    // borderBottomColor: "#009FDB",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.8,
  },
  buttonContainerStyle1:{
    shadowColor: "#000",
    borderBottomColor: "#009FDB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
  },
  specailityView:{
    flex: 1,
    flexDirection: "row",
    margin: 5,
    backgroundColor: "#EDEEF0",
    height: 50,
    borderWidth: 1.2,
    borderColor: "lightgrey",
    shadowColor: "#000",
    borderBottomColor: "#009FDB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
  },
  hostLiveGrpSession: {
    marginTop: 30,
    shadowColor: "#000",
    borderBottomColor: "#009FDB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
  },
  sessionSliderStyle: {
    alignSelf:"center",
    margin:10,
    width: window.width / 1,
    height: window.height * 0.25
  },
  hostLiveGrpSessionTextContainer: {
    marginTop: 10,
    //textAlign : 'center',
    justifyContent: "center",
    alignItems: "center"
  },
  hostLiveGrpSessionText: {

  },
  totalClientsTextBox: {
    flexDirection: "row"
  },
  totalClientsText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontWeight: "bold"
  },
  totalClientsTextTwo: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  calendarContainer: {
    marginTop: 30,
    shadowColor: "#009FDB",
    borderColor: "#009FDB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8
  },
  book: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
  },
  bookText: {
    fontSize: 20,
    width: "100%",
    color: "#fff",
    backgroundColor: "#009FDB",
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    borderRadius: window.width / 7.4, //50
    width: window.width / 3.7, //100
    height: window.width / 3.7
  },
  backgroundVideo: {
    position: "absolute",
    top: 10,
    left: 0,
    bottom: 10,
    right: 0,
  },
  container_spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'rgba(0,0,0,0.72)'
  },
  container_spinnerOne: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerView: {
    height: window.width / 3,
    width: window.width / 3,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    flex: 1,
    backgroundColor: "#000000c4",
    justifyContent: "center",
    alignItems: "center"
  },
  addSpecialityView:{alignItems:"center", marginTop:10},
  addSpecialityTextStyle:{fontSize:16, fontWeight:"700", color:"#009FDB",textDecorationLine:"underline",textDecorationColor:"#009FDB"},
  specialityTextStyle:{fontSize:15, fontWeight:"500", color:"black",marginTop:10, textAlign:"center"},
  textInputMainView:{flex:1,marginTop:10,flexDirection:"row"},
  textInputView:{flex:0.9,alignItems:"center" },
  textInputBorderView:{
    flex:1,
    backgroundColor: "#EDEEF0",
    height: window.width / 7,
    justifyContent:"center",
    width:window.width / 1.25,
    borderRadius:5,
    shadowColor: "#000",
    borderBottomColor: "#009FDB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8
  },
  addIconView:{flex:0.1,alignItems:"flex-start", justifyContent:"center"},
  addIconStyle:{tintColor:"#009FDB", height:window.width / 17, width:window.width / 17},
  spectilityListView:{
    alignItems:"flex-start",
    paddingLeft:10,
    justifyContent:"center",
    borderRadius:5
  },
  specialityContainerView:{
    flex:1,
    margin: 5,
    backgroundColor: "#EDEEF0",
    height: 50,
    justifyContent:"center",
    shadowColor: "#000",
    borderBottomColor: "#009FDB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8
  }
};
