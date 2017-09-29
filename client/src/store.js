import vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from './router/index'

vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    signin (store, payload) {
      console.log('Backend Side=x===>', payload)
      axios.get('http://localhost:3000/fb/login', {
        headers: {
          fbtoken: localStorage.getItem('fbToken')
        }
      })
      .then((response) => {
        console.log('cxcxc=>', response)
        localStorage.setItem('backend-token', response.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  }
})
