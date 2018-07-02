import { combineReducers } from 'redux';
import addToCartItem from './addToCartItem';

const allReducers = combineReducers({
   addToCartItem
});

export default allReducers;
