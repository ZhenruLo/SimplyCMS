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

    $('.column-body-list').on('click', 'li .column-footer-icon', function(event) {
        event.stopPropagation();
        const columnUUID = $(this).parents('.single-column-container').find('input.column-uuid').val();
        
        result = confirm('Delete this item?');
        if (result === false){
            return false
        };

        $.ajax({
            url: '/content-manager/database-content',
            method: 'DELETE',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'column_uuid': columnUUID,
            }),
            success: function(data) {
                if (data['result']) {
                    const contentUUID = data['content_uuid'];

                    refreshContentItem(1, contentUUID);
                }
                else {
                    alert(data['msg'])
                }
            },
            error: function(data) {
                alert(data.responseText);
            }
        })
    });
});