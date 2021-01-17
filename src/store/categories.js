import firebase from 'firebase'

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid') // получаем id пользователя из метода getUid
        // возвращаем категории или пустой объект
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        // транформируем полученные данные
        // первый варинат более длинный
        /*
        const cats = []
        Object.keys(categories).forEach(key => {
          cats.push({
            title: categories[key].title,
            limit: categories[key].limit,
            id: key
          })
        })
        return cats
        */
        return Object.keys(categories).map(key => ({...categories[key], id: key}))

      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid') // получаем id пользователя из метода getUid
        const category = await firebase
            .database()
            .ref(`/users/${uid}/categories`)// создаем категорию в базе у данного пользователя
            .push({title, limit})// добавляем поля title / limit
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid') // получаем id пользователя из метода getUid
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
        // child находит категория по id
        // update обновляет категорию
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {...category, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  }
}