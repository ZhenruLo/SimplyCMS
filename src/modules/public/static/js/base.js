function togglePopUp(){
    $('.pop-up-background').toggleClass('show');
};

$( function() {
    $('.pop-up-background').on('click', function(e){
        if (e.target !== e.currentTarget) {
            return
        };
        togglePopUp();
    });

    $('.page-loader').toggleClass('hide');
});