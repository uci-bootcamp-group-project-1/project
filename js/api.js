var edamamID = api.edamam.add_id;
var edamamKEY = api.edamam.app_key;
var edamanQuery = 'chicken'; // value we will get from SEARCH INPUT

var cors = 'https://pm-cors.herokuapp.com/'; // cors anywhere server to prevent 'Allow-Control-Allow-Origin' issue

var yelpAuthorization = api.yelp.headers.Authorization;

$(document).ready(function() {
    var $locationError = $('#error'); //append this to html page in case of geoLocation error.set time so location disappears after 3 seconds

    // get location and run yelp function
    function getLocationRunYelp() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(runYelp, showError);
        } else {
            $locationError.innerHTML = 'Geolocation is not supported by this browser.';
        }
    }
    // fetch current location, pass it to yelp API call, run API call.
    function runYelp(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // console.log(latitude, longitude);
        // edamam ajax call
        var edamamURL = cors + 'https://api.edamam.com/search?q=' + edamanQuery + '&app_id=' + edamamID + '&app_key=' + edamamKEY + '&from=0&to=5&calories=500-1000';
        $.ajax({
            url: edamamURL,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(function(response) {
            ///////////////////////////////////////
            /// Write edamam Logic here

            var responseItems = response.hits; // ARRAY
            var responseItemsSet = responseItems.slice(0, 5);
            ////////////////////////////////////////
            // loop through edamam recipes and extract data

            responseItemsSet.forEach(item => {
                var label = item.recipe.label;
                // console.log(label);
                var image = item.recipe.image;
                // console.log(image);
                var url = item.recipe.url;
                // console.log(url);
                var healthLabels = item.recipe.healthLabels;

                var healthLabelsSet = healthLabels.slice(0, 3);
                healthLabelsSet.forEach(labelItem => {
                    var healthLabel = labelItem;
                    // console.log(healthLabel);
                });

                var dietLabels = item.recipe.dietLabels;
                dietLabelsSet = dietLabels.slice(0, 3);
                dietLabelsSet.forEach(dietLabelItem => {
                    var dietLabel = dietLabelItem;
                    // console.log(dietLabel);
                });
                // console.log(healthLabelsSet);

                /////////////////////////////////////
                // Create recipe modal cards and append data
            });

            ///////////////////////////////////////
        });
        // yelp ajax call
        var yelpURL = cors + 'https://api.yelp.com/v3/transactions/delivery/search?term=hotdog&latitude=' + latitude + '&longitude=' + longitude;
        $.ajax({
            url: yelpURL,
            headers: {
                Authorization: yelpAuthorization
            },
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log('success: ' + data);
            }
        }).then(function(response) {
            var restaurants = response.businesses;
            var restaurantsSet = restaurants.slice(0, 5);
            console.log(restaurantsSet[0]);
            restaurantsSet.forEach(item => {
                var restaurantName = item.name; // name of restaurant
                var phoneNum = item.display_phone; // phone number
                var imageUrl = item.image_url; // image
                var url = item.url; // url of each restaurant
                var categories = item.categories;
                var categoriesSet = categories.slice(0, 2);
                categoriesSet.forEach(itemCategory => {
                    var category = itemCategory.alias; // category of each restaurant
                    // console.log(category);
                });
                /////////////////////////////////////
                // Create yelp modal cards and append data
            });
        });
    }

    //handle errors in case geo location doesn't work.
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $locationError.innerHTML = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                $locationError.innerHTML = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                $locationError.innerHTML = 'The request to get user location timed out.';
                break;
            case error.UNKNOWN_ERROR:
                $locationError.innerHTML = 'An unknown error occurred.';
                break;
        }
    }

    getLocationRunYelp(); // run this function on click when user searches for
});
