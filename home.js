$(document).ready(function() {
    var bottish = [];
    var english = [];
    var data = "";

    $.getJSON("dictionary.json", function (text) {
        // TODO radio button stuff
        sortByEnglish(text);
        // getLetterOrder("a", text);
    });

    function sortByEnglish(data) {
        $.each(data, function(i, def) {
            english.push(def.english);
        });

        english.sort();

        $.each(english, function(i) {
            $.each(data, function(j, def) {
                if (def.english == english[i]) {
                    $("body").append("<p>" + def.english + ": " + def.bottish + "</p>");
                }
            });
        });

    }

    function sortByBottish(data) {
        $.each(data, function(i, def) {
            bottish.push(def.bottish);
        });

        bottish.sort();

        $.each(bottish, function(i) {
            $.each(data, function(j, def) {
                if (def.bottish == bottish[i]) {
                    $("body").append("<p>" + def.bottish + ": " + def.english + "</p>");
                }
            });
        });

    }

    $(".abclinks li").click(function() {
        var letter = $(this).text();
        getLetterOrder(letter, data);
    });

    function getLetterOrder(letter, data) {
        console.log("getLetterOrder() called");

        $.each(english, function(i) {
            $.each(data, function(j, def) {
                console.log(def.english);
                if (def.english.charAt(0) == letter) {
                    $("body").append("<p>" + def.english + ": " + def.bottish + "</p>");
                }
            });
        });
    }

});
