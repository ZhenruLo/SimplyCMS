function openMenu(id) {
    $('.left_panel_content_container').removeClass('selected_panel');
    if (id === 'menu_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_menu').toggleClass('selected_panel');
    }

    else if (id === 'content_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_content_type').toggleClass('selected_panel');
    }

    else if (id === 'information_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_info').toggleClass('selected_panel');
    }

    else if (id === 'history_tab' && $('#' + id).hasClass('selected_tab')) {
        $('#left_panel_history').toggleClass('selected_panel');
    }
};

function openContent(id) {
    $('.center_content_container').removeClass('selected_body');

    if (id === 'row_create_content' && $('#' + id).hasClass('selected_row')) {
        $('#center_create_content').toggleClass('selected_body');
    }

    else if (id === 'row_custom_field' && $('#' + id).hasClass('selected_row')) {
        $('#center_custom_field').toggleClass('selected_body');
    }

    else if (id === 'row_create_page' && $('#' + id).hasClass('selected_row')) {
        $('#center_create_page').toggleClass('selected_body');
    }
}

function createContentItem(table_name, table_uuid) {
    var current_list_id = $(".left_panel_content_list li").length;

    if (current_list_id === 0) {
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
}

function processPaginationButton(left_panel_current_page, max_page) {
    var backward_anchor =  $('.pagination_anchor#backward_anchor')
    var forward_anchor =  $('.pagination_anchor#forward_anchor')

    console.log(left_panel_current_page)
    console.log(max_page)
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
    }
}

function refreshContentItem(page) {
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
                                createContentItem(value['table_name'], value['content_uuid']);
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
            }
        },
        error: function(data) {
            alert(data.responseText);
        }
    })
};

$( function() {
    var left_panel_current_page = 1;

    refreshContentItem(left_panel_current_page);

    $('.left_panel_menu_row').toggleClass('start');
    $('.left_panel_tab_container').toggleClass('start');
    
    $('.left_panel_tab').on('click', function(event) {
        event.preventDefault();
        var current_tab = $(this);

        $('.left_panel_tab').removeClass('selected_tab')
        current_tab.toggleClass('selected_tab');
        openMenu($(this).attr('id'));
    });

    $('.left_panel_inner_row').on('click', function(event) {
        event.preventDefault();
        var closest_row = $(this).closest('.left_panel_menu_row')

        $('.left_panel_menu_row').removeClass('selected_row');
        closest_row.toggleClass('selected_row');
        openContent(closest_row.attr('id'));
    });

    $('.left_panel_content_list').on('click', 'li.content_list_item', function() {
        $('.content_list_item').removeClass('selected_row');
        $(this).addClass("selected_row");
    });

    $('.pagination_anchor#forward_anchor').on('click', function(event) {
        event.preventDefault();
        left_panel_current_page += 1;
        refreshContentItem(left_panel_current_page);
    });

    $('.pagination_anchor#backward_anchor').on('click', function(event) {
        event.preventDefault();
        left_panel_current_page -= 1;
        refreshContentItem(left_panel_current_page);
    });
});