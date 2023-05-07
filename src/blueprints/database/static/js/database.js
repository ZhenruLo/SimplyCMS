$(function() {
    $("#database_anchor").toggleClass("current_anchor");
    $(".panel_header_text").text($(".side_anchor.current_anchor .side_anchor_text").text());
});