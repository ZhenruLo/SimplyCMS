$( function() {
    $('.combined_icon').toggleClass('start');

    $('#content_name_text').css('width', $('#content_name_text').attr('placeholder').length + 'ch');

    $('#table_name_edit').on('click', function(event) {
        $('#content_name_text').css('pointer-events', 'initial');
        $('#content_name_text').focus();
    });
    
    $('#content_name_text').on('blur', function(event) {
        $('#content_name_text').css('pointer-events', 'none');
    });

    $('#content_name_text').on('input', function(event) {
        var input_length = $(this).val().length;
        if (input_length === 0){
            $('#content_name_text').css('width', $('#content_name_text').attr('placeholder').length + 'ch');
        }
        else {
            $(this).css('width', input_length + 'ch');  
        };
    });

    $('#custom_field_container').submit(function(event) {
        event.preventDefault();
        
        $.ajax({
            url: '/content-manager/databases',
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
});