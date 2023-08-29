var leftPanelCurrentPage = 1;
var columnIconFactory = new Map();

rowBodyFactory.set('row-create-content', 'center-create-content');
rowBodyFactory.set('row-custom-field', 'center-custom-field');
rowBodyFactory.set('row-create-page', 'center-create-page');
rowBodyFactory.set('content-list-id', 'center-content-builder')

tabPanelFactory.set('content-tab', 'left-panel-menu');
tabPanelFactory.set('content-type-tab', 'left-panel-content-type');
tabPanelFactory.set('information-tab', 'left-panel-info');
tabPanelFactory.set('history-tab', 'left-panel-history');

columnIconFactory.set('text', 'bx bx-text');
columnIconFactory.set('number', 'bx bx-list-ol');
columnIconFactory.set('integer', 'bx bx-id-card');
columnIconFactory.set('datetime', 'bx bxs-calendar');
columnIconFactory.set('boolean', 'bx bx-toggle-left');
columnIconFactory.set('json', 'bx bxs-file-json');
columnIconFactory.set('media', 'bx bx-images');
columnIconFactory.set('relation', 'bx bx-link');


function checkSaveStatus(is_saved=null) {
    const tableSaveBtn = $('#table-save-button');
    tableSaveBtn.removeClass();

    if (is_saved == 'pending') {
        tableSaveBtn.addClass('pending');

        window.onbeforeunload = function(e) {
            return ("Changes that you made may not be saved.");
        };
    }
    else if (is_saved == 'saved') {
        tableSaveBtn.addClass('saved');

        window.onbeforeunload = undefined;
    }
    
}

function refreshContentBuilderPage() {
    const selectedRow = $('.content-list-item.selected-row');
    const contentUUID = selectedRow.find('.content-uuid').val();
    const extra = new Map([
        ['page', leftPanelCurrentPage],
        ['uid', contentUUID],
    ]);
    
    const newUrl = new URL(window.location.href);

    pushCustomState(newUrl, extra);

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
                    const contentInfo = data['database'];
                    
                    $('#content-name-text').html(contentInfo['content_name']);
                    if (contentInfo['description']) {
                        $('.header-description-text').html(contentInfo['description']);
                        $('#update-content-uuid').val(contentUUID);
                    }
                    else {
                        $('.header-description-text').text('No description');
                    };
                    if (!contentInfo['update_required']) {
                        checkSaveStatus('saved');
                    }
                    else {
                        checkSaveStatus();
                    }
                }
                else {
                    $('#content-name-text').text('No content selected');
                    $('.header-description-text').text('No description');
                };
                refreshColumnItem(contentUUID);
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    };
};

