
var addNewGenre = function() {


    var payload = {
        genre_name: $('#genre_name').val()
    };

 
    $.ajax({
        url: '/genre/genre_insert',  
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
    $('#addBtn').click(function(e) {
        console.log('addBtn clicked');

        e.preventDefault();

        addNewGenre();
    });
});