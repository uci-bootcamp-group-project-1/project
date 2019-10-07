var edamamID = api.edamam.add_id;
var edamamKEY = api.edamam.app_key;

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
        var searchInput = $('#searchInput').val();
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // edamam ajax call
        var edamamURL = cors + 'https://api.edamam.com/search?q=' + searchInput + '&app_id=' + edamamID + '&app_key=' + edamamKEY + '&from=0&to=5&calories=500-1000';
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
                var image = item.recipe.image;
                var url = item.recipe.url;
                // console.log(url);
                var caloriesDecimal = item.recipe.calories;
                var calories = Math.floor(caloriesDecimal).toString();
                var servings = item.recipe.yield;
                var servingsDecimal = Math.floor(servings).toString();
                var calPerPerson = calories / servings;
                var calPerPersonDecimal = Math.floor(calPerPerson).toString();
                // var healthLabels = item.recipe.healthLabels;
                // console.log(healthLabels);
                // var healthLabelsSet = healthLabels.slice(0, 1);
                // console.log(healthLabelsSet);
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

                // var dietLabels = item.recipe.dietLabels[item];
                // console.log(dietLabels);
                // dietLabelsSet = dietLabels.slice(0, 3);
                // // console.log(dietLabelsSet);
                // dietLabelsSet.forEach(dietLabelItem => {
                //     var dietLabel = dietLabelItem;
                //     // console.log(dietLabel);
                //     $('.healthLabel').append(
                //         $('<li>', {
                //             class: 'card-text',
                //             html: dietLabel
                //         })
                //     );
                // });
                // console.log(healthLabelsSet);

                /////////////////////////////////////
                // Create recipe modal cards and append data
                var $edamamCards = $('.recipe-cards');

                $('<div>', {
                    class: 'card mb-5',
                    href: url,
                    target: '_blank'
                })
                    .append(
                        $('<div>', {
                            class: 'row no-gutters'
                        }).append(
                            $('<div>', {
                                class: 'col-4'
                            }).append(
                                $('<img>', {
                                    class: 'card-img',
                                    src: image
                                })
                            ),
                            $('<div>', {
                                class: 'col-4'
                            }).append(
                                $('<div>', {
                                    class: 'card-body'
                                }).append(
                                    $('<h6>', {
                                        class: 'card-title',
                                        html: label
                                    }),
                                    $('<p>', {
                                        class: 'card-text',
                                        html: 'Recipe Calories: ' + calories
                                    }),
                                    $('<a>', {
                                        class: 'btn btn-success btn-xs text-uppercase',
                                        href: url,
                                        html: 'view details',
                                        target: '_blank'
                                    })
                                )
                            ),
                            $('<div>', {
                                class: 'col-4'
                            }).append(
                                $('<div>', {
                                    class: 'card-body'
                                }).append(
                                    $('<h6>', {
                                        class: 'card-title',
                                        html: 'Servings'
                                    }),
                                    $('<p>', {
                                        class: 'card-text',
                                        html: 'Serves ' + servingsDecimal + ' people'
                                    }),
                                    $('<p>', {
                                        class: 'card-text',
                                        html: calPerPersonDecimal + ' calories per serving'
                                    })
                                )
                            )
                        )
                    )
                    .appendTo($edamamCards);
            });

            ///////////////////////////////////////
        });
        // yelp ajax call
        var yelpURL = cors + 'https://api.yelp.com/v3/transactions/delivery/search?term=' + searchInput + '&latitude=' + latitude + '&longitude=' + longitude;
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
            // console.log(response);
            var restaurants = response.businesses;
            var restaurantsSet = restaurants.slice(0, 5);
            restaurantsSet.forEach(item => {
                var restaurantName = item.name; // name of restaurant
                var restaurantPhone = item.display_phone; // phone number
                var restaurantPhoneLink = item.phone;
                var restaurantImage = item.image_url; // image
                var restaurantUrl = item.url; // url of each restaurant
                var restaurantCategories = item.categories;

                var restaurantCategoriesSet = restaurantCategories.slice(0, 2);
                // console.log(restaurantCategoriesSet[0].title);
                // restaurantCategoriesSet.forEach(itemCategory => {
                //     var category = itemCategory.alias; // category of each restaurant
                //     // console.log(category);
                // });
                /////////////////////////////////////
                // Create yelp modal cards and append data
                var $yelpCards = $('#yelp-cards');

                $('<div>', {
                    class: 'card mb-5',
                    target: '_blank'
                })
                    .append(
                        $('<div>', {
                            class: 'row no-gutters'
                        }).append(
                            $('<div>', {
                                class: 'col-4'
                            }).append(
                                $('<img>', {
                                    class: 'card-img',
                                    src: restaurantImage
                                })
                            ),
                            $('<div>', {
                                class: 'col-4'
                            }).append(
                                $('<div>', {
                                    class: 'card-body'
                                }).append(
                                    $('<h6>', {
                                        class: 'card-title',
                                        html: restaurantName
                                    }),
                                    $('<a>', {
                                        class: 'card-text',
                                        html: restaurantPhone,
                                        href: 'tel:' + restaurantPhoneLink
                                    }),
                                    $('<a>', {
                                        class: 'btn btn-success btn-xs text-uppercase mt-4',
                                        href: restaurantUrl,
                                        html: 'visit website',
                                        target: '_blank'
                                    })
                                )
                            ),
                            $('<div>', {
                                class: 'col-4'
                            }).append(
                                $('<div>', {
                                    class: 'card-body'
                                }).append(
                                    $('<h6>', {
                                        class: 'card-title',
                                        html: 'Cuisine'
                                    }),
                                    $('<p>', {
                                        html: restaurantCategoriesSet[0].title
                                    })
                                )
                            )
                        )
                    )
                    .appendTo($yelpCards);
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

    $('#searchButton').on('click', event => {
        event.preventDefault();
        $('.recipe-cards').empty();
        $('#yelp-cards').empty();
        getLocationRunYelp(); // run this function on click when user searches for
    });
});
