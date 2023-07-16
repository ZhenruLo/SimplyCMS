function togglePopUp() {
    $('.pop-up-background').mousedown();
};

function openPopUp(containerId, headerText=null, backgroundActivate=true) {
    if (backgroundActivate) {
        $('.pop-up-background').toggleClass('show');
    }
    
    if (headerText) {
        $('.pop-up-base-body.show .pop-up-middle-text').text(headerText);
    };

    $('.pop-up-base-body').removeClass('show');
    $(containerId).addClass('show');
}

$(function() {
    $('.pop-up-background').on('mousedown', function(event){
        if (event.target !== event.currentTarget) {
            return
        };

        $('.pop-up-background').toggleClass('show');
        $('.pop-up-base-body').removeClass('show');
    });
});