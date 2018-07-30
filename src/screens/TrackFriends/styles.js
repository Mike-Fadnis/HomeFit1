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
      flexWrap:"wrap"
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
    },
    friendText : {
        color : '#fff',
        fontSize : 16
    },
    friendsTextContainer : {
        borderWidth : 1,
            borderRadius : 2,
            borderColor : '#fff',
            padding : 5,
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
  };
