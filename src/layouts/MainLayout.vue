<template>
  <loader v-if="loading" />
  <div v-else>
    <div class="app-main-layout">

      <navbar @click="isOpen = !isOpen"/>

      <sidenav v-model="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidenav from '@/components/app/Sidenav'
import messages from '@/utils/messages'

export default{
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
  },
  computed: {
    locale() {
      return this.$store.getters.info.locale
    },
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так!')
    }
  }
}
</script>

<style scoped>

</style>