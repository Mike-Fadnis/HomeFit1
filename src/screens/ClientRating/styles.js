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
  }
};
