// layout for modal
var $modal = $('.api-data');
$('<div>', {
    class: 'row'
})
    .append(
        $('<div>', {
            class: 'col-md-6 col-sm-12 mx-auto',
            css: {
                'margin-bottom': '10px'
            }
        }).append(
            $('<div>', {
                class: 'center-wrap',
                css: {
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
            css: {
                'margin-bottom': '10px'
            }
        }).append(
            $('<div>', {
                class: 'center-wrap',
                css: {
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
                })
            )
        )
    )
    .appendTo($modal);
