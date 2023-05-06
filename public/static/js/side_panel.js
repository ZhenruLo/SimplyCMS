$(function(){
    $(".dropdown_button").on("click", function(){
        $(".dropdown_content").toggleClass("show");
    });

    $.ajax({
        url: "/username",
        method: "GET",
        contentType:"application/json",
        success: function(data){
            $(".dropdown_button").html(data['username']);
        },
        error: function(data){
            alert(data.responseText);
        }
    })
});