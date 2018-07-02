import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '@actions/ActionTypes';

const cart = {
    cartItems :[],
    total: 0,
    totalPrice: 0
}
const compareCartItem = (cartItem, action) => {
    return cartItem.id === action.product.id;
}
export default function addTocart(state = cart, action) {
  //alert(JSON.stringify(state.cartItems))
    switch (action.type) {
        case ADD_CART_ITEM:
        let newcartItems =state.cartItems
            const isExisted = state.cartItems.some(cartItem => compareCartItem(cartItem, action))

            //alert(isExisted)
            if (isExisted){
                {state.cartItems.map(item => {

                    if(item.id === action.product.id){

                    item.totalQuantity = item.totalQuantity+1

                        // item.totalQuantity = item.totalQuantity +1
                    }

          })}
                 newcartItems: state.cartItems
            // alert(JSON.stringify(newcartItems))
            }else{
                newcartItems: newcartItems.push(action.product);
            }

            return Object.assign({}, state,  {
                    cartItems: newcartItems,
                    total: state.total+1,
                    totalPrice: state.totalPrice + Number(action.variation === undefined || action.variation == null || action.variation.price === undefined ? action.product.price : action.variation.price)
            })


case REMOVE_CART_ITEM:
  let removeCartItems =state.cartItems
      const isExistedDeleted = state.cartItems.some(cartItem => compareCartItem(cartItem, action))

      //alert(isExisted)
      if (isExistedDeleted){
          {state.cartItems.map((item,key) => {

              if(item.id === action.product.id){
                state.cartItems.splice(key,1);
                  // item.totalQuantity = item.totalQuantity +1
              }

    })}
           removeCartItems= state.cartItems
      //alert(JSON.stringify(removeCartItems))
      }

      return Object.assign({}, state,  {
              cartItems: removeCartItems,
              // total: state.total+1,
              totalPrice: state.totalPrice - Number(action.variation === undefined || action.variation == null || action.variation.price === undefined ? action.product.price : action.variation.price)
      })

        default:
            return state;
    }
}
