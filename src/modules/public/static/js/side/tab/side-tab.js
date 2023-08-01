pageUrlFactory = new Map()

function clearSelectedTab() {
    $('#left-panel-container').find('.selected-tab').removeClass('selected-tab');
}

function openTab(id, extra = new Map()) {
    clearSelectedTab();
    clearSelectedRow();
    clearSelectedBody();
    
    $('#' + id).addClass('selected-tab').trigger('tabChange', [extra]);
};

$('.left-panel-tab').on('click', function(event) {
    event.preventDefault();
    const tabID = $(this).prop('id')
    const urlPath = new URL(window.location.origin + pageUrlFactory.get(tabID));
    
    openTab(tabID);
    pushCustomState(urlPath);
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