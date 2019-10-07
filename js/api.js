// instead runing script after the page is load, make it a global function and run when its event is triggered
$.search = function() {
    var edamamID = api.edamam.add_id;
    var edamamKEY = api.edamam.app_key;
    // bind value to searchContent - cxu
    var edamanQuery = $("#searchContent").val();

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
            $locationError.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    // fetch current location, pass it to yelp API call, run API call.
    function runSearch(position) {
        //rename function to runSearch for read - cxu
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // console.log(latitude, longitude);
        // edamam ajax call
        var edamamURL =
            cors +
            "https://api.edamam.com/search?q=" +
            edamanQuery +
            "&app_id=" +
            edamamID +
            "&app_key=" +
            edamamKEY +
            "&from=0&to=5&calories=500-1000";
        $.ajax({
            url: edamamURL,
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }).then(function(res) {
            saveReceipt(res);
        });

        // yelp ajax call
        var yelpURL = cors + "https://api.yelp.com/v3/transactions/delivery/search?term=hotdog&latitude=" + latitude + "&longitude=" + longitude;
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
        }).then(function(res) {
            saveYelp(res);
        }); // CLOUD XU - Write Yelp Logic here
        // data has been stored, processing data analysis in seperate file - cxu
    }

    //handle errors in case geo location doesn't work.
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $locationError.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                $locationError.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                $locationError.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                $locationError.innerHTML = "An unknown error occurred.";
                break;
        }
    }

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
