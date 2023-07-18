pageUrlFactory = new Map()

function clearSelectedTab() {
    $('#left-panel-container').find('.selected-tab').removeClass('selected-tab');
}

function openTab(id, extra = new Map()) {
    clearSelectedTab();
    
    $('#' + id).addClass('selected-tab').trigger('tabChange', [extra]);
};

$('.left-panel-tab').on('click', function(event) {
    event.preventDefault();
    const tabID = $(this).prop('id')
    let urlPath = new URL(window.location.origin + pageUrlFactory.get(tabID));
    
    pushCustomState(null, urlPath);
    changeCurrentState('/content-manager/state', window.location.pathname);
});

$('.left-panel-tab').on('tabChange', function(event, extra) {
    openPanel(extra);
})

function appendPageUrl(url) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            $.each(data['urls'], function(key, value) {
                pageUrlFactory.set(key, value)
            });
        }
    })
};

$( function() {
})