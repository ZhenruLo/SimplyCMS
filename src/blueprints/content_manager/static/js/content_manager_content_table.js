$( function() {
    var table = $('#content_table').DataTable({
        scrollCollapse: true,
        'autoWidth': false,
        pageLength: 50,
        lengthMenu: [1, 5, 15, 50, 100],
        order: [[0, 'asc']],

        ajax: {
            url: '/content-manager/table'
        },
        
        columns: [
            {
                data: 'content_uuid', 
                visible: false
            },
            { 
                title: 'ID', 
                data: 'id',
                width: '5%'
            },
            { 
                title: 'CONTENT NAME', 
                data: 'table_name',
                width: '60%'
            },
            { 
                title: 'CREATED AT', 
                data: 'created_timestamp',
                width: '32%'
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
    });
});