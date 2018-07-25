import {
  Dimensions,
  Platform
} from "react-native";
import myColors from "@colors/myColor";
const window = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: myColors.blue
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  contentStyle: {
    flex: 1
  },
  buttonsView: {
    flex: 1,
    margin:25
  }
};
