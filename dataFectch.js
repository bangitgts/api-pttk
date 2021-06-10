var settings = {
    "url": "http://localhost:3500/add-course",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {
    console.log(response);
});