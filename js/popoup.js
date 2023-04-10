(function( doc) {
    "use strict";

    var main;

    if (typeof browser !== 'undefined') {
        main = browser;
    } else {
        main = chrome;
    }

    var getBackground = main.extension.getBackgroundPage();

    //Remove badge text
    getBackground.badgeReset();

    var
        statusRegex     = /(^|\s)show(\s|$)/,
        closeStatus     = doc.getElementById("close-status"),
        showStatus      = doc.getElementById("show-status"),
        statusView      = doc.querySelector(".main .status"),
        player          = doc.getElementById("player"),
        playerContainer = doc.querySelector(".main .player")
    ;

    var context = player.getContext("2d");

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

    player.height = playerContainer.clientHeight;
    player.width = playerContainer.clientWidth;

    if ("imageSmoothingEnabled" in context) {
        context.imageSmoothingEnabled = false;
    } else {
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
    }

    var drawX = 0, drawY = 0;

    function testDraw()
    {
        if (drawX > 63) {
            drawX = 0;
            ++drawY;
        }

        if (drawY > 57) {
            return;
        }

        context.fillStyle = "#adadad";
        context.fillRect(drawX * 5, drawY * 5, 5, 5);

        context.fillStyle = "#000";
        context.fillRect(drawX * 5, drawY * 5, 4, 4);

        ++drawX;

        setTimeout(testDraw, 1);
    }

    setTimeout(testDraw, 500);

})(document);
