function openPopUp(containerId) {
    $('.content-manager-pop-up').removeClass('show');
    $(containerId).addClass('show');
}

$( function() {
    $('#content-creator-form').submit(function(event) {
        event.preventDefault();

        $('.pop-up-background').click();

        $.ajax({
            url: '/content-manager/databases',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                if (data['result']) {
                    let tableUuid = data['table_uuid'];

                    $("#content-table").DataTable().ajax.reload(null, false);
                    refreshContentItem(leftPanelCurrentPage, tableUuid);
                };
            },
            error: function(data) {
                alert(data.responseText);
            }
        })
    })

    $('#update-display-form').submit(function(event) {
        event.preventDefault();

        $('.pop-up-background').click();

        $.ajax({
            url: '/content-manager/database-content',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                if (data['result']) {
                    tableUuid = data['table_uuid'];

                    $("#content-table").DataTable().ajax.reload(null, false);
                    refreshContentItem(leftPanelCurrentPage, tableUuid);
                };
            },
            error: function(data) {
                alert(data.responseText);
            }
        })
    })
});