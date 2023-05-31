$( function() {
    $('.left_panel_menu_row').toggleClass('start');
    $('.left_panel_tab_container').toggleClass('start');
    $('.combined_icon').toggleClass('start');
    
    $('#content_manager_anchor').toggleClass('current_anchor');
    
    $('#content_name_text').css('width', $('#content_name_text').attr('placeholder').length + 'ch');
});