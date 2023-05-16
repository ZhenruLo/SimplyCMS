$(function() {
    $('#database_anchor').removeClass('current_anchor');

    $('#collapse_menu_btn').on('click', function(){
        $('#side').toggleClass('expand');
        $('#content').toggleClass('collapse');
    });

    $('.dropdown_button').on('click', function(){
        $('.dropdown_content').toggleClass('show');
    });

    $.ajax({
        url: '/username',
        method: 'GET',
        contentType:'application/json',
        success: function(data){
            $('#logout_anchor .side_anchor_text').text('Hi, '+data['username']);
            if (data['role']){
                $('#admin_page_anchor').toggleClass('disabled');
            }
        },
        error: function(data){
            alert(data.responseText);
        }
    })
});