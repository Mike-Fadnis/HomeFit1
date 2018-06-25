import { StyleSheet } from "react-native";

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
    ham : {
        backgroundColor :  "#009FDB",
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
       // marginLeft : 5,
        //marginRight : 5
    },
    productDescription: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 16,
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
        paddingTop : 5
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
        fontSize: 14,
        paddingLeft: 3
    },
    cartButtons: {
        padding: 5
    },
    qty: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
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
    reviewItem : {
        borderWidth : 1,
        borderRadius : 2,
        borderColor : '#ddd',
        borderBottomWidth : 1,
        shadowColor : '#000',
        shadowOffset : { width : 0, height :2 },
        shadowOpacity : 0.1,
        shadowRadius : 2,
        elevation : 1,
        marginLeft : 5,
        marginRight : 5,
        marginTop : 10,
    }
});

export default styles;
