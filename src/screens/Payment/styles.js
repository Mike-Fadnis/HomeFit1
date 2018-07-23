import {
  Dimensions
} from 'react-native';
const window = Dimensions.get('window');

export default {
  container: {
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#009FDB",
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: "#fff",
    flex: 1
  },
  cardHolderNameStyle: {
    fontSize: window.width / 21
  },
  container_spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  spinnerView: {
    height: window.width / 3,
    width: window.width / 3,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
