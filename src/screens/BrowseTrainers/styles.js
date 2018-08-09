import {
  Dimensions
} from "react-native";
const window = Dimensions.get("window");
import myColors from "@colors/myColor";

export default {
  container: {
    //marginTop : 5,
    backgroundColor: "#fff"
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
  trainerItemList: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: 100
  },
  trainerImage: {
    // height: 100,
    // width: 100,
    // borderRadius: 50,
    justifyContent: "center"
  },
  trainerDescription: {
    flex: 1
  },
  descriptionLine: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    fontSize: window.width / 25
  },
  descriptionLine3: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    fontSize: window.width / 25
    //height:20
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
  spinnerView: {
    height: window.width / 3,
    width: window.width / 3,
    backgroundColor: "rgba(255, 255, 255, 255)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyImageStyle: {
    height: window.width / 5,
    width: window.width / 5,
    backgroundColor: myColors.blue,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: window.width / 2.5
  },
  emptyImageTextStyle: {
    color:"white",
    fontSize:18,
    fontWeight:"900"
  },
  pickerStyle:{
    height:window.width / 1.5
  },
  pickerStyleContainer:{
    height:window.width / 1.7
  }
};
