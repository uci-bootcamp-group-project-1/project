// this javascript's intention is to take care of all the events and triggers and bundle them here.

// due to scope issue, some function will be made global for this script to use

// ----------------------------------------------------------
// >>>>>                 button trigger                <<<<<<
// ----------------------------------------------------------
// binding enter as a trigger on clicking the search button
// / pressing after typing in the search bar will result the same effect as clicking on search button
$(document).on("keypress", "#searchContent", function(e) {
    if (e.which === 13) {
        $("#search").trigger("click");
    }
});

// ----------------------------------------------------------
// >>>>>                 button event                  <<<<<<
// ----------------------------------------------------------
// trigger event for search button
$("#search").click(function() {
    // get searchContent - cxu
    console.log("dmsg: button event detected");
    // setting/refreshing global variable searchContent
    searchContent = $("#searchContent").val();
    if (
        // check if input is a string and input not empty or whitespace
        typeof searchContent === "string" &&
        searchContent
            .split(" ")
            .join("")
            .split("").length > 0
    ) {
        console.log("dmsg: content format valid");
        // DOM: update model title
        $("#searchContent").html(searchContent);
        // run function and render api data
        // IMPORTANT, when data is stored, show model
        searchFood;
    } else {
        // if input is not in valid format, prompt user a model alert stating the valid format
        $.alert({
            // this is a jquery model alert
            title: "Input Error!",
            content: "Input is food! Empty input also not allowed !"
        });
    }
});
