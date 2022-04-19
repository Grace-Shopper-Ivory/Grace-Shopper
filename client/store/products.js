import Axios from 'axios'

let initialState = {products:[],product:{}}

const SET_PRODUCTS = "SET_PRODUCTS"

export const setProducts = (products) => {
    return { type: SET_PRODUCTS, products };
  };
  
export const fetchProducts = () => {
    return async (dispatch) => {
        try{
            const { data } = await Axios.get('api/products');
            dispatch(setProducts(data));
        }
        catch(err){
            console.log('ERROR',err)
        }
    };
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return {...state,products:action.products};
      default:
        return state;
    }
}