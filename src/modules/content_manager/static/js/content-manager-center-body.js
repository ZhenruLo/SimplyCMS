$( function() {
    $('.combined-icon').toggleClass('start');
    $('.single-column-container').toggleClass('start');
    
    $('#create-content-anchor').on('click', function(event) {
        event.preventDefault();

        openPopUp('#create-content-pop-up');
    });

    $('#create-field-anchor').on('click', function(event) {
        event.preventDefault();

        openPopUp('#create-field-pop-up');
    });

    $('#test-form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/content-manager/databases',
            method: 'PUT',
            data: $(this).serialize(),
            success: function(data) {
                console.log(data);
            }
        });
    });
});