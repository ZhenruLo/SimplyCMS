$( function() {
    $('#content_manager_form').submit(function(event) {
        event.preventDefault();
        
        $.ajax({
            url: '/content_manager/databases',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                alert(data.msg);
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });

    $('#test_table_content_form').submit(function(event) {
        event.preventDefault();

        $.ajax({
            url: '/content_manager/databases',
            method: 'PUT',
            data: $(this).serialize(),
            success: function(data) {
                alert(data.msg);
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });
});