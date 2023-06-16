$( function() {
    $('#table-name-edit').on('click', function(event) {
        event.preventDefault();
    
        let selectedRow = $('.content-list-item.selected-row')
        let displayNameInput = $('#update-display-name');
        let routeNameInput = $('#update-route-name');

        startLoading('#table-name-edit');

        $.ajax({
            url: '/content-manager/database-content',
            method: 'GET',
            data: {'content_uuid': selectedRow.find('.content-uuid').val()},
            success: function(data) {
                if (data['result']) {
                    let contentInfo = data['database'];
    
                    displayNameInput.prop('placeholder', contentInfo['table_name']);
                    routeNameInput.prop('placeholder', contentInfo['route_name']);
                };
                
                endLoading('#table-name-edit');
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });

    $('#description-info').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('#description-pop-up', 'Description');
        
        $('#full-description-text').text($('.header-description-text').text()); 
    });
});