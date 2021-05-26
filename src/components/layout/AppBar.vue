<template>
  <v-app-bar app dense>
    <a :href="{name: 'Home'}" class="my-2" style="height: 80%;">
      <img
          alt="Avander Logo"
          class="shrink mr-2"
          src="@/assets/avander.svg"
          style="height: 100%;"
      />
    </a>
  </v-app-bar>
</template>

<script>

export default {
  name: "AppBar",
}
</script>

<style scoped>

</style>