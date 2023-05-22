$(function() {
    function openMenu(id) {
        $('.left_panel_content_container').removeClass('selected_panel');
        if (id === 'menu_tab' && $('#'+id).hasClass('selected_tab')) {
            $('#left_panel_menu').toggleClass('selected_panel');
        }
        else if (id === 'information_tab' && $('#'+id).hasClass('selected_tab')) {
            $('#left_panel_info').toggleClass('selected_panel');
        }
        else if (id === 'history_tab' && $('#'+id).hasClass('selected_tab')) {
            $('#left_panel_history').toggleClass('selected_panel');
        }
    };

    function openContent(id) {
        $('.center_content_container').removeClass('selected_content');

        if (id === 'row_create_content' && $('#' + id).hasClass('selected_row')) {
            $('#center_create_content').toggleClass('selected_content');
        }

        else if (id === 'row_custom_field' && $('#' + id).hasClass('selected_row')) {
            $('#center_custom_field').toggleClass('selected_content');
        }

        else if (id === 'row_create_page' && $('#' + id).hasClass('selected_row')) {
            $('#center_create_page').toggleClass('selected_content');
        }
    }

    $('.left_panel_tab').on('click', function(event) {
        event.preventDefault();
        var current_tab = $(this);

        $('.left_panel_tab').removeClass('selected_tab')
        current_tab.toggleClass('selected_tab');
        openMenu($(this).attr('id'));
    });

    $('.left_panel_menu_row').on('click', function(event) {
        event.preventDefault();

        $('.left_panel_menu_row').removeClass('selected_row');
        $(this).toggleClass('selected_row');
        openContent($(this).attr('id'));
    });

    $('#table_name_edit').on('click', function() {
        $('#content_name_text').css('pointer-events', 'initial');
        $('#content_name_text').focus();
    });

    $('#content_name_text').on('blur', function() {
        $('#content_name_text').css('pointer-events', 'none');
    });

    $('#content_name_text').on('input', function(){
        var input_length = $(this).val().length;
        if (input_length === 0){
            $('#content_name_text').css('width', $('#content_name_text').attr('placeholder').length + 'ch');
        }
        else {
            $(this).css('width', input_length + 'ch');  
        };
    });
});