function openMenu(id) {
    $('.left_panel_content_container').removeClass('selected_panel');
    if (id === 'menu_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_menu').toggleClass('selected_panel');
    }

    else if (id === 'content_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_content_type').toggleClass('selected_panel');
    }

    else if (id === 'information_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_info').toggleClass('selected_panel');
    }

    else if (id === 'history_tab' && $('#' + id).hasClass('selected_tab')) {
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
