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
      fontSize: 17,
      fontWeight: 'bold',
      textAlign:"center"
    },
    content: {
      backgroundColor: "#fff",
      flex: 1
    },
    spinnerView: {
      alignSelf: 'center',
      justifyContent: 'center'
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
    }
  };
