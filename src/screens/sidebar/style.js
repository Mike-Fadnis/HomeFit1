const React = require("react-native");
const {
  Platform,
  Dimensions
} = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "400" : "400",
    fontSize: 18,
    marginLeft: 10,
    color: '#fff'
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  modalView: {
    flex:1,
    backgroundColor:'#000000c4',
    justifyContent:'center',
    alignItems:'center'
  },
  modalInnerView: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    alignSelf:"center",        
    height: 250,
    width: 300
  },
  modalTopView: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  modalMiddleView: {
    flex: 0.4,
    marginLeft: 20
  },
  modalBottomView: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10
  },
  modalTopText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "black"
  },
  modalRadioButtonStyles: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: 18
  },
  modalBotomButtonView: {
    alignSelf: "center"
  },
  modalBottomButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500"
  }
};
