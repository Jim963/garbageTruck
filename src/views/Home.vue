<template>
  <div class="home">
    <div id="carlist"></div>

    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="" />

    <h3>My Google Maps Demo</h3>
    <div id="map"></div>

    <div>
      <button class="btn btn-primary">Test</button>
    </div>
  </div>
</template>

<script
      async
      defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBezC30AZ0pqFNKayLjbXmAqquwTANWMZk"
></script>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      basedata: [],
      map: null,

      // 預設經緯度在信義區附近
      // lat: Number,
      // lng: Number,
      carNear: [],
      carmarker: [],
    };
  },
  components: {
    HelloWorld,
  },
  created: function () {},
  mounted: function () {
    this.catchLocation();
    this.getBaseData();
    this.repeat();
  },
  computed: {
    ...mapState({
      carsinfo: (state) => state.cars.baseData,
      lat: (state) => state.cars.location.lat,
      lng: (state) => state.cars.location.lng,
    }),
  },

  methods: {
    repeat: function () {
      const repeat = setInterval(this.getBaseData, 10000);
    },
    catchLocation: function () {
      this.$store
        .dispatch("cars/catchLocation")
        .then((response) => {
          // console.log(response);
          this.initMap();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getBaseData: function () {
      let _this = this;
      this.$store
        .dispatch("cars/getData")
        .then((response) => {
          _this.deleteMarkers();
          _this.carNear = [];
          // console.log(response);
          response.data.forEach((value) => {
            _this.distance(value);
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log(this.carNear);
          _this.carNear.forEach((value, index) => {
            _this.setCarMarker(value, index);
          });
        });
    },

    // 建立地圖
    initMap() {
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.map = new google.maps.Map(document.getElementById("map"), {
        // 設定地圖的中心點經緯度位置
        center: { lat: this.lat, lng: this.lng },
        // 設定地圖縮放比例 0-20
        zoom: 13,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false,
      });
      this.setMarker();
      this.setCircle();
    },
    setCircle() {
      const circle = new google.maps.Circle({
        center: { lat: this.lat, lng: this.lng },
        radius: 3000,
        strokeOpacity: 0,
        fillColor: "rgb(40, 231, 104)",
        fillOpacity: 0.35,
        map: this.map,
      });
    },

    // 建立本身地標
    setMarker() {
      // 建立一個新地標
      const marker = new google.maps.Marker({
        // 設定地標的座標
        position: { lat: this.lat, lng: this.lng },
        // 設定地標要放在哪一個地圖
        map: this.map,
        icon: {
          url:
            "https://d2duuy9yo5pldo.cloudfront.net/niantic/2b357018-a333-49ce-8240-7a0a8cc45fac.gif",
          scaledSize: new google.maps.Size(100, 100),
        },
      });
    },
    // 刪除地標
    deleteMarkers: function () {
      this.carmarker.forEach(function (e) {
        e.setMap(null);
      });
      this.carmarker = [];
    },
    // 建立車子地標
    setCarMarker(value, index) {
      this.carmarker[index] = new google.maps.Marker({
        position: { lat: Number(value.Y), lng: Number(value.X) },
        map: this.map,
        label: value.car,
        icon: {
          url:
            "https://www.oxxostudio.tw/img/articles/201801/google-maps-3-marker-icon.png",
          scaledSize: new google.maps.Size(90, 60),
        },

        animation: google.maps.Animation.BOUNCE,
      });
    },

    distance(value) {
      let lat1 = this.lat,
        lng1 = this.lng,
        lat2 = Number(value.Y),
        lng2 = Number(value.X),
        unit = "K";

      if (lat1 == lat2 && lng1 == lng2) {
        return 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lng1 - lng2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }

        if (dist <= 2) {
          this.carNear.push(value);
        }
      }
    },
  },
};
</script>


<style>
#map {
  height: 600px;
  width: 100%;
}
</style>
