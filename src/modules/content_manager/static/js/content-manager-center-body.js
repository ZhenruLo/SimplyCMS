$( function() {
    $('.combined-icon').toggleClass('start');

    $('#create-content-anchor').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('#create-content-pop-up')
    });

    $('#table-name-edit').on('click', function(event) {
        event.preventDefault();

        var displayNameInput = $('#update-display-name');
        var routeNameInput = $('#update-route-name');

        $.ajax({

        });
    });
});