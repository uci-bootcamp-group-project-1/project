// Javascript - create a global function to dynamically update the data in display model
jQuery.updateYp = function() {
    //  -----------------------------------------
    //  --         declare & ini var           --
    //  -----------------------------------------
    var $yelp = $(".yp-cards"); // wrapper of yelp-cards
    var db = yelp.val().businesses; // stored api returned data
    // console.dir(db);                 // dmesg

    // loop the array
    db.forEach(function(obj, i) {
        // loop the obj
        for (var key in obj) {
            // if key of obj should refresh our data, make it happen
            switch (key) {
                case image_url:
                    $yelp.find("img")[i].attr("src", obj.key);
                case name:
                    $yelp.find("h4")[i].text(obj.key);
                // <span class="."+key></span>
                case price:
                case review_count:
                case phone:
                case categories:
                    $yelp.find("." + key)[i].innerText(obj.key);
                // <div class="rating"></rating>
                case rating:
                    $yelp.find(".rating")[i].rateYo({ rating: obj.key });
                // <div class="location"><span class="address1"></span><span ....</span></div>
                case location:
                    for (var addr in obj.location) {
                        $yelp.find("." + addr)[i].text(obj.location.addr);
                    }
                // <button href=""><button>
                case url:
                    $yelp.find("buttom")[i].attr("href", obj.key);
            }
        }
    });
};
