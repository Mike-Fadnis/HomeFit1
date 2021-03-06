import {
  StyleSheet,
  Dimensions
} from "react-native";
const window = Dimensions.get("window");

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  content: {
    position: "relative",
    flex: 1,
    flexDirection: "column"
  },
  header: {
    backgroundColor: "#34ace0"
  },
  ham: {
    backgroundColor: "transparent"
  },
  title: {
    fontFamily: "Arial",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold"
  },
  search: {
    backgroundColor: "#FFFFFF",
  },
  inputIcon: {
    padding: 16
  },
  productBlock: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    padding: 10
  },
  productImageView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  productImageStyle: {
    width: 135,
    height: 150
  },
  productRatingsView: {
    display: "flex",
    alignItems: "flex-end",
    paddingRight: 10
  },
  modalPickersView: {
    display: "flex",
    alignItems: "flex-start",
    flex: 1,
    marginTop: 16,
    flexDirection: "row",
    margin: 10
  },
  pickerView: {
    flex: 0.5
  },
  pickerStyle: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    backgroundColor: '#EDEEF0',
    height: 50,
    borderWidth: 1.2,
    borderColor: "lightgrey"
  },
  pickerTextView: {
    flex: 0.7,
    justifyContent: "center",
    padding: 10
  },
  pickerDropdownView: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1.2,
    borderColor: "lightgrey"
  },
  productDescription: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 16,
    padding: 5,
    borderBottomColor: "#9a9b9c",
    borderBottomWidth: 0.8,
    width: "51%"
  },
  type: {
    color: "#009FDB",
    fontFamily: "Arial",
    fontSize: 14,
    fontWeight: "bold"
  },
  name: {
    color: "black",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 4,
  },
  description: {
    paddingTop: 4,
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15
  },
  productRating: {
    marginRight: 10,
    marginTop: 5,
    padding: 5,
    backgroundColor: "transparent",
    width: 39,
    minHeight: 30,
    display: "flex",
    borderWidth: 1,
    borderColor: "#9a9b9c",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  subtitle: {
    color: "#9a9b9c",
    fontSize: 12,
    lineHeight: 15,
    marginTop: 2
  },
  select: {
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    borderColor: "#edeeef",
    backgroundColor: "#edeeef"
  },
  selecto: {
    width: "100%"
  },
  selectIcon: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  price: {
    color: "black",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 28,
    paddingTop: 4,

  },
  priceBlock: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 20,
    paddingTop: 5
  },
  freeShipping: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 5
  },
  freeShippingText: {
    color: "#009FDB",
    fontFamily: "Arial",
    fontSize: 14,
    fontWeight: "bold"
  },
  freeShippingAdditionalText: {
    fontFamily: "Arial",
    fontSize: 14
  },
  cartButtons: {
    padding: 5
  },
  qty: {
    // display: "flex",
    flex:1,
    backgroundColor: "#5aaadf",
    alignItems: "center",
    margin:1
  },
  addCartButton: {
    fontWeight: "bold"
  },
  reviewsHeadingBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#edeeef",
    height: 50,
    borderWidth: 1,
    borderColor: "#9a9b9c"
  },
  reviewsHeading: {
    fontFamily: "Arial",
    fontSize: 20,
    paddingLeft: 3,
    fontWeight: "bold"
  },
  reviewDate: {
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "bold",
    color: "#9a9b9c",
    marginTop: 2
  },
  reviewItem: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  dropdownImageStyle: {
    width: 20,
    height: 20
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
    backgroundColor: '#009FDB',
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
  spinnerView:{
    height:window.width/3,
    width:window.width/3,
    backgroundColor:'white',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default styles;
