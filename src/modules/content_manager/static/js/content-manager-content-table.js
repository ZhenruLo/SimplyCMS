$( function() {
    var table = $('#content-table').DataTable({
        scrollY: '63rem',
        scrollCollapse: true,
        autoWidth: true,
        pageLength: 20,
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
                data: 'table_name',
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
                className: 'dtb dt-delete',
                orderable: false,
                data: null,
                defaultContent: "<i class='bx bxs-trash' title='Delete'></i>",
                width: '1%',
            },
            {
                className: 'dtb dt-edit',
                orderable: false,
                data: null,
                defaultContent: "<i class='bx bxs-edit' title='Edit User'></i>",
                width: '1%',
            },
        ],

        drawCallback: function(settings) {
            $('.dataTables_filter label input').prop('placeholder', 'Type here to search for content');
        },
    });
});