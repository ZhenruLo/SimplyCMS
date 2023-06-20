function startLoading(selector) {
    $(selector).addClass('loading');
}

function endLoading(selector) {
    $(selector).removeClass('loading');
}

$( function() {
    $('.pop-up-background').on('click', function(e){
        if (e.target !== e.currentTarget) {
            return
        };
        togglePopUp();
    });

    $('.page-loader').toggleClass('hide');
});