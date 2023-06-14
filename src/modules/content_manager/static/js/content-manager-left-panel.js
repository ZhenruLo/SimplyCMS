var leftPanelCurrentPage = 1;

function clearSelectedRow() {
    $('.left-panel-menu-row').removeClass('selected-row');
    $('.content-list-item').removeClass('selected-row');
};

function selectRow(leftPanelRow) {
    clearSelectedRow();
    $(leftPanelRow).addClass('selected-row');
};

function openMenu(id) {
    $('.left-panel-content-container').removeClass('selected-panel');
    if (id === 'menu-tab' && $('#' + id).hasClass('selected-tab')) {
        $('#left-panel-menu').addClass('selected-panel');
        selectRow('#row-create-content');
        openContent('row-create-content');
    }

    else if (id === 'content-tab' && $('#' + id).hasClass('selected-tab')) {
        $('#left-panel-content-type').addClass('selected-panel');
        selectRow('.left-panel-content-list li:first');
        openContentBuilder('.left-panel-content-list li:first');
    }

    else if (id === 'information-tab' && $('#' + id).hasClass('selected-tab')) {
        $('#left-panel-info').addClass('selected-panel');
    }

    else if (id === 'history-tab' && $('#' + id).hasClass('selected-tab')) {
        $('#left-panel-history').addClass('selected-panel');
    };
};

function openContent(id) {
    $('.center-content-container').removeClass('selected-body');

    if (id === 'row-create-content' && $('#' + id).hasClass('selected-row')) {
        $('#center-create-content').addClass('selected-body');
    }

    else if (id === 'row-custom-field' && $('#' + id).hasClass('selected-row')) {
        $('#center-custom-field').addClass('selected-body');
    }

    else if (id === 'row-create-page' && $('#' + id).hasClass('selected-row')) {
        $('#center-create-page').addClass('selected-body');
    };
};

function openTab(id) {
    $('.left-panel-tab').removeClass('selected-tab');
    $(id).addClass('selected-tab');
};

function openContentBuilder(selectedContentRow) {
    $('.center-content-container').removeClass('selected-body');

    selectRow(selectedContentRow);
    $('#center-content-builder').addClass('selected-body');
    refreshContentBuilderPage();
};

function refreshContentBuilderPage() {
    let selectedRow = $('.content-list-item.selected-row')

    $.ajax({
        url: '/content-manager/database-content',
        method: 'GET',
        data: {'content_uuid': selectedRow.find('.content-uuid').val()},
        success: function(data) {
            if (data['result']) {
                let contentInfo = data['database'];
                let nameLength = contentInfo['table_name'].length;

                $('#content-name-text').text(contentInfo['table_name']);
            };
        },
        error: function(data) {
            alert(data.responseText);
        },
    });
};

function createContentItem(tableName, tableUuid, selectedRow) {
    let currentListLength = $(".left-panel-content-list li").length;
    
    if (selectedRow || (!selectedRow && currentListLength === 0)) {
        $('<li>').attr({'class': 'content-list-item selected-row', 'id': 'content-list-item-' + currentListLength}).appendTo('.left-panel-content-list');
    }
    else {
        $('<li>').attr({'class': 'content-list-item', 'id': 'content-list-item-' + currentListLength}).appendTo('.left-panel-content-list');
    }

    $('<input>').attr({'class': 'content-uuid', 'id': 'content-uuid-' + currentListLength, 'type': 'hidden', 'value': tableUuid }).appendTo('#content-list-item-' + currentListLength);

    $('<div>').attr({'class': 'content-list-index', 'id': 'index-'+currentListLength}).appendTo('#content-list-item-' + currentListLength);
    $('<i>').attr({'class': 'content-list-index-icon fa-solid fa-circle'}).appendTo('#index-' + currentListLength)

    $('<div>').attr({'class': 'content-list-context', 'id': 'context-' + currentListLength}).appendTo('#content-list-item-' + currentListLength);
    $('<span>').attr({'class': 'content-list-context-text'}).text(tableName).appendTo('#context-' + currentListLength)

    $('<div>').attr({'class': 'content-list-more', 'id': 'more-' + currentListLength}).appendTo('#content-list-item-' + currentListLength);
    $('<i>').attr({'class': 'fa-solid fa-ellipsis-vertical'}).appendTo('#more-' + currentListLength)

    $('<div>').attr({'class': 'content-selected-line'}).appendTo('#content-list-item-' + currentListLength);
};

