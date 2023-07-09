var leftPanelCurrentPage = 1;

function refreshContentBuilderPage() {
    let selectedRow = $('.content-list-item.selected-row');
    let contentUUID = selectedRow.find('.content-uuid').val();

    if (selectedRow.length === 0) {
        $('#content-name-text').text('No content selected');
        $('.header-description-text').text('No description');
        $('#update-content-uuid').val('');
    }
    else {
        $.ajax({
            url: '/content-manager/databases',
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
                }
                else {
                    $('#content-name-text').text('No content selected');
                    $('.header-description-text').text('No description');
                }
                refreshColumnItem(contentUUID);
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    };
};

function processPaginationButton(leftPanelCurrentPage, maxPage) {
    let backwardAnchor =  $('.pagination-anchor.backward-anchor')
    let forwardAnchor =  $('.pagination-anchor.forward-anchor')

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

function refreshColumnItem(selectedContentUUID) {
    $('ul.column-body-list').empty();

    $.ajax({
        url: '/content-manager/database-content',
        method: 'GET',
        data: {'content_uuid': selectedContentUUID},
        success: function(data) {
            if (data['result']) {
                let columns = data['fields']
                $.each(columns, function(columnIndex, columnInfo) {
                    let columnName = columnInfo['column_name']
                    let columnType = columnInfo['column_type']
                    let columnOrder = columnInfo['column_order']
                    let columnUUID = columnInfo['colume_uuid']

                    createContentFields(columnName, columnType, columnOrder, columnUUID);
                });
                $('.single-column-container').toggleClass('start');
            }
            else {
                alert(data['msg'])
            }
        },
        error: function(data) {
            alert(data.responseText);
        }
    })
};

function refreshContentItem(page, selectedContentUUID) {
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
                                
                                if (selectedContentUUID && contentUUID === selectedContentUUID) {
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

function createContentItem(tableName, contentUUID, selectedRow) {
    let currentListLength = $('.left-panel-content-list li').length;
    
    if (selectedRow) {
        $('<li>').prop({'class': 'content-list-item selected-row', 'id': `content-list-item-${currentListLength}`}).appendTo('.left-panel-content-list');
    }
    else {
        $('<li>').prop({'class': 'content-list-item', 'id': `content-list-item-${currentListLength}`}).appendTo('.left-panel-content-list');
    }

    $('<input>').prop({'class': 'content-uuid', 'id': `content-uuid-${currentListLength}`, 'type': 'hidden', 'value': contentUUID }).appendTo(`#content-list-item-${currentListLength}`);

    $('<div>').prop({'class': 'content-list-index', 'id': `index-${currentListLength}`}).appendTo(`#content-list-item-${currentListLength}`);
    $('<i>').prop({'class': 'content-list-index-icon fa-solid fa-circle'}).appendTo(`#index-${currentListLength}`)

    $('<div>').prop({'class': 'content-list-context', 'id': `context-${currentListLength}`}).appendTo(`#content-list-item-${currentListLength}`);
    $('<span>').prop({'class': 'content-list-context-text'}).text(tableName).appendTo(`#context-${currentListLength}`)

    $('<div>').prop({'class': 'content-list-delete', 'id': `more-${currentListLength}`}).appendTo(`#content-list-item-${currentListLength}`);
    $('<i>').prop({'class': 'bx bxs-trash', 'title': 'Delete'}).appendTo(`#more-${currentListLength}`)

    $('<div>').prop({'class': 'content-selected-line'}).appendTo(`#content-list-item-${currentListLength}`);
    
    rowBodyFactory.set(`content-list-item-${currentListLength}`, 'center-content-builder');
};

function createContentFields(columnName, columnType) {
    let currentListLength = $('.column-body-list li').length;

    $('<li>').prop({'class': `single-column-container`, 'id': `single-column-container-${currentListLength}`, 'style': `--c:${currentListLength + 1}`}).appendTo('.column-body-list');

    $('<div>').prop({'class': 'column-front-part', 'id': `column-front-part-${currentListLength}`}).appendTo(`#single-column-container-${currentListLength}`);
    $('<i>').prop({'class': 'fa-solid fa-grip-vertical', id: `column-moving-container-${currentListLength}`}).appendTo(`#column-front-part-${currentListLength}`);

    $('<div>').prop({'class': 'column-body-part', id: `column-body-part-${currentListLength}`}).appendTo(`#single-column-container-${currentListLength}`);
    $('<div>').prop({'class': 'column-part column-body-icon', id: `column-body-icon-${currentListLength}`}).appendTo(`#column-body-part-${currentListLength}`);
    $('<i>').prop({'class': 'fa-solid fa-t', id: `body-icon-${currentListLength}`}).appendTo(`#column-body-icon-${currentListLength}`);
    $('<div>').prop({'class': 'column-part column-body-name', id: `column-body-name-${currentListLength}`}).appendTo(`#column-body-part-${currentListLength}`);
    $('<span>').prop({'class': 'column-body-name-text', id: `body-name-text-${currentListLength}`}).text(columnName).appendTo(`#column-body-name-${currentListLength}`);
    $('<div>').prop({'class': 'column-part column-body-type', id: `column-body-type-${currentListLength}`}).appendTo(`#column-body-part-${currentListLength}`);
    $('<span>').prop({'class': 'column-body-type-text', id: `body-type-text-${currentListLength}`}).text(columnType).appendTo(`#column-body-type-${currentListLength}`);

    $('<div>').prop({'class': 'column-rear-part', id: `column-rear-part-${currentListLength}`}).appendTo(`#single-column-container-${currentListLength}`);
    $('<div>').prop({'class': 'column-footer-icon column-footer-edit', id: `column-footer-edit-${currentListLength}`}).appendTo(`#column-rear-part-${currentListLength}`);
    $('<i>').prop({'class': 'fa-solid fa-pen-to-square', id: `edit-icon-${currentListLength}`, title: 'Edit'}).appendTo(`#column-footer-edit-${currentListLength}`);
    $('<div>').prop({'class': 'column-footer-icon column-footer-delete', id: `column-footer-delete-${currentListLength}`}).appendTo(`#column-rear-part-${currentListLength}`);
    $('<i>').prop({'class': 'fa-solid fa-trash', id: `delete-icon-${currentListLength}`, title: 'Delete'}).appendTo(`#column-footer-delete-${currentListLength}`);
};

$( function() {
    refreshContentItem(leftPanelCurrentPage, null);

    $('#left-panel-menu').on('panelSelect', function() {
        selectRow('#row-create-content');
        openContent();
        $('#content-table').DataTable().ajax.reload(null, false);
    });

    $('#left-panel-content-type').on('panelSelect', function() {
        let currentListLength = $('.left-panel-content-list li').length;

        if (currentListLength === 0) {
            selectRow('#content-list-id');
        }
        else {
            selectRow('.left-panel-content-list li:first');
        }
        
        openContent();
        refreshContentBuilderPage();
    });

    $('#left-panel-info').on('panelSelect', function() {
    });

    $('#left-panel-history').on('panelSelect', function() {
    });

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

    $('.left-panel-content-list').on('click', 'li .content-list-delete', function () {
        result = confirm('Delete this item?');
        if (result === false){
            return false
        };
        let contentUUID = $(this).parent().find('.content-uuid').val();

        $.ajax({
            url: '/content-manager/databases',
            contentType: 'application/json;charset=UTF-8',
            method: 'DELETE',
            data: JSON.stringify({
                'content_uuid': contentUUID
            }),
            success: function(data) {
                $('#content-table').DataTable().ajax.reload(null, false);
                refreshContentItem(1, null);
            },
            error: function(data){
                alert(data.responseText);
            }
        })
    });

    $('.pagination-anchor.forward-anchor').on('click', function(event) {
        event.preventDefault();
        leftPanelCurrentPage += 1;
        refreshContentItem(leftPanelCurrentPage, null);
    });

    $('.pagination-anchor.backward-anchor').on('click', function(event) {
        event.preventDefault();
        leftPanelCurrentPage -= 1;
        refreshContentItem(leftPanelCurrentPage, null);
    });

    $('.content-create-content').on('click', function(event) {
        event.preventDefault();

        openPopUp('#create-content-pop-up');
    });
});