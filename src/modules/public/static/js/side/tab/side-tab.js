function clearSelectedTab() {
    $('#left-panel-container').find('.selected-tab').removeClass('selected-tab');
}

function openTab(id) {
    clearSelectedTab();
    
    $(id).addClass('selected-tab').trigger('tabChange');
};

$('.left-panel-tab').on('click', function(event) {
    event.preventDefault();
    
    openTab(this);
});

$('.left-panel-tab').on('tabChange', function(event) {
    openPanel();
})

$( function() {
    togglePageState(state);
})