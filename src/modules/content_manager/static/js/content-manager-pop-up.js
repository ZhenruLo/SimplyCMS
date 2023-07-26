$( function() {
    function checkDefaultInput(cbID, textID) {
        $(cbID).on('change', function(event) { 
            event.preventDefault();
            
            if ($(this).prop('checked') === true) {
                $(textID).prop('disabled', false);
            }
            else {
                $(textID).prop('value', '');
                $(textID).prop('disabled', true);
            };
        });    
    };

    checkMatchRoute('#create-match-cb', '#content-route-name', '#content-display-name');
    checkMatchRoute('#update-match-cb', '#update-route-name', '#update-display-name');

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
                    
                    $('.custom-text-input').removeClass('checked');
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
                    $('.custom-text-input').removeClass('checked');
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
        checkDefaultInput('#text-default-cb', '#text-display-name');
    });

    $('#boolean-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#boolean-field-pop-up', null, false);
        checkDefaultInput('#boolean-default-cb', '#boolean-display-name');
    });

    $('#date-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#date-field-pop-up', null, false);
        checkDefaultInput('#date-default-cb', '#date-display-name');
    });

    $('#json-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#json-field-pop-up', null, false);
        checkDefaultInput('#json-default-cb', '#json-display-name');
    });

    $('#media-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#media-field-pop-up', null, false);
        checkDefaultInput('#media-default-cb', '#media-display-name');
    });

    $('#number-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#number-field-pop-up', null, false);
        checkDefaultInput('#number-default-cb', '#number-display-name');
    });

    $('#relation-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        openPopUp('#relation-field-pop-up', null, false);
    });
});