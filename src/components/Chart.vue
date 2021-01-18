
<script>

import {Pie} from 'vue-chartjs'
export default {
  name: "Chart",
  props: ['records', 'categories'],
  // data: () => ({
  //   labels: null
  // }),
  extends: Pie,
  mounted() {
    this.renderChart({
      labels: this.categories.map(c => c.title),
      datasets: [{
        label: 'Расходы по категориям',
        // data: [12, 19, 3, 5, 2, 3],
        // data: this.records.map(r => r.amount),
        data: this.categories.map(c => {
          return this.records.reduce((total, r) => {
            if (r.categoryId === c.id && r.type === 'outcome') {
              total += +r.amount
            }
            return total
          }, 0)
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    })
  }
}
</script>

<style scoped>

</style>