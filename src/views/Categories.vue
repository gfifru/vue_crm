<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading"/>

      <div class="row" v-else>

        <categories-create
            @created="addNewCategory"
        />

        <categories-update
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updatedCategory="updateListCategory"
        />
        <p v-else class="center">Категорий пока нет!</p>

      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoriesCreate'
import CategoriesUpdate from '@/components/CategoriesUpdate'

export default {
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    CategoriesCreate, CategoriesUpdate
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    // console.log(this.categories)
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      // console.log(this.categories)
    },
    updateListCategory(category) {
      // находим index измененной категории
      const index = this.categories.findIndex(c => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  }
}
</script>

<style scoped>

</style>