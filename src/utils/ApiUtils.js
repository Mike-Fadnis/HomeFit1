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
    }
};
export default AppUtils;
