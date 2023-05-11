$(function() {
    function open_menu(id){
        $(".left_panel_content_container").removeClass("selected_panel");
        if (id === "menu_tab" && $("#"+id).hasClass("selected_tab")){
            $("#left_panel_menu").toggleClass("selected_panel");
        }
        else if (id === "information_tab" && $("#"+id).hasClass("selected_tab")){
            $("#left_panel_info").toggleClass("selected_panel");
        }
    };

    $(".left_panel_tab").on("click", function(event){
        event.preventDefault();
        $(".left_panel_tab").removeClass("selected_tab")
        $(this).toggleClass("selected_tab");
        open_menu($(this).attr("id"));
    });

    $("#content_manager_anchor").toggleClass("current_anchor");
    $(".panel_header_text").text($(".side_anchor.current_anchor .side_anchor_text").text());

    // $(".test_button").on("click", function(){
    //     $.ajax({
    //         url: "/content_manager/databases",
    //         method: "GET",
    //         success: function(data) {
    //             console.log(data["databases"])
    //         },
    //         error: function(data) {
    //             alert(data.responseText);
    //         },
    //     });
    // });

    // $(".test_button1").on("click", function(){
    //     $.ajax({
    //         url: "/content_manager/databases",
    //         method: "PUT",
    //         success: function(data) {
    //             console.log(data["database"])
    //         },
    //         error: function(data) {
    //             alert(data.responseText);
    //         },
    //     });
    // });

    // $("#test_form").submit(function(event){
    //     event.preventDefault();
    //     $.ajax({
    //         url: "/content_manager/databases",
    //         method: "POST",
    //         data: $(this).serialize(),
    //         success: function(data) {
    //             alert(data.msg);
    //         },
    //         error: function(data) {
    //             alert(data.responseText);
    //         },
    //     });
    // });
});