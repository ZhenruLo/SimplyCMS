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

    function open_content(id){
        $(".center_content_container").removeClass("selected_content");
        if (id === "row_create_content" && $("#"+id).hasClass("selected_row")){
            $("#center_create_content").toggleClass("selected_content");
        }
        else if (id === "row_custom_field" && $("#"+id).hasClass("selected_row")){
            $("#center_custom_field").toggleClass("selected_content");
        }
        else if (id === "row_create_page" && $("#"+id).hasClass("selected_row")){
            $("#center_create_page").toggleClass("selected_content");
        }
    }

    $(".left_panel_tab").on("click", function(event){
        event.preventDefault();
        var current_tab = $(this);
        $(".left_panel_tab").removeClass("selected_tab")
        current_tab.toggleClass("selected_tab");
        open_menu($(this).attr("id"));
    });

    $(".left_panel_menu_row").on("click", function(event){
        event.preventDefault();
        $(".left_panel_menu_row").removeClass("selected_row");
        $(this).toggleClass("selected_row");
        open_content($(this).attr("id"));
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