<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">

        <categories-create @created="addNewCategory" />

        <categories-update />

      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoriesCreate'
import CategoriesUpdate from '@/components/CategoriesUpdate'

export default {
  data: () => ({
    categories: []
  }),
  components: {
    CategoriesCreate, CategoriesUpdate
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  }
}
</script>

<style scoped>

</style>