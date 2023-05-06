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
            if (data['role']){
                $("#admin_page_anchor").toggleClass("disabled");
            }
        },
        error: function(data){
            alert(data.responseText);
        }
    })
});