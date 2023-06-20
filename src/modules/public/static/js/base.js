function startLoading(selector) {
    $(selector).addClass('loading');
}

function endLoading(selector) {
    $(selector).removeClass('loading');
}

$( function() {
    $('.pop-up-background').on('mousedown', function(event){
        if (event.target !== event.currentTarget) {
            return
        };
        togglePopUp();
    });

    $('.page-loader').toggleClass('hide');
});