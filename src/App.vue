<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
    <footer>
        <p>&copy; AR Designs - 2025 - </p>
      </footer>
  </v-app>
  </template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  }
  
   footer {
    text-align: center;
    padding: 20px;
    background-color: purple;
    color: #fff;
    position: relative;
    bottom: 0;
    width: 100%;
}
</style>

