function startLoading(selector) {
    $(selector).addClass('loading');
}

function endLoading(selector) {
    $(selector).removeClass('loading');
}

function pushCustomState(data, urlPath, unused='') {
    let newUrl = new URL(urlPath);
    
    $.each(newUrl.searchParams, function(key, value) {
        newUrl.searchParams.delete(key);
    });

    $.each(data, function(key, value) {
        newUrl.searchParams.set(key, value);
    });
    
    history.pushState(data, unused, newUrl);
}

function changeCurrentState(url, pathName, data={}) {
    data['path_name'] = pathName;
    $.ajax({
        url: url,
        methods: 'GET',
        data: data,
        success: function(data) {
            if (data['result']) {
                const currentTab = data['current_tab'];
                const currentQuery = new Map(data['current_query']);
                openTab(currentTab, currentQuery);
            }
            else {
                window.location.reload();
            }
        },
        error: function(data) {
            window.location.reload();
        }
    });
};

window.onpopstate = function(data) {
    if (data.state) {
        changeCurrentState('/content-manager/state', location.pathname, data.state);
    }
    else {
        changeCurrentState('/content-manager/state', location.pathname);
    }
};

$( function() {
    $('.page-loader').fadeOut(200);
});