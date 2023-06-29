$( function() {
    $('.combined-icon').toggleClass('start');

    $('#create-content-anchor').on('click', function(event) {
        event.preventDefault();

        openPopUp('#create-content-pop-up');
    });
});