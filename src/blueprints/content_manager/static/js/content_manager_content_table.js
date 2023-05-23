$( function() {
    var table = $('#content_table').DataTable({
        scrollCollapse: true,
        pageLength: 50,
        lengthMenu: [1, 5, 15, 50, 100],
        order: [[0, 'asc']],

        ajax: {
            url: '/content_manager/table'
        }
    });
});