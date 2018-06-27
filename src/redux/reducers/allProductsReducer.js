import {
    FETCH_PRODUCTS,
    FETCH_SUCCEEDED,
    FETCH_FAILED
} from '@actions/ActionTypes';

const productReducers = (products = [], action) => {        
    switch (action.type) {   
        case FETCH_SUCCEEDED:
            return action.receivedProducts;

        case FETCH_FAILED:
          return [];        

        default:
          return products;
    }
}

export default productReducers;