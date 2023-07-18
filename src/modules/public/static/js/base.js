function startLoading(selector) {
    $(selector).addClass('loading');
}

function endLoading(selector) {
    $(selector).removeClass('loading');
}

function pushCustomState(data, urlPath, unused='') {
    history.pushState(data, unused, urlPath);
}

$( function() {
    $('.page-loader').fadeOut(200);
});