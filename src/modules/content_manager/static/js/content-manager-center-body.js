$( function() {
    $('.combined-icon').toggleClass('start');

    $('#create-content-anchor').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('#create-content-pop-up')
    });
});