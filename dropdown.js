$(document).ready(function() {
    $("#dropdown").hide();
    
    // this is here mostly for mobile purposes
    $("#menu").on("mousedown", function(e) {
        if ($("#dropdown").css("display") == "none") {
            $("#dropdown").show();
        } else {
            $("#dropdown").hide();
        }
    });

    $("#dropdown").on("mouseleave", function(e) {
        $("#dropdown").hide();
    });

});
