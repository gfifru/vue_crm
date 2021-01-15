import firebase from 'firebase'

/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      }
      catch (e) {
        throw e
      }
    }
  }
}
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */