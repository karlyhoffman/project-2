console.log('connected');

$('button').on('click', function(event){
    function removeThe(){
        var the = new RegExp('the ');
        var artistInput =  $("input[name='artist']").val().toLowerCase();
        var locationInput =  $("input[name='location']").val().toLowerCase();
        var artistRemoved = artistInput.replace(the, '');
        var locationRemoved = locationInput.replace(the, '');
        console.log(artistRemoved);
        console.log(locationRemoved);
    clearPhotos();
    event.preventDefault();
    var location = locationRemoved || 'nowhere';
    var artist = artistRemoved || 'no one';
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
                }; 
            };
            if ( searchResults.length === 0 ){
                $('#photos').append('<p id="noResultMessage"> Sorry, no one here took photos of ' + artist + ' at ' + location + '.</p>');
            } else if ( searchResults.length > 0 ){
                for (var j = 0; j < searchResults.length; j++){
                    $('#photos').append('<img src="' + searchResults[j].image_as_base64 +'">');
                };
            };
        },
        error: function(err){ // if request call is not successful then error message will log
            console.log(err)
        };
    });
    }
    removeThe();

    $('#photos').velocity('fadeIn', { delay: 150, duration: 500 });
    $('#photos').velocity('scroll', { duration: 700});

});

function clearPhotos(){
    $('img').velocity('fadeOut', {duration: 100}).remove();
    $('#noResultMessage').velocity('fadeOut', {duration: 100}).remove();
    $('#photos').css('display','none');
}