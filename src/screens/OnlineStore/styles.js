import {
  Dimensions
} from "react-native";
const window = Dimensions.get("window");

export default {
  container: {
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#009FDB",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  ham: {
    backgroundColor: "#009FDB",
  },
  search: {
    backgroundColor: "#FFF"
  },
  image: {
    width: "100%",
    height: 150
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    shadowColor: "#000",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardDescription: {
    fontSize: 15,
  },
  separator: {
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 10,
  },
  storeHeader: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    borderColor: "#ddd",
    marginTop: 10
  },
  storeItems: {
    backgroundColor: "#dce2ef",
    borderWidth: 1,
    borderColor: "#ccc"
  },
  storeProducts: {
    backgroundColor: "#FFFFFF",
    height: 290,
    margin: 5,
    width: window.width / 2.15,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  productsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  productCount: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#009FDB",
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#C8C8C8",
    minHeight: 130
  },
  cardContent: {
    marginTop: 16,
    paddingLeft: 10,
    paddingRight: 10
  },
  type: {
    color: "#009FDB",
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "bold"
  },
  name: {
    color: "black",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 4,
  },
  description: {
    paddingTop: 4,
    fontFamily: "Arial",
    color: "#514f4f",
    fontSize: 12,
    lineHeight: 15
  },
  // for column one design
  colOnestoreProducts: {
    backgroundColor: "#FFFFFF",
    height: 170,
    width: window.width / 1,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  colOneContent: {
    flex: 1,
    flexDirection: "row"
  },
  colOneImageinRow: {
    flex: 0.4,
    padding: 10,
    borderRightWidth: 0.5,
    borderRightColor: "lightgrey"
  },
  colOneIndexLabelView: {
    flex: 0.2,
    position: "absolute",
    top: 0,
    left: 5,
    zIndex: 1,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderBottomColor: "white",
    borderRightColor: "white",
    borderLeftColor: "white",
  },
  colOneIndexLabelSubView: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#009FDB"
  },
  colOneImageView: {
    flex: 0.8,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 0,
    backgroundColor: "green"
  },
  colOneProductDescription: {
    flex: 0.6,
    padding: 10
  },
  colOnetype: {
    color: "#009FDB",
    fontFamily: "Arial",
    fontSize: 14,
    fontWeight: "bold"
  },
  colOnename: {
    color: "black",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 4,
  },
  colOnedescription: {
    paddingTop: 4,
    fontFamily: "Arial",
    color: "#514f4f",
    fontSize: 14,
    lineHeight: 15
  },
  spinnerView: {
    alignItems: "center",
    justifyContent: "center"
  },
  spinnerPosition: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
  }
};
