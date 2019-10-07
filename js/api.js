<<<<<<< HEAD
// instead runing script after the page is load, make it a global function and run when its event is triggered
$.search = function() {
    var edamamID = api.edamam.add_id;
    var edamamKEY = api.edamam.app_key;
    // bind value to searchContent - cxu
    var edamanQuery = $("#searchContent").val();
=======
var edamamID = api.edamam.add_id;
var edamamKEY = api.edamam.app_key;
>>>>>>> master

    var cors = "https://pm-cors.herokuapp.com/"; // cors anywhere server to prevent 'Allow-Control-Allow-Origin' issue

    var yelpAuthorization = api.yelp.headers.Authorization;

    var $locationError = $("#error"); //append this to html page in case of geoLocation error.set time so location disappears after 3 seconds

    // get location and run yelp function
    function searchFood() {
        console.log("dmsg: search started");
        // rename function to searchFood for read - cxu
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(runSearch, showError);
        } else {
<<<<<<< HEAD
            $locationError.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    // fetch current location, pass it to yelp API call, run API call.
    function runSearch(position) {
        //rename function to runSearch for read - cxu
=======
            $locationError.innerHTML = 'Geolocation is not supported by this browser.';
        }
    }
    // fetch current location, pass it to yelp API call, run API call.
    function runYelp(position) {
        var searchInput = $('#searchInput').val();
        console.log(searchInput);
>>>>>>> master
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // console.log(latitude, longitude);
        // edamam ajax call
<<<<<<< HEAD
        var edamamURL =
            cors +
            "https://api.edamam.com/search?q=" +
            edamanQuery +
            "&app_id=" +
            edamamID +
            "&app_key=" +
            edamamKEY +
            "&from=0&to=5&calories=500-1000";
=======
        var edamamURL = cors + 'https://api.edamam.com/search?q=' + searchInput + '&app_id=' + edamamID + '&app_key=' + edamamKEY + '&from=0&to=5&calories=500-1000';
>>>>>>> master
        $.ajax({
            url: edamamURL,
            headers: {
                "Content-Type": "application/json"
            },
<<<<<<< HEAD
            method: "GET"
        }).then(function(res) {
            saveReceipt(res);
=======
            method: 'GET'
        }).then(function(response) {
            console.log(response);
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
                var caloriesDecimal = item.recipe.calories;
                var calories = Math.floor(caloriesDecimal).toString();
                console.log(calories);
                // var healthLabels = item.recipe.healthLabels;
                // var healthLabelsSet = healthLabels.slice(0, 2);
                // healthLabelsSet.forEach(labelItem => {
                //     var healthLabel = labelItem;
                //     // console.log(healthLabel);
                //     $('.healthLabel').append(
                //         $('<li>', {
                //             class: 'card-text',
                //             html: healthLabel
                //         })
                //     );
                // });

                var dietLabels = item.recipe.dietLabels;
                dietLabelsSet = dietLabels.slice(0, 3);
                dietLabelsSet.forEach(dietLabelItem => {
                    var dietLabel = dietLabelItem;
                    // console.log(dietLabel);
                    $('.healthLabel').append(
                        $('<li>', {
                            class: 'card-text',
                            html: dietLabel
                        })
                    );
                });
                // console.log(healthLabelsSet);

                /////////////////////////////////////
                // Create recipe modal cards and append data
                var $edamamCards = $('.recipe-cards');

                $('<a>', {
                    class: 'card mb-3',
                    href: url,
                    target: '_blank'
                })
                    .append(
                        $('<div>', {
                            class: 'row no-gutters'
                        }).append(
                            $('<div>', {
                                class: 'col-md-4'
                            }).append(
                                $('<img>', {
                                    class: 'card-img',
                                    src: image
                                })
                            ),
                            $('<div>', {
                                class: 'col-md-4'
                            }).append(
                                $('<div>', {
                                    class: 'card-body'
                                }).append(
                                    $('<h5>', {
                                        class: 'card-title',
                                        html: label
                                    }),
                                    $('<p>', {
                                        class: 'card-text',
                                        html: 'Recipe Calories: ' + calories
                                    }),
                                    $('<a>', {
                                        class: 'card-text',
                                        href: url,
                                        html: 'Visit Recipe Webpage',
                                        target: '_blank'
                                    })
                                )
                            ),
                            $('<div>', {
                                class: 'col-md-4'
                            }).append(
                                $('<div>', {
                                    class: 'card-body'
                                }).append(
                                    $('<h5>', {
                                        class: 'card-title',
                                        html: 'Health Benefits'
                                    }),
                                    $('<ul>', {
                                        class: 'healthLabel'
                                    })
                                )
                            )
                        )
                    )
                    .appendTo($edamamCards);
            });

            ///////////////////////////////////////
>>>>>>> master
        });

        // yelp ajax call
<<<<<<< HEAD
        var yelpURL = cors + "https://api.yelp.com/v3/transactions/delivery/search?term=hotdog&latitude=" + latitude + "&longitude=" + longitude;
=======
        var yelpURL = cors + 'https://api.yelp.com/v3/transactions/delivery/search?term=' + searchInput + '&latitude=' + latitude + '&longitude=' + longitude;
>>>>>>> master
        $.ajax({
            url: yelpURL,
            headers: {
                Authorization: yelpAuthorization
            },
            method: "GET",
            dataType: "json",
            success: function(data) {
                console.log("success: " + data);
            }
<<<<<<< HEAD
        }).then(function(res) {
            saveYelp(res);
        }); // CLOUD XU - Write Yelp Logic here
        // data has been stored, processing data analysis in seperate file - cxu
=======
        }).then(function(response) {
            console.log(response);
            var restaurants = response.businesses;
            var restaurantsSet = restaurants.slice(0, 5);
            // console.log(restaurantsSet[0]);
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
>>>>>>> master
    }

    //handle errors in case geo location doesn't work.
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
<<<<<<< HEAD
                $locationError.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                $locationError.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                $locationError.innerHTML = "The request to get user location timed out.";
=======
                $locationError.innerHTML = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                $locationError.innerHTML = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                $locationError.innerHTML = 'The request to get user location timed out.';
>>>>>>> master
                break;
            case error.UNKNOWN_ERROR:
                $locationError.innerHTML = "An unknown error occurred.";
                break;
        }
    }

<<<<<<< HEAD
    ///////////////////////////////////////////////////////
    // jquery pull wrapper for receipt yelp data section //
    // create new data-attribute and save response       //
    // cxu                                               //
    ///////////////////////////////////////////////////////
    function saveReceipt(obj) {
        console.log("dmsg: receipt saved as data");
        console.log(obj);
        $(".rp-cards").val(obj);
    }

    function saveYelp(obj) {
        console.log("dmsg: yelp saved as data");
        console.log(obj);
        // storing only the first 5 results
        $(".yp-cards").val(obj.businesses.slice(0, 5));
    }
    // Run script at trigger
    searchFood();
};
=======
    $('#searchButton').on('click', () => {
        getLocationRunYelp(); // run this function on click when user searches for
    });
});
>>>>>>> master
