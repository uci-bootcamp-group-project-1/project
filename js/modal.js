// layout for modal
var $modal = $('.api-data');
$('<div>', {
    class: 'row'
})
    .append(
        $('<div>', {
            class: 'col-lg-6 col-md-12 mx-auto',
            css: {
                'margin-bottom': '10px'
            }
        }).append(
            $('<div>', {
                class: 'center-wrap',
                css: {
                    margin: '0 auto',
                    border: '1px solid lightgrey'
                }
            }).append(
                $('<h4>', {
                    class: 'data-title',
                    html: 'Recipes'
                }),
                $('<div>', {
                    class: 'rp-cards'
                })
            )
        ),
        $('<div>', {
            class: 'col-lg-6 col-md-12 mx-auto',
            css: {
                'margin-bottom': '10px'
            }
        }).append(
            $('<div>', {
                class: 'center-wrap',
                css: {
                    margin: '0 auto',
                    border: '1px solid lightgrey'
                }
            }).append(
                $('<h4>', {
                    class: 'data-title',
                    html: 'Find Your Food Nearby'
                }),
                $('<ul>', {
                    class: 'yp-cards'
                })
            )
        )
    )
    .appendTo($modal);

var yelpdb = {
    'rp-cards': {
        rc1: {}
    }
};
