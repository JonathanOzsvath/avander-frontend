<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <the-alert></the-alert>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from "@/components/layout/AppBar.vue";
import TheAlert from "@/components/ui/TheAlert.vue";

export default {
  name: 'App',

  components: {
    AppBar,
    TheAlert
  },

  data: () => ({
    //
  }),
};
</script>
