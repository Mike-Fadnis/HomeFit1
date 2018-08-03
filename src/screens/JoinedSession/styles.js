
import {
  Dimensions
} from 'react-native';
import colors from "@colors/myColor";
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
spinnerPosition: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.72)',
  justifyContent: 'center',
},
container_spinner: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.72)'
},
spinnerView: {
  height: window.width / 3,
  width: window.width / 3,
  backgroundColor: 'white',
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center'
},
};
