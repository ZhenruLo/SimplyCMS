$(function() {
    $("#content_manager_anchor").toggleClass("current_anchor");

    $("#test_form").submit(function(event){
        console.log("Here");
        event.preventDefault();
        $.ajax({
            url: "/collection/create",
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