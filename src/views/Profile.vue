<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="name"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{ 'Name' | localize }}</label>
        <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
        >{{ 'Message_EnterName' | localize }}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-light" type="submit">
        {{ 'Button_Refresh' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css'
import {mapGetters, mapActions} from 'vuex'
import {minLength, required} from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: {required, minLength: minLength(3)}
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    //  :class="{active: name.length}" добавить к label вместо setTimeout
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        // await this.$store.dispatch('updateInfo', {name: this.name})
        this.$message('Профиль успешно обновлен')
      } catch (e) {
        // console.log(e)
      }
    }
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>

<style scoped>

.switch {
  margin-bottom: 20px;
}

</style>