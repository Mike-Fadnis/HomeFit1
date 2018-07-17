import { API_BASE_URL } from "@common/global";

const AppUtils = {
    getProducts: async function (data) {
        return fetch(API_BASE_URL + "action=products", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }, function (error) {
            console.log("error", error);
        }).catch((error) => {
            console.log("error", error);
        });
    },
    getProductDetails: async function (value) {
        return fetch(API_BASE_URL + "action=product_detail&id=" + value, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }, function (error){
            console.log("error", error);
        }).catch((error) => {
            console.log("error", error);
        });
    },
    getCustomerReviews: async function (value) {
        return fetch(API_BASE_URL + "action=reviews&id=" + value, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }, function (error){
            console.log("error", error);
        }).catch((error) => {
            console.log("error", error);
        });
    },
    getSizesFlavours: async function (value) {
        return fetch(API_BASE_URL + "action=ajay&id=" + value, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }, function (error){
            console.log("error", error);
        }).catch((error) => {
            console.log("error", error);
        });
    },
    clientSignUp:async function (signUp) {
      // alert(JSON.stringify(signUp.name))
        return fetch(API_BASE_URL + "action=sign_up&name="+ signUp.name+"&email="+signUp.email+"&password="+signUp.password+"&deviceType="+signUp.deviceType+"&deviceToken="+signUp.deviceToken, {
            method: "POST"
        }).then((response) => {
            return response.json();
        }, function (error){
            console.log("error", error);
        }).catch((error) => {
            console.log("error", error);
        });
    },
    clientLogin:async function (login) {
      // alert(JSON.stringify(signUp.name))
// action=user_login&email=tester@gmail.com&password=123456
        return fetch(API_BASE_URL +"action=user_login&email="+login.email+"&password="+login.password, {
            method: "POST"
        }).then((response) => {
            return response.json();
        }, function (error){
            console.log("error", error);
        }).catch((error) => {
            console.log("error", error);
        });
    },
};
export default AppUtils;
