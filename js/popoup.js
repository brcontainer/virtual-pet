(function(browser, doc) {
    "use strict";

    var getBackground = browser.extension.getBackgroundPage();

    //Remove badge text
    getBackground.badgeReset();

    var
        statusRegex = /(^|\s)show(\s|$)/,
        closeStatus = doc.getElementById("close-status"),
        showStatus  = doc.getElementById("show-status"),
        statusView  = doc.querySelector(".main .status")
    ;

    function showStatusTamagotchi(e)
    {
        e.preventDefault();

        if (statusRegex.test(statusView.className)) {
            statusView.className = statusView.className
                                    .replace(statusRegex, " ")
                                        .trim();
        } else {
            statusView.className += " show";
        }
    };

    closeStatus.onclick = showStatusTamagotchi;
    showStatus.onclick  = showStatusTamagotchi;

})(chrome||browser, document);
