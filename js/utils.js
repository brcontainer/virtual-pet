function Notify(title, message, url)
{
    var props = {
        "type":    "basic",
        "title":   title,
        "iconUrl": "/images/icon-128px.png",
        "message": message,
        "requireInteraction": true
    };

    /*
     * Note: requireInteraction work only in Chrome, Firefox and Opera don't support this
     */

    //Use url in id
    var id = url;

    try {
        browser.notifications.create(id, props, function() {});
    } catch (ee) {
        //Firefox don't support requireInteraction and causes exception
        delete props.requireInteraction;

        browser.notifications.create(id, props, function() {});
    }
}
