$(document).ready(function() {

    $("#esorted").attr("checked", "checked");

    // excellent comparison function from here:
    // http://www.levihackwith.com/code-snippet-how-to-sort-an-array-of-json-objects-by-property/
    function sortByProperty(property) {
        'use strict';
        return function (a, b) {
            var sortStatus = 0;
            if (a[property] < b[property]) {
                sortStatus = -1;
            } else if (a[property] > b[property]) {
                sortStatus = 1;
            }
    
            return sortStatus;
        };
    }

    function createDefinitions(data, i, col1, col2) {
        var newEl = $("<tr><td>" + data[i][col1] + "</td><td>" + 
        data[i][col2] + "</td></tr>").appendTo($("#definitions"));

        return newEl;
    }

    function alphabetise(data, i, sortlang, otherlang) {
        var newEl = createDefinitions(data, i, sortlang, otherlang);

        var current_letter = (data[i][sortlang])[0];

        if (i > 0) {
            var previous_letter = (data[i-1][sortlang])[0];

            if (current_letter != previous_letter) {
                 $("<li class=\"abc\"><a href=\"#" + current_letter + "\">" + 
                 current_letter + "</a></li>").appendTo($(".abclinks"));

                 newEl.attr("id", current_letter);
            }
        } else {
            // base case for "a"
            $("<li class=\"abc\"><a href=\"#" + current_letter + "\">" + 
            current_letter + "</a></li>").appendTo($(".abclinks"));

            newEl.attr("id", current_letter);
        }

    }

    function displaySorted(data, sortlang, otherlang) {
        data = data.sort(sortByProperty(sortlang));

        $("#definitions tr").remove();
        $("#sortlang").text(sortlang);
        $("#otherlang").text(otherlang);

        $(".abc").remove();
        $.each(data, function(i) {
            alphabetise(data, i, sortlang, otherlang);
        });
    }

    function search(data, searchterm) {
        var results = []

        $.each(data, function(i) {
            if (data[i].english == searchterm || data[i].bottish == searchterm) {
                results.push(data[i]);
            }
        });

        return results;
    }

    $.ajax({
           url: "dictionary.json",
           type: "GET",
           dataType: "json",
    
           success: function(data) {
               data = data.sort(sortByProperty("english"));

               $.each(data, function(i) {
                   alphabetise(data, i, "english", "bottish");
               });

               $("#esorted").click(function() {
                    displaySorted(data, "english", "bottish");
               });

               $("#bsorted").click(function() {
                   displaySorted(data, "bottish", "english");
               });

               $("#searchbutton").click(function() {

                   var searchterm = $("#searchbar").val();

                   results = search(data, searchterm);

                   if (results.length == 0) {
                       alert("no exact matches found");
                   } else {
                       $.each(results, function(i) {
                           displaySorted(results, "english", "bottish");
                       });
                   } 

               });

               $("#clearsearch").click(function() {
                   $("#searchbar").val("");
                   displaySorted(data, "english", "bottish");
               });

           },
    
           error:function (xhr, ajaxOptions, thrownError, request, error){
               console.log('xrs.status = ' + xhr.status + '\n' + 
               'thrown error = ' + thrownError + '\n' +
               'xhr.statusText = '  + xhr.statusText + '\n' +
               'request = ' + request + '\n' +
               'error = ' + error);
            }
       });

    
});
