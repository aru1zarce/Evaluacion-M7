<template>
  <v-app-bar app color="purple" dark>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon to="/admin">
      <v-icon>mdi-wrench</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    goToAdmin() {
      this.$router.push('/admin');
    },
  },
};
</script>

<style scoped>
.v-toolbar-title {
  font-size: 24px;
  font-family: Arial, sans-serif;
  }
</style>