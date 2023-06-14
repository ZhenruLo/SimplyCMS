$( function() {
    $('.combined-icon').toggleClass('start');

    $('#create-content-anchor').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('#create-content-pop-up')
    });

    $('#table-name-edit').on('click', function(event) {
        event.preventDefault();

        let selectedRow = $('.content-list-item.selected-row')
        let displayNameInput = $('#update-display-name');
        let routeNameInput = $('#update-route-name');

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
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });
});