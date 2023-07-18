pageStateFactory = new Map()

pageStateFactory.set('menu', 'content-tab');
pageStateFactory.set('content', 'content-type-tab');
pageStateFactory.set('info', 'information-tab');
pageStateFactory.set('history', 'history-tab');

function togglePageState(state) {
    document.title = state.title;
    history.pushState(null, null, state.url);
    openTab('#' + pageStateFactory.get(state.content));
};

$( function() {
    $('#content-manager-anchor').toggleClass('current-anchor');

    togglePageState(state);
});