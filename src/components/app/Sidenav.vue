<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
        tag="li"
        active-class="active"
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        :exact="link.exact"
    >
      <a class="waves-orange pointer">{{ link.title }}</a>
    </router-link>

  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: [
      'value'
  ],
  data: () => ({
    links: [
      {title: localizeFilter('Menu_Bill'), url: '/', exact: true},
      {title: localizeFilter('Menu_History'), url: '/history'},
      {title: localizeFilter('Menu_Planning'), url: '/planning'},
      {title: localizeFilter('Menu_Record'), url: '/record'},
      {title: localizeFilter('Menu_Categories'), url: '/categories'},
    ]
  })
}
</script>

<style scoped>

</style>