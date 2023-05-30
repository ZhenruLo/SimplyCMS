$( function() {
    function show_pop_up(){

    };

    function hide_pop_up(){
        $('#pop_up_background').css('display', 'none');
    };

    $('#pop_up_background').on('click', function(e){
        console.log(e.target);
        console.log(e.currentTarget);
        if (e.target !== e.currentTarget) {
            return
        };
        hide_pop_up();
    });

    $('.page_loader').css('display','none');
});