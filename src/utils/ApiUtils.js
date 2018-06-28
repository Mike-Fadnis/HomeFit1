import { API_BASE_URL } from '@common/global';

const AppUtils = {
    getProducts: async function (data) {
        return fetch(API_BASE_URL+'action=products', {
            method: 'GET'
        }).then((response) => {
            //alert('apiutils alert: ' + JSON.stringify(response))            
            return response.json()
        }, function (error) {
            console.log('error', error)
        }).catch((error) => {
            console.log('error', error)
        });
    },
    getProductDetails: async function (value) {
        //alert('api :'+value)
        return fetch(API_BASE_URL+'action=product_detail&id='+value, {
            method: 'GET'
        }).then((response) => {
            //alert('productDetails :' + JSON.stringify(response))
            return response.json()            
        }, function (error){
            console.log('error', error)
        }).catch((error) => {
            console.log('error', error)
        });
    },
}
export default AppUtils;