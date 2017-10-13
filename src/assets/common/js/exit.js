
function popAction(){
    document.getElementById('exit_pop').style.visibility='hidden';
    document.getElementById('discountholder').style.display='block';
    document.getElementById('lp_wrap').style.marginTop='24px';
}

window.formSubmitted = false;
window.internalLink = false;

$(document).ready(function (e) {
    $('a').click(function () {
        window.internalLink = true;
    });
    
    $('#kform').submit(function () {
        window.internalLink = true;
    });
    
    $('#checkout_form').submit(function () {
        window.internalLink = true;
    });
    
    $('#userForm').submit(function () {
        window.internalLink = true;
    });
    
    var exitMessage = '\n*****************************************\nWAIT!!\n\nDon\'t miss your chance on this exclusive trial today!!!\n\n\n';

    if (exitMessage) {
        function pageUnload() {
            if (!window.internalLink) {
                window.internalLink = false;
                //$("#exitOverlay").css('height', $(document).height());
                $("#exit_pop").show();
                return exitMessage;
                return false;
            }
        }

        window.onbeforeunload = pageUnload;
    }
    //modalOnClick();
    $('#order_form').submit(function () {
        window.internalLink = true;
        $("#exit_pop").hide();
        $("#exitOverlay").hide();
    });

    $('#exitPopup').click(function () {
        exitAction();
        return false;
    });

    function exitAction() {
        $("#exitOverlay").hide();
        $(".exitpop").hide();
    }
});