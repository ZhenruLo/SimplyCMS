pageUrlFactory = new Map()

function clearSelectedTab() {
    $('#left-panel-container').find('.selected-tab').removeClass('selected-tab');
}

function openTab(id, extra = new Map()) {
    let urlPath = pageUrlFactory.get(id);
    pushCustomState(null, urlPath);

    clearSelectedTab();
    
    $('#' + id).addClass('selected-tab').trigger('tabChange', [extra]);
};

$('.left-panel-tab').on('click', function(event) {
    event.preventDefault();
    
    openTab($(this).prop('id'));
});

$('.left-panel-tab').on('tabChange', function(event, extra) {
    openPanel(extra);
})

function appendPageUrl(url) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            $.each(data['state'], function(key, value) {
                pageUrlFactory.set(key, value)
            });
        }
    })
};

$( function() {
})