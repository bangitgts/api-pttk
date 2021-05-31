var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'username': 'test1',
  'password': 'test1' 
});
var config = {
  method: 'get',
  url: 'http://45.77.12.16:3001/',
  headers: { 
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGIzZGQ0ZmE2ODc2YzI3MzY4MDRkMTQiLCJpYXQiOjE2MjI0MDE2Mzd9.B9HvzLEgpu_A06du_4EYixbLL0wYiOivNPkBpcsHxFM', 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
