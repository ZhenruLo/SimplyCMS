$(function() {
    $("#content").toggleClass("start");

    $("#database_anchor").removeClass("current_anchor");

    $("#collapse_menu_btn").on("click", function(){
        $("#side").toggleClass("expand");
        $("#content").toggleClass("collapse");
    });
});