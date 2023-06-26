var leftPanelCurrentPage = 1;

function refreshContentBuilderPage() {
    let selectedRow = $('.content-list-item.selected-row');
    let contentUUID = selectedRow.find('.content-uuid').val();

    if (selectedRow.length === 0) {
        $('#content-name-text').text('');
        $('.header-description-text').text('');
        $('#update-content-uuid').val('');
    }
    else {
        $.ajax({
            url: '/content-manager/database-content',
            method: 'GET',
            data: {'content_uuid': contentUUID},
            success: function(data) {
                if (data['result']) {
                    let contentInfo = data['database'];
    
                    $('#content-name-text').text(contentInfo['content_name']);
                    if (contentInfo['description']) {
                        $('.header-description-text').text(contentInfo['description']);
                        $('#update-content-uuid').val(contentUUID);
                    }
                    else {
                        $('.header-description-text').text('No description');
                    }
                };
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    };
};

function createContentItem(tableName, contentUUID, selectedRow) {
    let currentListLength = $(".left-panel-content-list li").length;
    
    if (selectedRow) {
        $('<li>').prop({'class': 'content-list-item selected-row', 'id': 'content-list-item-' + currentListLength}).appendTo('.left-panel-content-list');
    }
    else {
        $('<li>').prop({'class': 'content-list-item', 'id': 'content-list-item-' + currentListLength}).appendTo('.left-panel-content-list');
    }

    $('<input>').prop({'class': 'content-uuid', 'id': 'content-uuid-' + currentListLength, 'type': 'hidden', 'value': contentUUID }).appendTo('#content-list-item-' + currentListLength);

    $('<div>').prop({'class': 'content-list-index', 'id': 'index-'+currentListLength}).appendTo('#content-list-item-' + currentListLength);
    $('<i>').prop({'class': 'content-list-index-icon fa-solid fa-circle'}).appendTo('#index-' + currentListLength)

    $('<div>').prop({'class': 'content-list-context', 'id': 'context-' + currentListLength}).appendTo('#content-list-item-' + currentListLength);
    $('<span>').prop({'class': 'content-list-context-text'}).text(tableName).appendTo('#context-' + currentListLength)

    $('<div>').prop({'class': 'content-list-more', 'id': 'more-' + currentListLength}).appendTo('#content-list-item-' + currentListLength);
    $('<i>').prop({'class': 'fa-solid fa-ellipsis-vertical'}).appendTo('#more-' + currentListLength)

    $('<div>').prop({'class': 'content-selected-line'}).appendTo('#content-list-item-' + currentListLength);
    
    rowBodyFactory.set('content-list-item-' + currentListLength, 'center-content-builder');
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

function refreshContentItem(page, selectedcontentUUID) {
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
                                let tableName = value['content_name'];
                                let contentUUID = value['content_uuid'];
                                
                                if (selectedcontentUUID && contentUUID === selectedcontentUUID) {
                                    createContentItem(tableName, contentUUID, true);
                                }
                                else {
                                    createContentItem(tableName, contentUUID, false);
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

    $('#left-panel-menu').on('panelSelect', function() {
        selectRow('#row-create-content');
        openContent();
    });

    $('#left-panel-content-type').on('panelSelect', function() {
        selectRow('.left-panel-content-list li:first');
        openContent();
        refreshContentBuilderPage();
    });

    $('#left-panel-info').on('panelSelect', function() {
    });

    $('#left-panel-history').on('panelSelect', function() {
    });

    $('.left-panel-menu-row').toggleClass('start');
    $('.left-panel-tab-container').toggleClass('start');

    $('.left-panel-inner-row').on('click', function(event) {
        event.preventDefault();
        let closestRow = $(this).closest('.left-panel-menu-row');

        selectRow(closestRow);
        openContent();
    });

    $('.left-panel-content-list').on('click', 'li.content-list-item', function() {
        selectRow(this);
        openContent();
        refreshContentBuilderPage();
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

    $('.content-create-content').on('click', function(event) {
        event.preventDefault();

        togglePopUp();
        openPopUp('.content-manager-pop-up', '#create-content-pop-up', 'Content initial settings', 'Settings');
    });
});