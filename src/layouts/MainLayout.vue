<template>
  <loader v-if="loading" />
  <div v-else>
    <div class="app-main-layout">

      <navbar @click="isOpen = !isOpen"/>

      <sidenav v-model="isOpen"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar"
import Sidenav from "@/components/app/Sidenav"

export default {
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    Navbar, Sidenav
  }
}
</script>

<style scoped>

</style>