$(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            url: '/login/info',
            contentType: 'application/x-www-form-urlencoded',
            method: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                if (data.result) {
                    window.location.replace(data.msg);
                }
                else{
                    $('#login-form').trigger('reset');
                    if (!$('.modal-container').hasClass('show-modal')) {
                        $('.modal-container').addClass('show-modal');
                    };
                    $('.modal-text').text(data.msg);
                };
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    });

    $('.mark-div').on('click', function() {
        $('.modal-container').removeClass('show-modal');
    });
});