import {    
    FETCH_PRODUCTS,    
    FETCH_SUCCEEDED,
    FETCH_FAILED
} from './ActionTypes'


export const fetchProductsAction = (sort) => {
    return {
        type: FETCH_PRODUCTS,
        sort
    }
}

//Action sort by redux saga
export const fetchSuccessAction = (receivedProducts) => {
    return {
        type: FETCH_SUCCEEDED,
        receivedProducts
    }
}


export const fetchFailedAction = (error) => {
    return {
        type: FETCH_FAILED,
        error
    }
}