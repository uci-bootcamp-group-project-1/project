// layout for modal
var $modal = $(".api-data");
$("<div>", {
    class: "row"
})
    .append(
<<<<<<< HEAD
        $("<div>", {
            class: "col-lg-6 col-md-12 mx-auto",
=======
        $('<div>', {
            class: 'col-md-6 col-sm-12 mx-auto',
>>>>>>> master
            css: {
                "margin-bottom": "10px"
            }
        }).append(
            $("<div>", {
                class: "center-wrap",
                css: {
<<<<<<< HEAD
                    margin: "0 auto",
                    border: "1px solid lightgrey"
                }
            }).append(
                $("<h4>", {
                    class: "data-title",
                    html: "Recipes"
                }),
                $("<div>", {
                    class: "rp-cards"
                })
            )
        ),
        $("<div>", {
            class: "col-lg-6 col-md-12 mx-auto",
=======
                    margin: '0 auto'
                }
            }).append(
                $('<h4>', {
                    class: 'data-title mb-5',
                    html: 'Recipes'
                }),
                $('<div>', {
                    class: 'recipe-cards'
                })
            )
        ),
        $('<div>', {
            class: 'col-md-6 col-sm-12 mx-auto',
>>>>>>> master
            css: {
                "margin-bottom": "10px"
            }
        }).append(
            $("<div>", {
                class: "center-wrap",
                css: {
<<<<<<< HEAD
                    margin: "0 auto",
                    border: "1px solid lightgrey"
                }
            }).append(
                $("<h4>", {
                    class: "data-title",
                    html: "Find Your Food Nearby"
                }),
                $("<ul>", {
                    class: "yp-cards"
=======
                    margin: '0 auto'
                }
            }).append(
                $('<h4>', {
                    class: 'data-title mb-5',
                    html: 'Find Your Food Nearby'
                }),
                $('<div>', {
                    class: 'yelp-cards',
                    html: 'yelp cards'
>>>>>>> master
                })
            )
        )
    )
    .appendTo($modal);
<<<<<<< HEAD

var $reci = $(".rp-cards");
var $yelp = $(".yp-cards");

for (var i = 0; i < 5; i++) {
    $("<div>", {
        class: "card mb-3 card" + i,
        css: { "max-width": "540px" }
    })
        .append(
            $("<div>", {
                class: "row no-gutters"
            }).append(
                $("<div>", {
                    class: "col-md-4"
                }).append(
                    $("<img>", {
                        class: "card-img image_url"
                    })
                ),
                $("<div>", {
                    class: "col-md-8"
                }).append(
                    $("<div>", {
                        class: "card-body"
                    }).append(
                        $("<h5>", {
                            class: "card-title name"
                        }),
                        $("<div>", {
                            class: "rating",
                            css: { display: "inline-block" }
                        }),
                        $("<p>", {
                            class: "review_count"
                        }),
                        $("<hr>"),
                        $(
                            "<div>",
                            {
                                class: "location"
                            },
                            $("<p>", {
                                class: "cateogories"
                            })
                        )
                    )
                )
            )
        )
        .appendTo($yelp);
}
=======
>>>>>>> master
