import {API_BASE_URL,convertFormData} from "@common/global";

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
    return fetch(API_BASE_URL + "action=trainer_sign_up&name=" + signUp.name + "&email=" + signUp.email + "&password=" + signUp.password + "&deviceType=" + signUp.deviceType + "&gender=" + signUp.gender + "&deviceToken=" + signUp.deviceToken, {
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
  availableDates: async function(dates,date) {
    return fetch(API_BASE_URL + "action=save_tainer_dates&id=" + dates.id + "&date=" + date + "&date_time=" + dates.availableSlot, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getAllSpecialties: async function() {
    return fetch(API_BASE_URL + "action=get_all_specialities", {
      method: "GET"
    }).then((response) => {
      console.log("112233:  ", JSON.stringify(response));
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getSpecialitiesById: async function(id) {
    return fetch(API_BASE_URL + "action=get_specialities&trainer_id=" + id, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getAvailableSlots: async function(Id) {
    return fetch(API_BASE_URL + "action=fetct_available_time_slots&id=" + Id, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getTrainerList: async function() {
    return fetch(API_BASE_URL + "action=get_trainers", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getTrainersData: async function(trainerId) {
    return fetch(API_BASE_URL + "action=trainer_detail&id=" + trainerId, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  addingSpecialities: async function(specialitiesData) {
    return fetch(API_BASE_URL + "action=save_specialities&id=" + specialitiesData.id + "&specialities=" + specialitiesData.dataArray, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getFeaturedProducts: async function(){
    return fetch(API_BASE_URL + "action=fetch_featured_products", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getHighestRatedTrainerList: async function() {
    return fetch(API_BASE_URL + "action=search_for_highest_rated_trainers", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getFeaturedTrainersList: async function() {
    return fetch(API_BASE_URL + "action=fetch_featured_trainers", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getVideoUploadCharges: async function() {
      return fetch(API_BASE_URL + "action=fetch_video_upload_charges", {
        method: "GET"
      }).then((response) => {
        return response.json();
      }, function(error) {
        console.log("error", error);
      }).catch((error) => {
        console.log("error", error);
      });
    },
    getLandingPageImages: async function() {
        return fetch(API_BASE_URL + "action=fetch_landing_page_images", {
          method: "GET"
        }).then((response) => {
          return response.json();
        }, function(error) {
          console.log("error", error);
        }).catch((error) => {
          console.log("error", error);
        });
      },
    getCategories:async function() {
        return fetch(API_BASE_URL + "action=fetch_categories", {
          method: "GET"
        }).then((response) => {
          return response.json();
        }, function(error) {
          console.log("error", error);
        }).catch((error) => {
          console.log("error", error);
        });
    },
    getProductsByCategory: async function(id){
      return fetch(API_BASE_URL + "action=search_product_by_category&category=" + id , {
        method: "GET"
      }).then((response) => {
        return response.json();
      }, function(error) {
        console.log("error", error);
      }).catch((error) => {
        console.log("error", error);
      });
    },
  getCards: async function(id){
    return fetch(API_BASE_URL + "action=fetch_card_info&user_id=" + id , {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  addCardDetails: async function(cardDetailsObject) {
    return fetch(API_BASE_URL + "action=save_card_info&cardDetailsObject=[" + cardDetailsObject + "]", {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getImages:async function() {
    return fetch(API_BASE_URL + "action=fetch_client_home_page_images", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  addingSlotsForUser:async function(data) {
    return fetch(API_BASE_URL + "action=save_user_appt&user_id=" + data.user_id + "&trainer_id=" + data.trainer_id + "&date=" + data.date + "&time=" + data.time, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getUpcomingSessions:async function(id) {
    return fetch(API_BASE_URL + "action=fetch_upcoming_appointments&user_id=" + id, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getParticularAppointments: async function(primaryId){
    return fetch(API_BASE_URL + "action=fetch_particular_upcoming_appointments&user_id=" + primaryId.userId + "&trainer_id=" + primaryId.trainerId , {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
   startSession:async function(id) {
  // action=start_free_session&trainer_id=16
    return fetch(API_BASE_URL + "action=start_free_session&trainer_id=" + id, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  stopSession:async function(id) {
  // action=stop_free_session&session_id=115
    return fetch(API_BASE_URL + "action=stop_free_session&session_id=" + id, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  joinUpcomingHourlyAppt:async function(id) {
    return fetch(API_BASE_URL + "action=join_upcoming_hourly_appointments&appt_id=" + id, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  uploadImage: async function(data) {
    let formdata = new FormData();
    formdata.append("action", "trainers_upload_image");
    formdata.append("trainer_id", data.trainer_id)
    formdata.append("data",data.data)
    console.log("formdata",formdata)
    return fetch("http://ajaypalsidhu.com/demo/HomeFit/api/api.php", {
      method: "POST",
      body: formdata
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("responseJson",responseJson);
      return responseJson;
    })
    .catch((error) => {
        console.log("errorgfgfgsdfgs",error)
    });
  },
   appointmentCancelledByUser:async function(id) {
    return fetch(API_BASE_URL + "action=user_appoitment_cancellation&appt_id="+id, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  appointmentCancelledByTrainer:async function(id) {
    // action=trainer_appoitment_cancellation&appt_id=48
    return fetch(API_BASE_URL + "action=trainer_appoitment_cancellation&appt_id="+id, {
      method: "POST"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getUpcomingSessionsByTrainerId:async function(id) {
    return fetch(API_BASE_URL + "action=fetch_upcoming_appointments_for_trainers&trainer_id=" + id, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  getTrainersWithMostSessions:async function(id) {
    return fetch(API_BASE_URL + "action=search_for_trainers_with_the_most_sessions", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
  cancelledUpcomingHourlyAppt:async function(id) {
    return fetch(API_BASE_URL + "action=stop_ongoing_hourly_appointments&appt_id=" + id, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }, function(error) {
      console.log("error", error);
    }).catch((error) => {
      console.log("error", error);
    });
  },
};
export default AppUtils;
