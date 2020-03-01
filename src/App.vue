<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-md-auto">
        <Master/>
      </div>
      <div class="col">
        <Detail/>
      </div>
    </div>
  </div>
</template>

<script>
import Master from "./components/Master.vue";
import Detail from "./components/Detail.vue";

import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "app",
  components: {
    Master,
    Detail,
  }
};
</script>  

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app > * > div {
  margin-top: 30px;
}
</style>