function processPaginationButton(page, maxPage) {
    const backwardAnchor =  $('.pagination-anchor.backward-anchor')
    const forwardAnchor =  $('.pagination-anchor.forward-anchor')

    if (maxPage <= 1){
        $('.left-panel-content-pagination').css('display', 'none');
    }
    else {
        $('.left-panel-content-pagination').css('display', 'flex');

        if (page <= 1) {
           backwardAnchor.css({
                'pointer-events': 'none',
                'color': 'gray',
            });
            forwardAnchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
        }
        else if (page >= maxPage){
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
                const columns = data['fields']
                $.each(columns, function(columnIndex, columnInfo) {
                    let columnName = columnInfo['column_name']
                    let columnType = columnInfo['column_type']
                    let columnUUID = columnInfo['column_uuid']

                    createContentFields(columnName, columnType, columnUUID);
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

function refreshContentItem(page, selectedContentUUID = null) {
    $('ul.left-panel-content-list').empty();
    
    $.ajax({
        url: '/content-manager/table-count',
        method: 'GET',
        success: function(data) {
            if (data['result']) {
                const count = data['data']
                const maxPage = data['max_page']
                
                $('.count-num').text(count);
                if (!page) {
                    page = maxPage;
                }

                leftPanelCurrentPage = page;
                processPaginationButton(page, maxPage);
                
                $.ajax({
                    url: '/content-manager/table-title',
                    method: 'GET',
                    data: {'page': page},
                    success: function(data) {
                        if (data['result']) {
                            const tableList = data['data']

                            $.each(tableList, function(key, value){
                                let tableName = value['content_name'];
                                let contentUUID = value['content_uuid'];

                                if (selectedContentUUID && contentUUID === selectedContentUUID) {
                                    createContentItem(tableName, contentUUID, true);
                                }
                                else if (!selectedContentUUID && key === 0) {
                                    createContentItem(tableName, contentUUID, true);
                                }
                                else {
                                    createContentItem(tableName, contentUUID, false);
                                }
                            })

                            openContent();
                            refreshContentBuilderPage();
                        }
                        else {
                            alert(data['msg']);
                        };
                    },
                    error: function(data) {
                        alert(data.responseText);
                    },
                });
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
    const currentListLength = $('.left-panel-content-list li').length;
    
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
    $('<span>').prop({'class': 'content-list-context-text'}).html(tableName).appendTo(`#context-${currentListLength}`)

    $('<div>').prop({'class': 'content-list-delete', 'id': `more-${currentListLength}`}).appendTo(`#content-list-item-${currentListLength}`);
    $('<i>').prop({'class': 'bx bxs-trash', 'title': 'Delete'}).appendTo(`#more-${currentListLength}`)

    $('<div>').prop({'class': 'content-selected-line'}).appendTo(`#content-list-item-${currentListLength}`);
    
    rowBodyFactory.set(`content-list-item-${currentListLength}`, 'center-content-builder');
};

function createContentFields(columnName, columnType, columnUUID) {
    const currentListLength = $('.column-body-list li').length;

    $('<li>').prop({'class': `single-column-container`, 'id': `single-column-container-${currentListLength}`, 'style': `--c:${currentListLength + 1}`}).appendTo('.column-body-list');
    $('<input>').prop({'class': 'column-uuid', 'id': `column-uuid-${currentListLength}`, 'type': 'hidden', 'value': columnUUID}).appendTo(`#single-column-container-${currentListLength}`);
    $('<div>').prop({'class': 'column-front-part', 'id': `column-front-part-${currentListLength}`}).appendTo(`#single-column-container-${currentListLength}`);

    $('<div>').prop({'class': 'column-body-part', id: `column-body-part-${currentListLength}`}).appendTo(`#single-column-container-${currentListLength}`);
    $('<div>').prop({'class': 'column-part column-body-icon', id: `column-body-icon-${currentListLength}`}).appendTo(`#column-body-part-${currentListLength}`);
    $('<i>').prop({'class': columnIconFactory.get(columnType), id: `body-icon-${currentListLength}`}).appendTo(`#column-body-icon-${currentListLength}`);
    $('<div>').prop({'class': 'column-part column-body-name', id: `column-body-name-${currentListLength}`}).appendTo(`#column-body-part-${currentListLength}`);
    $('<span>').prop({'class': 'column-body-name-text', id: `body-name-text-${currentListLength}`}).html(columnName).appendTo(`#column-body-name-${currentListLength}`);
    $('<div>').prop({'class': 'column-part column-body-type', id: `column-body-type-${currentListLength}`}).appendTo(`#column-body-part-${currentListLength}`);
    $('<span>').prop({'class': 'column-body-type-text', id: `body-type-text-${currentListLength}`}).text(columnType.toUpperCase()).appendTo(`#column-body-type-${currentListLength}`);

    $('<div>').prop({'class': 'column-rear-part', id: `column-rear-part-${currentListLength}`}).appendTo(`#single-column-container-${currentListLength}`);
    $('<div>').prop({'class': 'column-footer-icon column-footer-edit', id: `column-footer-edit-${currentListLength}`}).appendTo(`#column-rear-part-${currentListLength}`);
    $('<i>').prop({'class': 'bx bx-edit', id: `edit-icon-${currentListLength}`, title: 'Edit'}).appendTo(`#column-footer-edit-${currentListLength}`);
    $('<div>').prop({'class': 'column-footer-icon column-footer-delete', id: `column-footer-delete-${currentListLength}`}).appendTo(`#column-rear-part-${currentListLength}`);
    $('<i>').prop({'class': 'bx bxs-trash', id: `delete-icon-${currentListLength}`, title: 'Delete'}).appendTo(`#column-footer-delete-${currentListLength}`);
};

$( function() {
    const nameSpace = '/database-content';
    const socket = io.connect(window.location.origin + nameSpace);

    socket.on('connect', function() {
        socket.emit('connection', {connection_confirmation: 'you are connected to the content-manager socket!'});
    });

    socket.on('response', function(message) {
        checkSaveStatus('saved');
    });

    $('#left-panel-menu').on('panelSelect', function(event, extra) {
        let selectedRow = 'row-create-content';

        if (extra.get('row')) {
            selectedRow = extra.get('row');
        }

        selectRow('#' + selectedRow);
        openContent();
        $('#content-table').DataTable().ajax.reload(null, false);
    });

    $('#left-panel-content-type').on('panelSelect', function(event, extra) {
        let selectedContentUUID = null;
        let page = leftPanelCurrentPage;

        if (extra.get('uid')) {
            page = Number(extra.get('page'));
            selectedContentUUID = extra.get('uid');
        };
        
        clearSelectedRow();
        refreshContentItem(page, selectedContentUUID);
    });

    $('#left-panel-info').on('panelSelect', function(event, extra) {
    });

    $('#left-panel-history').on('panelSelect', function(event, extra) {
    });

    $('.left-panel-inner-row').on('click', function(event) {
        event.preventDefault();
        const closestRow = $(this).closest('.left-panel-menu-row');
        const extra = new Map([
            ['row', $(closestRow).prop('id')],
        ]);
        const newUrl = new URL(window.location.href);

        selectRow(closestRow);
        openContent();
        pushCustomState(newUrl, extra);
    });

    $('.left-panel-content-list').on('click', 'li.content-list-item .content-list-context', function() {
        selectRow($(this).parent());
        openContent();
        refreshContentBuilderPage();
    });

    $('.left-panel-content-list').on('click', 'li .content-list-delete', function () {
        const contentUUID = $(this).parent().find('.content-uuid').val();
        
        result = confirm('Delete this item?');
        if (result === false){
            return false
        };

        $.ajax({
            url: '/content-manager/databases',
            contentType: 'application/json;charset=UTF-8',
            method: 'DELETE',
            data: JSON.stringify({
                'content_uuid': contentUUID
            }),
            success: function(data) {
                $('#content-table').DataTable().ajax.reload(null, false);
                $('ul.column-body-list').empty();
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
        refreshContentItem(leftPanelCurrentPage);
    });

    $('.pagination-anchor.backward-anchor').on('click', function(event) {
        event.preventDefault();
        leftPanelCurrentPage -= 1;
        refreshContentItem(leftPanelCurrentPage);
    });

    $('.content-create-content').on('click', function(event) {
        event.preventDefault();

        openPopUp('#create-content-pop-up');
    });

    $('#table-save-button').on('click', function(event) {
        event.preventDefault();
        const selectedRow = $('.content-list-item.selected-row');
        const contentUUID = selectedRow.find('.content-uuid').val();

        $.ajax({
            url: '/content-manager/save',
            contentType: 'application/json;charset=UTF-8',
            method: 'POST',
            data: JSON.stringify({
                'content_uuid': contentUUID
            }),
            success: function(data) {
                checkSaveStatus('pending');
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    });
});