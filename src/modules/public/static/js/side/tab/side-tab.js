function clearSelectedTab() {
    $('#left-panel-container').find('.selected-tab').removeClass('selected-tab');
}

function openTab(id, extra = new Map()) {
    clearSelectedTab();
    
    $(id).addClass('selected-tab').trigger('tabChange', [extra]);
};

$('.left-panel-tab').on('click', function(event) {
    event.preventDefault();
    
    openTab(this);
});

$('.left-panel-tab').on('tabChange', function(event, extra) {
    openPanel(extra);
})

$( function() {
    togglePageState(state);
})