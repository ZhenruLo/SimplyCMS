function togglePopUp() {
    $('.pop-up-background').toggleClass('show');
};

function openPopUp(containerId, headerText=null) {
    togglePopUp();

    $(containerId).addClass('show');
    
    if (headerText) {
        $('.pop-up-base-body.show .pop-up-middle-text').text(headerText);
    };
}

$(function() {
    $('.pop-up-background').on('mousedown', function(event){
        if (event.target !== event.currentTarget) {
            return
        };
        togglePopUp();
        $('.pop-up-base-body').removeClass('show');
    });
});