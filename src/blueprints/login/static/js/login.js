$(function() {
    $('#login_form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            url: '/login/verify',
            contentType: 'application/x-www-form-urlencoded',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                if (data.result) {
                    window.location.replace(data.msg);
                }
                else{
                    $('#login_form').trigger('reset');
                    $('.modal_container').toggleClass('show_modal');
                    $('.modal_text').text(data.msg);
                };
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    });

    $('.mark_div').on('click', function() {
        $('.modal_container').removeClass('show_modal');
    });

    $('.login_content_container').toggleClass('start');
    $('.welcome_container').toggleClass('start');
    $('.login_container').toggleClass('start');
});