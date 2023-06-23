$(function() {
    $('#database-anchor').removeClass('current-anchor');

    $('#collapse-menu-btn').on('click', function() {
        $('.side-inner-container').toggleClass('expand');
        $('#content').toggleClass('collapse');
    });
    
    $.ajax({
        url: '/username',
        method: 'GET',
        success: function(data) {
            $('#logout-anchor .side-anchor-text').text('Hi, ' + data['username']);
            if (data['result']) {
                $('#admin-page-anchor').toggleClass('disabled');
            }
        },
        error: function(data) {
            alert(data.responseText);
        },
    });
});