var login = function() {


    var payload = {
        custName: $('#custName').val(),
        password: $('#password').val()
    };


    $.ajax({
        url: '/authenticate',
        type: 'GET',
        contentType: "json",
        data: payload,
        complete: function(data) {
            $('#message').html(data.responseJSON.message);

            $('#message').show();
        }
    })
}

$(document).ready(function() {
    $('#goBtn').click(function(e) {
        console.log('goBtn clicked');

        e.preventDefault();

        login();
    });
});