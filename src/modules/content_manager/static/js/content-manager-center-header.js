$( function() {
    $('#table-name-edit').on('click', function(event) {
        event.preventDefault();
    
        const selectedRow = $('.content-list-item.selected-row')
        const displayNameInput = $('#update-display-name');
        const routeNameInput = $('#update-route-name');
        const descriptionInput = $('#update-description');

        openPopUp('#update-display-pop-up', $('.content-header-text').text())
        
        $.ajax({
            url: '/content-manager/databases',
            method: 'GET',
            data: {'content_uuid': selectedRow.find('.content-uuid').val()},
            success: function(data) {
                if (data['result']) {
                    const contentInfo = data['database'];
                    const tempUnescapeContent = $('<span>').html(contentInfo['content_name']).text();
                    
                    displayNameInput.prop({
                        'placeholder': tempUnescapeContent, 
                        'value': tempUnescapeContent,
                    });

                    routeNameInput.prop({
                        'placeholder': contentInfo['route_name'],
                        'value': contentInfo['route_name'],
                    });

                    descriptionInput.prop({
                        'placeholder': contentInfo['description'],
                        'value': contentInfo['description'],
                    });
                };
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });

    $('#description-info').on('click', function(event) {
        event.preventDefault();

        openPopUp('#description-pop-up', $('.content-header-text').text());
        $('#full-description-text').text($('.header-description-text').text()); 
    });
});