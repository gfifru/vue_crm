<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading" />

    <div class="row" v-else>

      <home-bill
          :rates="currency.rates"
      />

      <home-currency
          :rates="currency.rates"
          :date="currency.date"
      />

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  components: {
    HomeCurrency,
    HomeBill
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
