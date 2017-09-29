var FB =  require('fb')
var jwt = require('jsonwebtoken')
require('dotenv').config()

var facebookLogin = (req, response) => {
  FB.api('me', { fields: ['id', 'name', 'email', 'gender'], access_token: req.headers.fbtoken })
  .then(res => {
    console.log('response fb API: ', res)
    var token = jwt.sign({
      id: res.id,
      name: res.name,
      email: res.email,
      gender: res.gender
    }, 'blacksmith')
    console.log('token: ', token);
    response.send(token)
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = {
  facebookLogin
}
