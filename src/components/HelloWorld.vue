<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- <div id="carousel">
      <img class="cloud9-item" src="../assets/logo.png" alt="Item #1">
      <img class="cloud9-item" src="../assets/logo.png" alt="Item #2">
      <img class="cloud9-item" src="../assets/logo.png" alt="Item #3">
      <img class="cloud9-item" src="../assets/logo.png" alt="Item #4">
      <img class="cloud9-item" src="../assets/logo.png" alt="Item #5">
      <img class="cloud9-item" src="../assets/logo.png" alt="Item #6">
    </div>
    
    <div id="buttons">
      <button class="left">
        ←
      </button>
      <button class="right">
        →
      </button>
    </div> -->
  </div>
</template>

<script>
// import '../plugins/cloud9carousel/jquery.cloud9carousel'
import $ from "jquery";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    // $(window).click(() => {
    //   $("#carousel").hide();
    // });
    // $("#carousel").Cloud9Carousel( {
    //   buttonLeft: $("#buttons > .left"),
    //   buttonRight: $("#buttons > .right"),
    //   autoPlay: 1,
    //   bringToFront: true
    // } );
  },
  methods: {
    test2: function () {
      // 立即表達函式解決"異步"或"回掉函式"導致for循環先結束
      // for (var i = 1; i <= 5; i++) {
      //   (function (j) {
      //     setTimeout(() => {
      //       console.log(j);
      //     }, 0);
      //   })(i);
      // }
      // 閉包
      // function wallet() {
      //   let origin = 100;
      //   return function saveMoney(save) {
      //     origin = origin + save;
      //     return origin;
      //   };
      // }
      // let money = wallet();
      // console.log(money(10));
      // console.log(money(50));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
