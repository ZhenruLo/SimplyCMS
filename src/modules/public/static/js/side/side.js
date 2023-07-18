var rowBodyFactory = new Map()
var tabPanelFactory = new Map()

function clearSelectedRow() {
    $('#left-panel-container').find('.selected-row').removeClass('selected-row').trigger('rowRemove');
};

function clearSelectedPanel() {
    $('#left-panel-container').find('.selected-panel').removeClass('selected-panel').trigger('panelRemove');
};

function clearSelectedBody() {
    $('.content-container').find('.selected-body').removeClass('selected-body').trigger('bodyRemove');
};

function selectRow(leftPanelRow) {
    clearSelectedRow();
    $(leftPanelRow).addClass('selected-row').trigger('rowSelect');
};

function openContent() {
    let selectedBody = rowBodyFactory.get($('.selected-row').prop('id'));
    clearSelectedBody();
    $('#' + selectedBody).addClass('selected-body').trigger('bodySelect');
};

function openPanel() {
    clearSelectedPanel();
    
    let selectedPanel = tabPanelFactory.get($('.selected-tab').prop('id'));
    $('#' + selectedPanel).addClass('selected-panel').trigger('panelSelect');
};

$('#collapse-menu-btn').on('click', function() {
    $('.side-inner-container').toggleClass('expand');
    $('#content').toggleClass('collapse');
});

$(function() {
    $('#database-anchor').removeClass('current-anchor');
    
    $('.side-li').toggleClass('start');
    
    $('.left-panel-menu-row').toggleClass('start');
    
    $.ajax({
        url: '/username',
        method: 'GET',
        success: function(data) {
            $('#logout-anchor .side-anchor-text').text('Hi, ' + data['username']);
            if (data['result']) {
                $('#admin-page-anchor').toggleClass('disabled');
            }
        },
        error: function(data) {
            alert(data.responseText);
        },
    });
});