function startLoading(selector) {
    $(selector).addClass('loading');
}

function endLoading(selector) {
    $(selector).removeClass('loading');
}

function pushCustomState(urlPath, data = new Map(), unused = '') {
    let newUrl = new URL(urlPath);
    
    for (const key of newUrl.searchParams) {
        newUrl.searchParams.delete(key);
    };
    
    for (let [key, value] of data) {
        newUrl.searchParams.set(key, value);
    };
    
    history.pushState(data, unused, newUrl);
}

function changeCurrentState(url, pathName, map =new Map()) {
    map.set('path_name', pathName);
    
    $.ajax({
        url: url,
        methods: 'GET',
        data: Object.fromEntries(map),
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