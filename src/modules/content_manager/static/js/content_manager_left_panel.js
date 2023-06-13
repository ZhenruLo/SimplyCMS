var left_panel_current_page = 1;

function openMenu(id) {
    $('.left_panel_content_container').removeClass('selected_panel');
    if (id === 'menu_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_menu').addClass('selected_panel');
        selectedRow('#row_create_content');
    }

    else if (id === 'content_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_content_type').addClass('selected_panel');
        selectedRow('.left_panel_content_list li:first');
    }

    else if (id === 'information_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_info').addClass('selected_panel');
    }

    else if (id === 'history_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_history').addClass('selected_panel');
    };
};

function openContent(id) {
    $('.center_content_container').removeClass('selected_body');

    if (id === 'row_create_content' && $('#' + id).hasClass('selected_row')) {
        $('#center_create_content').addClass('selected_body');
    }

    else if (id === 'row_custom_field' && $('#' + id).hasClass('selected_row')) {
        $('#center_custom_field').addClass('selected_body');
    }

    else if (id === 'row_create_page' && $('#' + id).hasClass('selected_row')) {
        $('#center_create_page').addClass('selected_body');
    };
};

function openTab(id) {
    $('.left_panel_tab').removeClass('selected_tab');
    $(id).addClass('selected_tab');
}

function clearSelectedRow() {
    $('.left_panel_menu_row').removeClass('selected_row');
    $('.content_list_item').removeClass('selected_row');
}

function selectedRow(left_panel_row) {
    clearSelectedRow();
    $(left_panel_row).addClass('selected_row');
}

function openContentBuilder(content_row) {
    selectedRow(content_row);
}

function createContentItem(table_name, table_uuid, selected_row) {
    var current_list_id = $(".left_panel_content_list li").length;

    if (selected_row) {
        $('<li>').attr({'class': 'content_list_item selected_row', 'id': 'content_list_item_' + current_list_id}).appendTo('.left_panel_content_list');
    }
    else {
        $('<li>').attr({'class': 'content_list_item', 'id': 'content_list_item_' + current_list_id}).appendTo('.left_panel_content_list');
    }

    $('<input>').attr({'class': 'content_uuid', 'id': 'content_uuid_' + current_list_id, 'type': 'hidden', 'value': table_uuid }).appendTo('#content_list_item_' + current_list_id);

    $('<div>').attr({'class': 'content_list_index', 'id': 'index_'+current_list_id}).appendTo('#content_list_item_' + current_list_id);
    $('<i>').attr({'class': 'content_list_index_icon fa-solid fa-circle'}).appendTo('#index_' + current_list_id)

    $('<div>').attr({'class': 'content_list_context', 'id': 'context_' + current_list_id}).appendTo('#content_list_item_' + current_list_id);
    $('<span>').attr({'class': 'content_list_context_text'}).text(table_name).appendTo('#context_' + current_list_id)

    $('<div>').attr({'class': 'content_list_more', 'id': 'more_' + current_list_id}).appendTo('#content_list_item_' + current_list_id);
    $('<i>').attr({'class': 'fa-solid fa-ellipsis-vertical'}).appendTo('#more_' + current_list_id)

    $('<div>').attr({'class': 'content_selected_line'}).appendTo('#content_list_item_' + current_list_id);
};

function processPaginationButton(left_panel_current_page, max_page) {
    var backward_anchor =  $('.pagination_anchor#backward_anchor')
    var forward_anchor =  $('.pagination_anchor#forward_anchor')
    if (max_page <= 1){
        $('.left_panel_content_pagination').css('display', 'none');
    }
    else {
        $('.left_panel_content_pagination').css('display', 'flex');

        if (left_panel_current_page <= 1) {
            backward_anchor.css({
                'pointer-events': 'none',
                'color': 'gray',
            });
            forward_anchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
        }
        else if (left_panel_current_page >= max_page){
            backward_anchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
            forward_anchor.css({
                'pointer-events': 'none',
                'color': 'gray',
            });
        }
        else {
            backward_anchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
            forward_anchor.css({
                'pointer-events': 'initial',
                'color': 'black',
            });
        };
    };
};

function refreshContentItem(page, selected_content_uuid) {
    $('ul.left_panel_content_list').empty();

    $.ajax({
        url: '/content-manager/table-count',
        method: 'GET',
        success: function(data) {
            if (data['result']) {
                var count = data['data']
                var max_page = data['max_page']
                $('.count_num').text(count);
                
                processPaginationButton(page, max_page);
                
                $.ajax({
                    url: '/content-manager/table-info',
                    method: 'GET',
                    data: {'page': page},
                    success: function(data) {
                        if (data['result']) {
                            var table_list = data['data']
                            $.each(table_list, function(key, value){
                                var table_name = value['table_name'];
                                var content_uuid = value['content_uuid'];
                                
                                if (content_uuid == selected_content_uuid || selected_content_uuid == null) {
                                    createContentItem(table_name, content_uuid, true);
                                }
                                else {
                                    createContentItem(table_name, content_uuid, false);
                                }
                            })
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
    refreshContentItem(left_panel_current_page, null);

    $('.left_panel_menu_row').toggleClass('start');
    $('.left_panel_tab_container').toggleClass('start');
    
    $('.left_panel_tab').on('click', function(event) {
        event.preventDefault();
        
        openTab(this);
        openMenu($(this).attr('id'));
    });

    $('.left_panel_inner_row').on('click', function(event) {
        event.preventDefault();
        var closest_row = $(this).closest('.left_panel_menu_row');

        selectedRow(closest_row);
        openContent(closest_row.attr('id'));
    });

    $('.left_panel_content_list').on('click', 'li.content_list_item', function() {
        openContentBuilder(this);
    });

    $('.pagination_anchor#forward_anchor').on('click', function(event) {
        event.preventDefault();
        left_panel_current_page += 1;
        refreshContentItem(left_panel_current_page, null);
    });

    $('.pagination_anchor#backward_anchor').on('click', function(event) {
        event.preventDefault();
        left_panel_current_page -= 1;
        refreshContentItem(left_panel_current_page, null);
    });

    $('.content_list_context').on('click', function(event) {
        event.preventDefault();

        toggle_pop_up();
    });
});