let cinemaHintsShown = false;
var currentVideoLink;
var intervalId;

WA.room.onEnterZone('cinema', function() {
    if (!cinemaHintsShown) {
        WA.chat.sendChatMessage("Change video: /video <Video Link>", "Cinema");
        WA.chat.sendChatMessage("Link format: https://www.youtube.com/watch?v=Video-ID", "Cinema");
        cinemaHintsShown = true;
    }
    
    getVideoLink(function(link) {
        if (link) {
            WA.nav.openCoWebSite(link);
            currentVideoLink = link;
        }
        intervalId = setInterval(function() {
            getVideoLink(function(newLink) {
                if (newLink) {
                    if (newLink != currentVideoLink) {
                        currentVideoLink = newLink;
                        WA.nav.closeCoWebSite();
                        setTimeout(function() {
                            WA.nav.openCoWebSite(currentVideoLink);
                        }, 2000);
                    }
                }
            });
        }, 1000);
    });
});

WA.room.onLeaveZone('cinema', function() {
    WA.nav.closeCoWebSite();
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
});


WA.chat.onChatMessage((message => {
    if (message.startsWith("/video")) {
        let input = message.split(" ");
        if (input.length != 2) {
            WA.chat.sendChatMessage("Wrong number of arguments", "Cinema");
        } else {
            let XHR = null;
    
            try {
                XHR = new XMLHttpRequest();
            } catch(e) {
                WA.chat.sendChatMessage("Could not query backend", "Cinema");
            }
    
            if (XHR) {
                XHR.open('GET', '/cinema/?url=' + input[1] + "&uuid=" + WA.player.id, true);
                XHR.onreadystatechange = function() {
                    if (XHR.readyState == 4 && this.status == 200) {
                        let response = XHR.responseText;
                        WA.chat.sendChatMessage(response, "Cinema");
                    }
                }
                XHR.send(null);
            }
        }
    }
}));

function getVideoLink(myCallback) {
    let XHR = null;
    
    try {
        XHR = new XMLHttpRequest();
    } catch(e) {
        console.error("Can not create XHR", e);
    }
    
    if (XHR) {
        XHR.open('GET', '/cinema/?uuid=' + WA.player.id, true);
        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && this.status == 200) {
                myCallback(XHR.responseText);
            } else if (XHR.readyState == 4 && this.status == 404) {
                myCallback(null);
            }
        }
        XHR.send(null);
    } else {
        myCallback(null);
    }
}
