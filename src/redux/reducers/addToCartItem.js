import {ADD_CART_ITEM, REMOVE_CART_ITEM} from "@actions/ActionTypes";

const cart = {
    cartItems :[],
    total: 0,
    finalTotal:0,
    totalPrice: 0
};
const compareCartItem = (cartItem, action) => {
    return cartItem.id === action.product.id;
};
export default function addTocart(state = cart, action) {
    switch (action.type) {
        case ADD_CART_ITEM:
        let newcartItems = state.cartItems;
        const isExisted = state.cartItems.some(cartItem => compareCartItem(cartItem, action));
        let tot_Qty = state.total;
        let total_Qty = state.total;
            if (isExisted){
                {state.cartItems.map(item => {
                    if(item.id === action.product.id){
                    var qty =action.product.totalQuantity
                    item.totalQuantity = parseInt(item.totalQuantity) + parseInt(action.product.totalQuantity)                    
                    tot_Qty = item.totalQuantity
                    total_Qty = parseInt(qty) + parseInt(state.total)                      
                    }
                }) }
                tot_Qty = total_Qty;
                newcartItems: state.cartItems;
                } else {
                    newcartItems = [...newcartItems, action.product];
                    tot_Qty = parseInt(state.total) + parseInt(action.product.totalQuantity);
                }
                return Object.assign({}, state,  {
                    cartItems: newcartItems,
                    total: tot_Qty,//state.total+1,     
                });

        case REMOVE_CART_ITEM:
            let removeCartItems = state.cartItems;
            let totalCost = state.totalPrice;
            let totalQty = state.total;
            const isExistedDeleted = state.cartItems.some(cartItem => compareCartItem(cartItem, action));
                if (isExistedDeleted){
                    {state.cartItems.map((item,key) => {
                        if(item.id === action.product.id){                           
                            var price = parseFloat(item.price);
                            var totPrice = parseFloat(totalCost);
                            var totQty = parseFloat(totalQty);
                            state.cartItems.splice(key,1);
                            totalCost = totPrice - price;
                            totalQty = totQty - item.totalQuantity;
                        }
                })}
                    removeCartItems = state.cartItems;
                    totalCost = totalCost;
                    totalQty = totalQty;
                }
                return Object.assign({}, state,  {
                    cartItems: removeCartItems,
                    total: totalQty,
                    totalPrice: totalCost
                });

        default:
            return state;
            }
        }
