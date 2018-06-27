import { API_BASE_URL } from '@common/global';

const AppUtils = {
    getProducts: async function (data) {
        return fetch('http://ajaypalsidhu.com/demo/HomeFit/api/api.php?action=products', {
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
}
export default AppUtils;