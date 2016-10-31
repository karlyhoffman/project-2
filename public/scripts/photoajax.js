console.log('connected');

$('button').on('click', function(e){
    e.preventDefault();
    var location = $('input[name=location]').val();
    var artist = $('input[name=artist]').val();
    $.ajax({
        url: '/photoAPI/',
        type: 'get', // type of request you're making
        dataType: 'json',
        success: function(data){ // will put response from url into success function into variable data
            var searchResults = [];
            for (var i = 0; i < data.length; i++){
                if(data[i].location === location){
                    if(data[i].artist === artist)
                        searchResults.push(data[i]);
                }
            }
            for (var j = 0; j < searchResults.length; j++){
                $('#photos').append('<img src="' + searchResults[j].image_as_base64 +'">');
                console.log(searchResults[j].image_as_base64);
            }
            console.log(searchResults)
        },
        error: function(err){ // if request call is not successful then error message will log
            console.log(err)
        }
    });
});
