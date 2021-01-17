<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select
              ref="select"
              v-model="current"
          >
            <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
            >{{ category.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required">
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue">
            Минимальная величина {{ $v.limit.$params.minValue.min }}, сейчас она: {{ limit }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
import {minValue, required} from "vuelidate/lib/validators";

export default {
  // получаем данные из Categories.vue
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null // значения title и limit приходящие с сервера при выборе категории
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  watch: {
    current(categoryId) {
      const {title, limit} = this.categories.find(c => c.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  // вызывается первым при инициализации страницы
  created() {
    const {id, title, limit} = this.categories[0]; // получаем поля первой категории
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')

        // устанавливаем слушатель обновления категории и отправляем в него обновленные данные (Categories.vue/17)
        this.$emit('updatedCategory', categoryData)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields() // placeholder уходит вверх при значении по умолчанию
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy
    }
  }
}
</script>

<style scoped>

</style>