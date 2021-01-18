<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <loader v-if="loading"/>

    <p v-else-if="!records.length">Записей пока нет!
      <router-link to="/record">Добавить запись</router-link>
    </p>

    <div v-else>

      <div class="history-chart">
<!--        <canvas ref="canvas"></canvas>-->
        <chart
            :records="records"
            :categories="categories"
        />

      </div>

      <section>

        <history-table
            :records="items"
            :page="page"
            :page-size="pageSize"
        />

        <paginate
            v-model="page"
            :page-count="pageCount"
            :click-handler="pageChangeHandler"
            :prev-text="'Назад'"
            :next-text="'Дальше'"
            :container-class="'pagination'"
        >
        </paginate>

      </section>

    </div>
  </div>
</template>

<script>
import PaginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import Chart from "@/components/Chart";

export default {
  components: {
    Chart,
    HistoryTable
  },

  mixins: [PaginationMixin],
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.setup()

    // this.records = records.map(record => {
    //   return {
    //     ...record,
    //     categoryName: this.categories.find(c => c.id === record.categoryId).title,
    //     typeClass: record.type === 'income' ? 'green' : 'red',
    //     typeText: record.type === 'income' ? 'Доход' : 'Расход',
    //   }
    // })
    this.loading = false
  },
  methods: {
    setup() {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      }))
    }
  },
  watch: {
    '$route'(to) {
      if (!to.query.page) {
        // кликнули в сайдбаре на История
        this.pageChangeHandler(1);
        this.page = 1;
      }
    }
  }

}
</script>

<style scoped>

</style>