function togglePageState(state) {
    document.title = state.title;
    openTab(state.content);
};

$( function() {
    $('#content-manager-anchor').toggleClass('current-anchor');

    togglePageState(state);
    appendPageUrl('/content-manager/state');
});