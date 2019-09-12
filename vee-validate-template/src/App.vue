<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Dosis:300,400,500,600,700&subset=latin-ext");
@import "~@/assets/styles/global";

#app {
  font-family: 'Dosis', sans-serif !important;
  font-weight: 700;
  font-size:16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #949494;
  height: 100%;
}
</style>
