<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid"
        >Поле email не должно быть пустым!</small>
        <small
            v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid"
        >Введите корректный email!</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
        >Пароль не должен быть пустым!</small>
        <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
        >Пароль должен быть больше {{ $v.password.$params.minLength.min }} знаков! Сейчас он {{ password.length }}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
        >
        <label for="name">Имя</label>
        <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
        >Имя не должно быть пустым!</small>
        <small
            v-else-if="$v.name.$dirty && !$v.name.minLength"
            class="helper-text invalid"
        >Имя должно быть больше {{ $v.name.$params.minLength.min }} знаков! Сейчас он {{ name.length }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    name: {required, minLength: minLength(2)},
    email: {email, required},
    password: {required, minLength: minLength(6)},
    agree: {checked: value => value}
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      console.log(formData)

      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>