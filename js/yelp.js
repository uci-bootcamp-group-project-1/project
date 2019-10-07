// Javascript - create a global function to dynamically update the data in display model
$.loadYP = function() {
    //  -----------------------------------------
    //  --         declare & ini var           --
    //  -----------------------------------------
    var $yelp = $(".yp-cards"); // wrapper of yelp-cards
    var db = $yelp.val(); // stored api returned data
    // console.dir(db);                 // dmesg

    // loop the array
    $.each(db, function(i, obj) {
        var $card = $yelp.find(".card" + i);
        // loop the obj
        for (var key in obj) {
            // if key of obj should refresh our data, make it happen
            switch (key) {
                case image_url:
                    $card.find("." + key).attr("src", obj.key, "alt", "yelp_image_" + obj.name);
                // <h5 class=key></h5> or
                // <span class=key></span>
                case name:
                case price:
                case review_count:
                case phone:
                case categories:
                    $card.find("." + key).html(obj.key);
                // <div class=key></rating>
                case rating:
                    $(function() {
                        $card.find("." + key).rateYo({ rating: obj.key });
                    });
                // <div class=key><span class=key.subkey></span><span ....</span></div>
                case location:
                    for (var addr in obj.location) {
                        $card.find("." + addr).text(obj.location.addr);
                    }
                // <button class =key href=""><button>
                case url:
                    $card.find("buttom").attr("href", obj.key);
            }
        }
    });
};
