<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  components: {},
  created: function () {},
  mounted: function () {
    // this.big();
  },
  methods: {
    big: function () {
      // var docElm = document.getElementById("app");
      //W3C
      document.body.requestFullscreen();

      //FireFox
      document.body.mozRequestFullScreen();

      //Chrome等
      document.body.webkitRequestFullScreen();
    },
  },
};
</script>