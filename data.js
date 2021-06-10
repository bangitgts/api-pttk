var axios = require('axios');

var config = {
    method: 'get',
    url: 'http://localhost:3500/add-course',
    headers: {}
};
var b;
axios(config)
    .then(function(response) {

        console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
        console.log(error);
    });