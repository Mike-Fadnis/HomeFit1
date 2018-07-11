import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "./ActionTypes";

export const addToCartItem = (product) => {
    return {
        type: ADD_CART_ITEM,
        product: product
    };
};

export const removeCartItem = (product) => {
    return {
        type: REMOVE_CART_ITEM,
        product: product
    };
};






















// export const fetchProductsAction = (sort) => {
//     return {
//         type: FETCH_PRODUCTS,
//         sort
//     }
// }

// //Action sort by redux saga
// export const fetchSuccessAction = (receivedProducts) => {
//     return {
//         type: FETCH_SUCCEEDED,
//         receivedProducts
//     }
// }


// export const fetchFailedAction = (error) => {
//     return {
//         type: FETCH_FAILED,
//         error
//     }
// }
