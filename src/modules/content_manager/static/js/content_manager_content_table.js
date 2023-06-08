$( function() {
    var table = $('#content_table').DataTable({
        scrollY: '400px',
        scrollCollapse: true,
        // autoWidth: false,
        pageLength: 30,
        lengthMenu: [1, 5, 15, 30, 50, 100],
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
                title: 'ID', 
                data: 'id',
                width: '5%'
            },
            { 
                title: 'CONTENT NAME', 
                data: 'table_name',
                width: '40%'
            },
            {
                title: 'ROUTE NAME', 
                data: 'route_name',
                width: '33%'
            },
            { 
                title: 'CREATED AT', 
                data: 'created_timestamp',
                width: '20%'
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