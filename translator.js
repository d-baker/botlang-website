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

    function translate(text) {
        var english = text.split(" ");
        var sentence = text;

        for (i = 0; i < english.length; i++) {
            var translation = "";

            $.each(dictionary, function(n) {
                if (dictionary[n].english == english[i]) {
                    sentence = sentence.replace(english[i], dictionary[n].bottish);
                }

            });

        }

        return sentence;
    }

    $("#translate").click(function() {
        var text = $("#english").val().replace(/\r?\n/g, ' <br> ');
        translation = translate(text);
        $("#translation").html(translation);
    });

    $("#clear").click(function() {
        $("#translation").text("");
        $("#english").val("");
    });

}); 
