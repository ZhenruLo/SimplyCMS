$( function() {
    $('.combined-icon').toggleClass('start');
    
    $('#create-content-anchor').on('click', function(event) {
        event.preventDefault();

        openPopUp('#create-content-pop-up');
    });

    $('#create-field-anchor').on('click', function(event) {
        event.preventDefault();

        openPopUp('#create-field-pop-up');
    });

    $('#test_button').on('click', function(event) {
        event.preventDefault();
        let contentUUID = $('.content-list-item.selected-row').find('.content-uuid').val();
        
        $.ajax({
            url: '/content-manager/database-content',
            contentType: 'application/json;charset=UTF-8',
            method: 'PUT',
            data: JSON.stringify({
                'content_uuid': contentUUID
            }),
            success: function(data) {
                console.log(data);
            }
        });
    });
});