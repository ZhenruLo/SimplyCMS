function toggle_pop_up(){
    $('.pop_up_background').toggleClass('show');
};

$( function() {
    $('.pop_up_background').on('click', function(e){
        if (e.target !== e.currentTarget) {
            return
        };
        toggle_pop_up();
    });

    $('.page_loader').toggleClass('hide');
});