function togglePopUp() {
    $('.pop-up-background').mousedown();
};

function openPopUp(containerId, headerText=null, backgroundActivate=true) {
    if (backgroundActivate) {
        $('.pop-up-background').toggleClass('show');
    }
    
    if (headerText) {
        $('.pop-up-base-body.show .pop-up-middle-text').text(headerText);
    };

    $('.pop-up-base-body').removeClass('show');
    $(containerId).addClass('show');
}

function checkMatchRoute(cbID, routeTextID, displayTextID) {
    $(displayTextID).on('input', function(event) {
        event.preventDefault();

        if ($(cbID).prop('checked') === true) {
            $(routeTextID).val($(displayTextID).val().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-'));
        }
    });

    $(cbID).on('change', function(event) { 
        event.preventDefault();
        
        if ($(this).prop('checked') === true) {
            $(routeTextID).addClass('checked');
            $(routeTextID).prop('readonly', true);
            $(routeTextID).val($(displayTextID).val().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-'));
        }
        else {
            $(routeTextID).prop('readonly', false);
            $(routeTextID).removeClass('checked');
        };
    });
};

$(function() {
    $('.pop-up-background').on('mousedown', function(event){
        if (event.target !== event.currentTarget) {
            return
        };

        $('.pop-up-background').toggleClass('show');
        $('.pop-up-base-body').removeClass('show');
    });

    
    $('.switch-button-checkbox').on('change', function(event) {
        event.preventDefault();
        
        $(this).parent().toggleClass('switch-checked');
    });
});