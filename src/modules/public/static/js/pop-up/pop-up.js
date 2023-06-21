function togglePopUp() {
    $('.pop-up-background').toggleClass('show');
};

function openPopUp(currentContainerClass, containerId, title, headerText) {
    $(currentContainerClass).removeClass('show');
    $(containerId).addClass('show');

    $('.pop-up-header-text').text(title);
    $('.pop-up-middle-text').text(headerText);
}
