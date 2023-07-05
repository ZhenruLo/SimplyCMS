$( function() {
    $('#content-creator-form').submit(function(event) {
        event.preventDefault();

        $('.pop-up-background').mousedown();

        $.ajax({
            url: '/content-manager/databases',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                if (data['result']) {
                    let contentUUID = data['content_uuid'];

                    $('#content-table').DataTable().ajax.reload(null, false);

                    refreshContentItem(1, contentUUID);

                    $('#content-creator-form').trigger('reset');
                };
            },
            error: function(data) {
                alert(data.responseText);
            }   
        })
    })

    $('#update-display-form').submit(function(event) {
        event.preventDefault();

        $('.pop-up-background').mousedown();

        $.ajax({
            url: '/content-manager/database-content',
            method: 'PUT',
            data: $(this).serialize(),
            success: function(data) {
                if (data['result']) {
                    contentUUID = data['content_uuid'];
                    
                    $('#content-table').DataTable().ajax.reload(null, false);

                    refreshContentItem(1, contentUUID);
                    $('#update-dsiplay-form').trigger('reset');
                };
            },
            error: function(data) {
                alert(data.responseText);
            }
        })
    })
});