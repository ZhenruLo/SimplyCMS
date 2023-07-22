$( function() {
    $('#content-creator-form').submit(function(event) {
        event.preventDefault();
        togglePopUp();

        $.ajax({
            url: '/content-manager/databases',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                if (data['result']) {
                    const contentUUID = data['content_uuid'];
                    const extra = new Map([
                        ['page', null],
                        ['uid', contentUUID],
                    ]);
                    const newUrl = new URL(window.location.href);

                    $('#content-table').DataTable().ajax.reload(null, false);
            
                    pushCustomState(newUrl, extra);
                    changeCurrentState('/content-manager/state', '/content-manager/content-type', extra);

                    $('#content-creator-form').trigger('reset');
                }
                else {
                    alert(data['msg']);
                }
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    });

    $('#update-display-form').submit(function(event) {
        event.preventDefault();
        togglePopUp();

        $.ajax({
            url: '/content-manager/databases',
            method: 'PUT',
            data: $(this).serialize(),
            success: function(data) {
                if (data['result']) {
                    contentUUID = data['content_uuid'];
                    
                    refreshContentItem(1, contentUUID);
                    $('#update-dsiplay-form').trigger('reset');
                };
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    });

    $('#text-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#text-field-pop-up', null, false);
    });

    $('#boolean-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#boolean-field-pop-up', null, false);
    });

    $('#date-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#date-field-pop-up', null, false);
    });

    $('#json-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#json-field-pop-up', null, false);
    });

    $('#media-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#media-field-pop-up', null, false);
    });

    $('#number-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#number-field-pop-up', null, false);
    });

    $('#relation-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#relation-field-pop-up', null, false);
    });
});