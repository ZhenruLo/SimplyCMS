$(function() {
    $("#login_form").submit(function(event){
        event.preventDefault();
        $.ajax({
            url: "/login/verify",
            contentType: "application/x-www-form-urlencoded",
            method: "POST",
            data: $(this).serialize(),
            success: function(data){
                if (data.result){
                    window.location.replace(data.msg);
                }
                else{
                    $("#login_form").trigger("reset");
                    $(".modal_box").toggleClass("show_modal");
                    $(".modal_text").text(data.msg);
                };
            },
            error: function(data){
                alert(data.responseText);
            }
        });
    });

    $(".mark_div").on("click", function(){
        $(".modal_box").removeClass("show_modal");
    });

    $(".content_container").toggleClass("start");
    $(".welcome_logo").toggleClass("start");
    $(".welcome_text").toggleClass("start");
    $(".login_fieldset").toggleClass("start");
    $(".submit_btn").toggleClass("start");
});