import axios from "axios";

const state = {
  items: [],
};

const mutations = {
  setData: function(state, items) {
    state.items = items;
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
        .finally(() => {});
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
