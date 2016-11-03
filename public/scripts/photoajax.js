console.log('connected');

$('#search').on('click', function(event){
    function removeThe(){
        var the = new RegExp('the ');
        var artistInput =  $("input[name='artist']").val().toLowerCase().trim() || 'no one';
        var locationInput =  $("input[name='location']").val().toLowerCase().trim() || 'nowhere';
        var artistRemoved = artistInput.replace(the, '');
        var locationRemoved = locationInput.replace(the, '');
        console.log(artistRemoved);
        console.log(locationRemoved);
    clearPhotos();
    event.preventDefault();
    var location = locationRemoved ;
    var artist = artistRemoved;
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
            if ( searchResults.length === 0 ){
                $('#photos').append('<p id="noResultMessage"> Sorry, no one here took photos of ' + artistInput + ' at ' + locationInput + '.</p>');
            } else if ( searchResults.length > 0 ){
                for (var j = 0; j < searchResults.length; j++){
                    var photoBox = $('<span/>');
                    $('#photos').append(photoBox);
                    $(photoBox).prop('id','photo-' +j);
                    $('#photo-'+j).append('<img src="' + searchResults[j].image_as_base64 + '">');
                    var photoCaption = $('<a class="caption nohover"></a>');
                    $('#photo-'+j).append(photoCaption);
                    $(photoCaption).prop('id','photocaption-' +j);
                    $('#photocaption-'+j).text(searchResults[j].artist + ' at ' + searchResults[j].location)
                }
            }
        },
        error: function(err){ // if request call is not successful then error message will log
            console.log(err)
        }
    })

    }
    removeThe();

    $('#photos').velocity('fadeIn', { delay: 150, duration: 500 });
    $('#photos').velocity('scroll', { duration: 700});

});

function clearPhotos(){
    $('img').velocity('fadeOut', {duration: 100}).remove();
    $('.caption').velocity('fadeOut', {duration: 100}).remove();
    $('#noResultMessage').velocity('fadeOut', {duration: 100}).remove();
    $('#photos').css('display','none');
}

$('#viewAll').on('click', function(event) {
    clearPhotos();
    $.ajax({
        url: '/photoAPI/',
        type: 'get', // type of request you're making
        dataType: 'json',
        success: function (data) {
            var searchResults = [];
            for (var i = 0; i < data.length; i++) {
                searchResults.push(data[i]);
            }
            console.log(searchResults);
            for (var j = 0; j < searchResults.length || j < 20; j++) {
                var photoBox = $('<span/>');
                $('#photos').append(photoBox);
                $(photoBox).prop('id', 'photo-' + j);
                $('#photo-' + j).append('<img src="' + searchResults[j].image_as_base64 + '">');
                var photoCaption = $('<a class="caption nohover"></a>');
                $('#photo-' + j).append(photoCaption);
                $(photoCaption).prop('id', 'photocaption-' + j);
                $('#photocaption-' + j).text(searchResults[j].artist + ' at ' + searchResults[j].location)
            }
        },
        error: function (err) { // if request call is not successful then error message will log
            console.log(err)
        }
    });
    $('#photos').velocity('fadeIn', { delay: 150, duration: 500 });
    $('#photos').velocity('scroll', { duration: 700});
});

if(sessionStorage.getItem('artist') && sessionStorage.getItem('location')){
    console.log('true');
    clearPhotos();
    var locale = sessionStorage.getItem('location');
    console.log(location);
    var artist = sessionStorage.getItem('artist');
    console.log(artist);
    $.ajax({
        url: '/photoAPI/',
        type: 'get', // type of request you're making
        dataType: 'json',
        success: function(data){ // will put response from url into success function into variable data
            console.log(data);
            var searchResults = [];
            for (var i = 0; i < data.length; i++){
                if(data[i].location === locale){
                    if(data[i].artist === artist)
                        searchResults.push(data[i]);
                }
            }
            if ( searchResults.length === 0 ){
                $('#photos').append('<p id="noResultMessage"> Sorry, no one here took photos of ' + artistInput + ' at ' + locationInput + '.</p>');
            } else if ( searchResults.length > 0 ){
                for (var j = 0; j < searchResults.length; j++){
                    var photoBox = $('<span/>');
                    $('#photos').append(photoBox);
                    $(photoBox).prop('id','photo-' +j);
                    $('#photo-'+j).append('<img src="' + searchResults[j].image_as_base64 + '">');
                    var photoCaption = $('<a class="caption nohover"></a>');
                    $('#photo-'+j).append(photoCaption);
                    $(photoCaption).prop('id','photocaption-' +j);
                    $('#photocaption-'+j).text(searchResults[j].artist + ' at ' + searchResults[j].location)
                }
            }
        },
        error: function(err){ // if request call is not successful then error message will log
            console.log(err)
        }
    });
    $('#photos').velocity('fadeIn', { delay: 150, duration: 500 });
    $('#photos').velocity('scroll', { duration: 700});
    sessionStorage.clear();
}

