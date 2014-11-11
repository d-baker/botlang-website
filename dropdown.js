$(document).ready(function() {
    $("#dropdown").hide();
    
    $("#menu").on("mousedown", function(e) {
        $("#dropdown").show();
    });

    $("#menu").on("mouseleave", function(e) {
        $("#dropdown").hide();
    });


});
