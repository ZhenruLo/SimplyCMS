function startLoading(selector) {
    $(selector).addClass('loading');
}

function endLoading(selector) {
    $(selector).removeClass('loading');
}

$( function() {
    $('.page-loader').fadeOut(200);
});