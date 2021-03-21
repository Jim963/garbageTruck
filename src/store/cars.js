import axios from "axios";

const state = {
  baseData: [],
  location: {},
};

const mutations = {
  setData: function (state, items) {
    state.baseData = items;
  },

  setLocation: function (state, items) {
    state.location = items;
  },

};

const actions = {
  getData(context) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://datacenter.taichung.gov.tw/swagger/OpenData/215be7a0-a5a1-48b8-9489-2633fed19de3?limit=10&offset=10"
        )
        .then((response) => {
          context.commit("setData", response.data);

          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        })
        .finally(() => {

        });
    });
  },

  catchLocation: function (context) {
    return new Promise((resolve, reject) => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          context.commit("setLocation", {
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude)
          });
          resolve(position);
        });
      } else {
        // Browser doesn't support Geolocation
        alert("未允許或遭遇錯誤！");
        reject("錯誤")
      }
    })
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
