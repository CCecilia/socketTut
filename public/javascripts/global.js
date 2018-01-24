$(document).ready(function() {
    "use strict";


    $(".signin-option").click( function() {
        $("#signinForm, #registerForm").toggle();
        $(".signin-option").removeClass('active');
        $(this).addClass('active')
    })


    //Register form
    $("form[name='register-form']").submit(function(e) {
        console.log('validating form');

        //Stop html form submission
        e.preventDefault(); 

        //validate
        var form_inputs = [
            $("input[name='name']"),
            $("input[name='email']"),
            $("input[name='password']"),
            $("input[name='confirm-password']")
        ];
        
        //check for blanks
        for (var i = 0; i < form_inputs.length; i++ ) { 
            if( !form_inputs[i].val() ){
                //add border
                form_inputs[i].css('border','1px solid red').focus();
                //reset input 
                setTimeout(function resetInput() {
                    form_inputs[i].css("border","1px solid #c06400;");
                }, 3000);
                return false
            }
        }

        //check email validatity
        if( !isValidEmailAddress(form_inputs[2].val()) ){
            //add border
            form_inputs[2].css('border','1px solid red').focus();
            //reset input 
            setTimeout(function resetInput() {
                form_inputs[2].css("border","1px solid #c06400;");
            }, 3000);

        }

        //confirm password
        if( form_inputs[2].val() !== form_inputs[3].val() ){
            //add border
            form_inputs[2].css('border','1px solid red').focus();
            form_inputs[3].css('border','1px solid red');
            //reset input 
            setTimeout(function resetInput() {
                form_inputs[2].css("border","1px solid #c06400;");
                form_inputs[3].css("border","1px solid #c06400;");
            }, 3000);
            return false
        }else{
            // serialize and submit search form
            $.ajax({
                type: "POST",
                url: "users/adduser/",
                data: $(this).serialize(), 
                success: function(callback){
                    if( callback.status == 'success'){
                        console.log('user registered')
                    }else{
                        $(".register-error").show().text(callback.error_msg);
                    }
                },
                fail: function(callback){
                    alert('unknown error occurred');
                }
            });
        }

        //Stop html form submission
        e.preventDefault(); 
    });
});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};
