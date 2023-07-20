function togglePageState(state) {
    const extra = new Map(state.query);

    document.title = state.title;
    openTab(state.content, extra);
};

$( function() {
    $('#content-manager-anchor').toggleClass('current-anchor');

    togglePageState(state);
    appendPageUrl('/content-manager/urls');
    refreshContentItem(leftPanelCurrentPage);
});