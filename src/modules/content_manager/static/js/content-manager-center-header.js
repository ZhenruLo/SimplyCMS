$( function() {
    $('#table-name-edit').on('click', function(event) {
        event.preventDefault();
    
        let selectedRow = $('.content-list-item.selected-row')
        let displayNameInput = $('#update-display-name');
        let routeNameInput = $('#update-route-name');
        let descriptionInput = $('#update-description');

        togglePopUp();
        openPopUp('.content-manager-pop-up', '#update-display-pop-up', 'Update content settings', $('.content-header-text').text())
        
        $.ajax({
            url: '/content-manager/database-content',
            method: 'GET',
            data: {'content_uuid': selectedRow.find('.content-uuid').val()},
            success: function(data) {
                if (data['result']) {
                    let contentInfo = data['database'];
    
                    displayNameInput.prop({
                        'placeholder': contentInfo['content_name'], 
                        'value': contentInfo['content_name'],
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

        togglePopUp();
        openPopUp('.content-manager-pop-up', '#description-pop-up', 'Description', $('.content-header-text').text());
        
        $('#full-description-text').text($('.header-description-text').text()); 
    });
});