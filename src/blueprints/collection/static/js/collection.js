$(function() {
    $(".test_button").on("click", function(){
        console.log("HERE");
        $.ajax({
            url: "/collection/create",
            method: "POST",
            success: function(data) {
                alert(data.msg);
            },
            error: function(data) {
                alert(data.responseText);
            },
        });
    });
});