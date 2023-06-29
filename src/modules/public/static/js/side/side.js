var rowBodyFactory = new Map()
var tabPanelFactory = new Map()

rowBodyFactory.set('row-create-content', 'center-create-content');
rowBodyFactory.set('row-custom-field', 'center-custom-field');
rowBodyFactory.set('row-create-page', 'center-create-page');

tabPanelFactory.set('content-tab', 'left-panel-menu');
tabPanelFactory.set('content-type-tab', 'left-panel-content-type');
tabPanelFactory.set('information-tab', 'left-panel-info');
tabPanelFactory.set('history-tab', 'left-panel-history');

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

$(function() {
    $('#database-anchor').removeClass('current-anchor');
    
    $('.left-panel-menu-row').toggleClass('start');
    $('.left-panel-tab-container').toggleClass('start');

    $('#collapse-menu-btn').on('click', function() {
        $('.side-inner-container').toggleClass('expand');
        $('#content').toggleClass('collapse');
    });
    
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