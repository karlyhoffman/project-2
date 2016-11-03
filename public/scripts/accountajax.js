console.log('linked');
// $(document).ready(function(){
    var id =  $('#hiddenUserIdPlaceholder').text();
    var parsedId = parseInt(id);
    $.ajax({
        url: '/photoAPI/',
        type: 'get', // type of request you're making
        dataType: 'json',
        success: function(data) { // will put response from url into success function into variable data
            var searchResults = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].user_account_id === parsedId) {
                    searchResults.push(data[i]);
                }
            }
            if (searchResults.length > 0) {
                for (var j = 0; j < searchResults.length; j++) {
                    var photoBox = $('<span/>');
                    $('#photos').append(photoBox);
                    $(photoBox).prop('id','photo-' +j);
                    $('#photo-'+j).append('<img src="' + searchResults[j].image_as_base64 + '">');
                    var photoCaption = $('<h6>');
                    $('#photo-'+j).append(photoCaption);
                    $(photoCaption).prop('id','photocaption-' +j);
                    $('#photocaption-'+j).text(searchResults[j].artist + ' at ' + searchResults[j].location)
                }
            }
            console.log(searchResults)
        },
        error: function(err){ // if request call is not successful then error message will log
            console.log(err)
        }
    });
    $('#photos').velocity('fadeIn', { delay: 150, duration: 500 });
    $('#photos').velocity('scroll', { duration: 700});

// });



