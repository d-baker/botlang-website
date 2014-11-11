$(document).ready(function() {
    var dictionary = {};

    $.ajax({
           url: "dictionary.json",
           type: "GET",
           dataType: "json",
    
           success: function(data) {
               dictionary = data;
           },
    
           error:function (xhr, ajaxOptions, thrownError, request, error){
               console.log('xrs.status = ' + xhr.status + '\n' + 
               'thrown error = ' + thrownError + '\n' +
               'xhr.statusText = '  + xhr.statusText + '\n' +
               'request = ' + request + '\n' +
               'error = ' + error);
            }
       });

    function translate(text, inputlang, targetlang) {
        var input = text.split(" ");
        var sentence = text;

        for (i = 0; i < input.length; i++) {
            $.each(dictionary, function(n) {
                if (dictionary[n][inputlang] == input[i]) {
                    sentence = sentence.replace(input[i], dictionary[n][targetlang]);
                }
            });

        }

        return sentence;
    }

    $("#translate").click(function() {
        var text = $("#english").val().replace(/\r?\n/g, ' <br> ');

        if ($("#engbot").attr("checked") == "checked") {
            translation = translate(text, "english", "bottish");
        } else {
            translation = translate(text, "bottish", "english");
        }
        $("#translation").html(translation);
    });

    $("#engbot").click(function() {
        $("#english").attr("placeholder", "type English to be translated");
    });

    $("#boteng").click(function() {
        $("#english").attr("placeholder", "type Bottish to be translated");
    });

    $("#clear").click(function() {
        $("#translation").text("");
        $("#english").val("");
    });

}); 
