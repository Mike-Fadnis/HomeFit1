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
    backgroundColor: "#009FDB"
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  contentStyle: {
    flex: 1,
  },
  timeView: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,

    height: window.width / 10,
    width: window.width / 1.1,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    flex: 1,
    backgroundColor: "#000000c4",
    justifyContent: "center",
    alignItems: "center"
  },
  subModalContainerView: {
    width: 300,
    alignSelf: "center",
    height: 400,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding:10
  },
  modalBottomView: {
    flex: 0.2,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 10
  },
  modalBotomButtonView: {
    alignSelf: "center"
  },
  modalBottomButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#009FDB"
  },
  container_spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"rgba(0,0,0,0.72)"
  },
  spinnerView:{
    height:window.width / 3,
    width:window.width / 3,
    backgroundColor:"white",
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center"
  }
};
