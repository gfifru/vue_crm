<template>
  <div class="app-main-layout">

    <navbar @click="isOpen = !isOpen" />

    <sidenav v-model="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar"
import Sidenav from "@/components/app/Sidenav"

export default {
  data: () => ({
    isOpen: true
  }),
  components: {
    Navbar, Sidenav
  }
}
</script>

<style scoped>

</style>