import {Dimensions} from "react-native";
const window = Dimensions.get('window');
export default {
  container: {
    backgroundColor: "#009FDB",
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer : {
    marginLeft : 10,
    marginRight : 10
  },
  title : {
    paddingBottom : 20
  },
  titleText : {
    color : '#fff',
    fontSize : 24,
    textAlign : 'center',
    fontWeight : 'bold'
  },
  imputBoxContainer : {
    paddingLeft : 10,
    paddingRight : 10
  },
  goBack : {
    marginTop : 10,
    padding : 5
  },
  goBackText : {
    color : '#fff',
    textAlign : 'center',
    fontSize : 18,
    textDecorationLine : 'underline'
  },
  container_spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(0,0,0,0.72)'
  },
  spinnerView:{height:window.width/3, width:window.width/3, backgroundColor:'white', borderRadius:20, alignItems:'center', justifyContent:'center'},
  inputContainer:{ marginBottom : 10 },
  radioButtonContainerView:{  marginTop : 20, flexDirection:'row'},
  radioButtonHeadingContainer:{flex:0.25,  alignItems:'flex-start', justifyContent:'center'},
  textStyle:{color:'white',fontWeight:'600', fontSize:18},
  radioButtonContainer:{flex:0.6,  alignItems:'flex-start',justifyContent:'center', marginTop:5},
  lableStyle:{color:'white',marginRight: 10, fontWeight:'600', fontSize:18},
  emptyView:{flex:0.15,  alignItems:'flex-start', justifyContent:'center'},
  buttonView:{ paddingLeft : 10, paddingRight : 10, marginTop : 20}
};
