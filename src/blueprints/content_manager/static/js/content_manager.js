$(function() {
    $("#content_manager_anchor").toggleClass("current_anchor");
    $(".panel_header_text").text($(".side_anchor.current_anchor .side_anchor_text").text());

    $("#test_form").submit(function(event){
        console.log("Here");
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