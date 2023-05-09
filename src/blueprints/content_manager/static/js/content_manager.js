$(function() {
    $("#content_manager_anchor").toggleClass("current_anchor");
    $(".panel_header_text").text($(".side_anchor.current_anchor .side_anchor_text").text());

    $(".test_button").on("click", function(){
        $.ajax({
            url: "/content_manager/databases",
            method: "GET",
            success: function(data) {
                console.log(data["database"])
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });

    $("#test_form").submit(function(event){
        event.preventDefault();
        $.ajax({
            url: "/content_manager/create",
            method: "POST",
            data: $(this).serialize(),
            success: function(data) {
                alert(data.msg);
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });
});