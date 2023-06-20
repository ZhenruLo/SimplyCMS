$( function() {
    $('.combined-icon').toggleClass('start');

    $('#create-content-anchor').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('.content-manager-pop-up', '#create-content-pop-up', 'Content initial settings', 'Settings');
    });
});