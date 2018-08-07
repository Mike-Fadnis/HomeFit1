import {
  Dimensions,
  Platform
} from "react-native";
const window = Dimensions.get('window');
import myColors from "@colors/myColor";
export default {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#009FDB"
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  contentStyle: {
    flex: 1
  },
  rateYourTrainerTextStyle:{
    flex:0.05,
    justifyContent:"center",
    paddingLeft:10
  },
  emptyImageStyle: {
    height: window.width / 7,
    width: window.width / 7,
    backgroundColor: myColors.blue,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: window.width / 2.5
  },
  emptyImageTextStyle: {
    color:"white",
    fontSize:18,
    fontWeight:"900"
  },
  trainerImage: {
    justifyContent: "center"
  },
  trainerDescription: {
    flex: 1
  },
  descriptionLine: {
    fontWeight:'700',
    fontSize: 16
  },
  descriptionLine3: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 5,
    fontSize: 15
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
