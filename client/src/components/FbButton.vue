<template>
  <div class="container">
    <fb-signin-button
      :params="fbSignInParams"
      @success="login"
      @error="onSignInError">
      Sign in with Facebook
    </fb-signin-button>
</div>
</template>

<script>
// import FB from 'vue-facebook-signin-button'
// import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      }
    }
  },
  methods: {
    statusChangeCallback (response) {
      console.log('statusChangeCallback')
      console.log('=x=x=x', response)
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log('RESPONSE', response.authResponse.accessToken)
        localStorage.setItem('fb_access_token', response.authResponse.accessToken)
        this.onSignInSuccess()
      } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.'
      }
    },
    checkLoginState () {
      window.FB.getLoginStatus(function (response) {
        this.statusChangeCallback(response)
      })
    },
    // onSignInSuccess (response) {
    //   window.FB.api('/me', {fields: 'name, email, gender'}, dude => {
    //     console.log('DUDE ', dude)
    //     console.log(`Detail: ${JSON.stringify(dude)}`)
    //     console.log(`Good to see you, ${dude.name}.`)
    //   })
    // },
    ...mapActions([
      'signin'
    ]),
    login (data) {
      console.log('data: ', data)
      localStorage.setItem('fbToken', data.authResponse.accessToken)
      this.signin(data)
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style lang="css">
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