function processPaginationButton(leftPanelCurrentPage, maxPage) {
    let backwardAnchor =  $('.pagination-anchor#backward-anchor')
    let forwardAnchor =  $('.pagination-anchor#forward-anchor')

    if (maxPage <= 1){
        $('.left-panel-content-pagination').css('display', 'none');
    }
    else {
        $('.left-panel-content-pagination').css('display', 'flex');

        if (leftPanelCurrentPage <= 1) {
           backwardAnchor.css({
                'pointer-events': 'none',
                'color': 'gray',
            });
            forwardAnchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
        }
        else if (leftPanelCurrentPage >= maxPage){
           backwardAnchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
            forwardAnchor.css({
                'pointer-events': 'none',
                'color': 'gray',
            });
        }
        else {
           backwardAnchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
            forwardAnchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
        };
    };
};

function refreshContentItem(page, selectedContentUuid) {
    $('ul.left-panel-content-list').empty();

    $.ajax({
        url: '/content-manager/table-count',
        method: 'GET',
        success: function(data) {
            if (data['result']) {
                let count = data['data']
                let maxPage = data['max_page']

                $('.count-num').text(count);
                processPaginationButton(page, maxPage);
                
                $.ajax({
                    url: '/content-manager/table-title',
                    method: 'GET',
                    data: {'page': page},
                    success: function(data) {
                        if (data['result']) {
                            let tableList = data['data']

                            $.each(tableList, function(key, value){
                                let tableName = value['table_name'];
                                let contentUuid = value['content_uuid'];
                                
                                if (contentUuid === selectedContentUuid) {
                                    createContentItem(tableName, contentUuid, true);
                                }
                                else {
                                    createContentItem(tableName, contentUuid, false);
                                }
                            })
                            refreshContentBuilderPage();
                        }
                        else {
                            alert(data['msg']);
                        }
                    },
                    error: function(data) {
                        alert(data.responseText);
                    }
                })
            }
            else {
                alert(data['msg']);
            };
        },
        error: function(data) {
            alert(data.responseText);
        },
    });
};

$( function() {
    refreshContentItem(leftPanelCurrentPage, null);

    $('.left-panel-menu-row').toggleClass('start');
    $('.left-panel-tab-container').toggleClass('start');
    
    $('.left-panel-tab').on('click', function(event) {
        event.preventDefault();
        
        openTab(this);
        openMenu($(this).attr('id'));
    });

    $('.left-panel-inner-row').on('click', function(event) {
        event.preventDefault();
        let closestRow = $(this).closest('.left-panel-menu-row');

        selectRow(closestRow);
        openContent(closestRow.attr('id'));
    });

    $('.left-panel-content-list').on('click', 'li.content-list-item', function() {
        openContentBuilder(this);
    });

    $('.pagination-anchor#forward-anchor').on('click', function(event) {
        event.preventDefault();
        leftPanelCurrentPage += 1;
        refreshContentItem(leftPanelCurrentPage, null);
    });

    $('.pagination-anchor#backward-anchor').on('click', function(event) {
        event.preventDefault();
        leftPanelCurrentPage -= 1;
        refreshContentItem(leftPanelCurrentPage, null);
    });

    $('.content-list-context').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('#create-content-pop-up');
    });

    $('#table-name-edit').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('#update-display-pop-up')
    })
});