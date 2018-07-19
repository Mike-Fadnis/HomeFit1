import {
  API_BASE_URL
} from "@common/global";

const AppUtils = {
  getProducts: async function(data) {
    return fetch(API_BASE_URL + "action=products", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getProductDetails: async function(value) {
    return fetch(API_BASE_URL + "action=product_detail&id=" + value, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getCustomerReviews: async function(value) {
    return fetch(API_BASE_URL + "action=reviews&id=" + value, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getSizesFlavours: async function(value) {
    return fetch(API_BASE_URL + "action=ajay&id=" + value, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  clientSignUp: async function(signUp) {
    return fetch(API_BASE_URL + "action=sign_up&name=" + signUp.name + "&email=" + signUp.email + "&password=" + signUp.password + "&deviceType=" + signUp.deviceType + "&deviceToken=" + signUp.deviceToken, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  clientLogin: async function(login) {
    return fetch(API_BASE_URL + "action=user_login&email=" + login.email + "&password=" + login.password + "&deviceType=" + login.deviceType + "&deviceToken=" + login.deviceToken, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  trainerSignUp: async function(signUp) {
    return fetch(API_BASE_URL + "action=trainer_sign_up&name=" + signUp.name + "&email=" + signUp.email + "&password=" + signUp.password + "&deviceType=" + signUp.deviceType + "&deviceToken=" + signUp.deviceToken, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  trainerLogin: async function(login) {
    return fetch(API_BASE_URL + "action=trainer_login&email=" + login.email + "&password=" + login.password + "&deviceType=" + login.deviceType + "&deviceToken=" + login.deviceToken, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  availableDates: async function(dates) {
    return fetch(API_BASE_URL + "action=save_tainer_dates&id=" + dates.id + "&date_time=" + dates.availableSlot, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getSpecialties: async function(data) {
    return fetch("http://ajaypalsidhu.com/demo/HomeFit/api/api.php?action=specialities&id=18", {
      method: "Get"
    }).then((response) => {
      console.log("112233:  ", JSON.stringify(response))
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getAvailableSlots:async function (Id) {
       return fetch(API_BASE_URL +"action=fetct_available_time_slots&id="+Id, {
           method: "GET"
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
