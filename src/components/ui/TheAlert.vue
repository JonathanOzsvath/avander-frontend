<template>
  <v-container>
    <v-alert
        class="text-center"
        :value="getAlertShow"
        :type="getAlertType"
        dismissible
        outlined
        border="left"
        transition="fade-transition"
        @input="closeAlert"
    >{{ getAlertMessage }}
    </v-alert
    >
  </v-container>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "TheAlert",
  data() {
    return {
      show: false,
      message: "",
      type: null
    };
  },
  computed: {
    ...mapGetters([
      'getAlertMessage',
      'getAlertType',
      'getAlertShow'
    ]),
  },
  methods: {
    ...mapMutations([
        'setAlert'
    ]),
    closeAlert() {
      this.setAlert({message: '', type: null, show: false})
    }
  }
}
</script>

<style scoped>

</style>