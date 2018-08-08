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
    color: "#fff",
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
    color: "#fff",
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
    width: "100%",
    height: 130,
    marginTop: 20
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
    shadowOpacity: 0.8,

  },
  book: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
  },
  bookText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
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
  modalView: {
    flex: 1,
    backgroundColor: "#000000c4",
    justifyContent: "center",
    alignItems: "center"
  }
};
