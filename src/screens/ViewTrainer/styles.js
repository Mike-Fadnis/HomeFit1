import {
  Dimensions
} from 'react-native';
import colors from "@colors/myColor";
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
  nameContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  name: {
    //flex : 1,
    color: '#009FDB',
    fontSize: 24,
    fontWeight: 'bold'
  },
  singleImageContainer: {
    //alignSelf : 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop:10
  },
  imageBig: {
    marginLeft: 5,
    marginTop:10
  },
  specialityTitle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  bioContainer: {
    backgroundColor: '#009FDB',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    flexWrap: 'wrap'
  },
  bio: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  book: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  bookText: {
    fontSize: 20,
    width: '100%',
    color: '#fff',
    backgroundColor: '#009FDB',
    textAlign: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20
  },
  modalView: {
    flex: 1,
    backgroundColor: '#000000c4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bookSessionView: {
    backgroundColor: '#009FDB',
    marginTop: 2
  },
  bookSessionButton: {
    width: window.width / 1,
    alignItems: "center",
    justifyContent: "center"
  },
  quickAdviceView: {
    backgroundColor: '#009FDB',
    marginTop: 2
  },
  quickAdviceButton: {
    width: window.width / 1,
    alignItems: "center",
    justifyContent: "center"
  },
  spinner_View: {
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
  imageContainer:{height:window.width / 4, width:window.width / 4, backgroundColor:colors.blue, marginLeft:5, alignItems:'center', justifyContent:'center', borderRadius:window.width/2},
  trainerImage: {
    justifyContent:'center'
  },
  imageView:{
    alignItems:'center',
    margin:10
  },
  imageEmptyText:{
    fontSize:20,
    fontWeight:'800',
    color:'white'
  }
};
