$( function() {
    $('.left_panel_menu_row').toggleClass('start');
    $('#content_manager_anchor').toggleClass('current_anchor');

    $('#content_name_text').css('width', $('#content_name_text').attr('placeholder').length + 'ch');
});