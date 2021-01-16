<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
            v-for="currency in currencies"
            class="currency-line"
            :key="currency"
        >
          <span>{{ getCurrency(currency) | currency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'], // получаем данные из Home.vue
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    bill() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.bill * this.rates[currency])
    }
  }
}
</script>

<style scoped>

</style>