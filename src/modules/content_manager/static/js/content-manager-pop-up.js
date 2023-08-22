$( function() {
    const nameSpace = '/database-content';
    const socket = io.connect(window.location.origin + nameSpace);

    socket.on('connect', function() {
        socket.emit('connection', {connection_confirmation: 'you are connected to the content-manager socket!'});
    });

    socket.on('response', function(message) {
        const contentUUID = message.data['content_uuid'];
        refreshContentItem(1, contentUUID);
        $(formID).trigger('reset');
        $(formID + ' .match-cb-input').trigger('change');
        $(formID + ' .switch').removeClass('switch-checked');
    });

    checkMatchRoute('#create-match-cb', '#content-route-name', '#content-display-name');
    checkMatchRoute('#update-match-cb', '#update-route-name', '#update-display-name');
    submitContentField('#text-field-form');
    submitContentField('#boolean-field-form');
    submitContentField('#date-field-form');
    submitContentField('#json-field-form');
    submitContentField('#media-field-form');
    submitContentField('#number-field-form');
    submitContentField('#ID-field-form');
    submitContentField('#relation-field-form');


    function submitContentField(formID) {
        $(formID).submit(function(event) {
            event.preventDefault();
            togglePopUp();
            
            $.ajax({
                url: '/content-manager/database-content',
                method: 'POST',
                data: $(this).serialize(),
                success: function(data) {
                    if (data['result']) {
                        // console.log(data['msg']);
                        const contentUUID = data['content_uuid'];

                        refreshContentItem(1, contentUUID);
                        $(formID).trigger('reset');
                        $(formID + ' .match-cb-input').trigger('change');
                        $(formID + ' .switch').removeClass('switch-checked');
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
    };

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
            },
        });
    });

    $('#text-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#text-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#text-field-pop-up', null, false);
        checkDefaultInput('#text-default-cb', '#text-display-name');
    });

    $('#boolean-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#boolean-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#boolean-field-pop-up', null, false);
    });

    $('#date-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#date-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#date-field-pop-up', null, false);
        checkDefaultInput('#date-default-cb', '#date-display-name');
    });

    $('#json-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#json-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#json-field-pop-up', null, false);
        checkDefaultInput('#json-default-cb', '#json-display-name');
    });

    $('#media-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#media-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#media-field-pop-up', null, false);
        checkDefaultInput('#media-default-cb', '#media-display-name');
    });

    $('#number-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#number-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#number-field-pop-up', null, false);
        checkDefaultInput('#number-default-cb', '#number-display-name');
    });

    $('#ID-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#ID-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#ID-field-pop-up', null, false);
        checkDefaultInput('#ID-default-cb', '#ID-display-name');
    });

    $('#relation-field-container .field-type-button').on('click', function(event) {
        event.preventDefault();

        $('#relation-field-content-uuid').val($('.content-list-item.selected-row').find('.content-uuid').val());

        openPopUp('#relation-field-pop-up', null, false);
    });

    $('.field-display-name').keyup(function() {
        let legendText = $(this).parent().find('span.under-input-text');

        if ($(this).val() == '') {
            legendText.text('');
            legendText.css('color', 'gray');

            $(this).css('border', '1px solid rgb(190, 190, 190)');
            $(this)[0].setCustomValidity('');
        }
        else if (isNumber($(this).val()[0]) || isNumber($(this).val())) {
            legendText.text('Column display name cannot be formed by just digits/start with a digit.');
            legendText.css('color', 'red');

            $(this).css('border', '1px solid red');
            $(this)[0].setCustomValidity('Column display name cannot be formed by just digits/start with a digit.');
        }
        else {
            legendText.text('');
            
            $(this).css('border', '1px solid green');
            $(this)[0].setCustomValidity('');
        }
    });
});