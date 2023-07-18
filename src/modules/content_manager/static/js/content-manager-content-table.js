$( function() {
    var table = $('#content-table').DataTable({
        scrollY: '63rem',
        scrollCollapse: true,
        autoWidth: false,
        pageLength: 20,
        fixedHeader: true,
        order: [[1, 'asc']],

        ajax: {
            url: '/content-manager/table'
        },

        columns: [
            {
                data: 'content_uuid', 
                visible: false
            },
            { 
                title: 'Id', 
                width: '3%',
                data: null,
                render: (data, type, row, meta) => meta.row + 1,
            },
            { 
                title: 'Content Name', 
                data: 'content_name',
                width: '15%'
            },
            {
                title: 'Route Name', 
                data: 'route_name',
                width: '15%'
            },
            {
                title: 'Description', 
                data: 'description',
                width: '50%'
            },
            { 
                title: 'Created At', 
                data: 'created_timestamp',
                width: '15%'
            },
            {
                className: 'dtb dt-edit',
                orderable: false,
                data: null,
                defaultContent: "<i class='bx bxs-edit' title='Edit Content'></i>",
                width: '1%',
            },
            {
                className: 'dtb dt-delete',
                orderable: false,
                data: null,
                defaultContent: "<i class='bx bxs-trash' title='Delete'></i>",
                width: '1%',
            },
        ],

        drawCallback: function(settings) {
            $('.dataTables_filter label input').prop('placeholder', 'Type here to search for content');
        },
    });

    $('#content-table tbody').on('click', 'td.dt-delete', function () {
        result = confirm('Delete this item?');
        if (result === false){
            return false
        };
        const tr = $(this).closest('tr');
        const row = table.row(tr);
        const selectedContentUUID = row.data().content_uuid;

        $.ajax({
            url: '/content-manager/databases',
            contentType: 'application/json;charset=UTF-8',
            method: 'DELETE',
            data: JSON.stringify({
                'content_uuid': selectedContentUUID
            }),
            success: function(data) {
                $('#content-table').DataTable().ajax.reload(null, false);
                refreshContentItem(1, null);
            },
            error: function(data){
                alert(data.responseText);
            }
        })
    });

    $('#content-table tbody').on('click', 'td.dt-edit', function () {
        const tr = $(this).closest('tr');
        const row = table.row(tr);
        const selectedContentUUID = row.data().content_uuid;
        const selectedContentPage = Math.floor(tr.find('.sorting_1').text()/20) + 1;
        const extra = {
            'uid': selectedContentUUID,
            'page': selectedContentPage,
        }
        const newUrl = new URL(window.location.origin + '/content-manager/content-type');

        pushCustomState(extra, newUrl);
        changeCurrentState('/content-manager/state', '/content-manager/content-type', extra);
    });
});