let cinemaHintsShown = false;
var currentVideoLink;
var intervalId;
var coWebsite;
var triggerMessage;

// Cinema feature

WA.room.onEnterLayer('cinema').subscribe(() => {
    if (!cinemaHintsShown) {
        WA.chat.sendChatMessage("Change video: /video <Video Link>", "Cinema");
        WA.chat.sendChatMessage("Link format: https://www.youtube.com/watch?v=Video-ID", "Cinema");
        cinemaHintsShown = true;
    }
    
    getVideoLink(async function(link) {
        if (link) {
            coWebsite = await WA.nav.openCoWebSite(link);
            currentVideoLink = link;
        }
        intervalId = setInterval(function() {
            getVideoLink(function(newLink) {
                if (newLink) {
                    if (newLink != currentVideoLink) {
                        currentVideoLink = newLink;
                        if (coWebsite) {
                            coWebsite.close();
                        }
                        setTimeout(async function() {
                            coWebsite = await WA.nav.openCoWebSite(currentVideoLink);
                        }, 250);
                    }
                }
            });
        }, 1000);
    });
});

WA.room.onLeaveLayer('cinema').subscribe(() => {
    cleanup();
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
                XHR.open('GET', '/cinema/?url=' + input[1] + "&token=" + WA.player.userRoomToken, true);
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
        XHR.open('GET', '/cinema/?token=' + WA.player.userRoomToken, true);
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

// Games

function cleanup() {
    if (triggerMessage) {
        triggerMessage.remove();
    }
    if (coWebsite) {
        coWebsite.close();
    }
}

function play(nr, message) {
    cleanup();
    triggerMessage = WA.ui.displayActionMessage({
        message: message,
        callback: () => {
            var XHR;
            try {
                XHR = new XMLHttpRequest();
            } catch (e) {
                console.error("Could not generate VNC password XHR");
            }
            
            if (XHR) {
                XHR.open("GET", "/extensions/getNoVNCPassword/?token=" + WA.player.userRoomToken, true);
                XHR.onreadystatechange = function() {
                    if (XHR.readyState == 4 && this.status == 200) {
                        const password =  XHR.responseText;
                        
                        setTimeout(async function() {
                            coWebsite = await WA.nav.openCoWebSite("/websockify/vnc.html?path=websockify/gaming-" + nr + "&autoconnect=true&resize=scale&password=" + password,
                                                                   false,
                                                                   "fullscreen"
                            );
                        }, 250);
                    }
                }
                XHR.send(null);
            }
        },
    });
}

// Games Enter

WA.room.onEnterLayer('wanderlust').subscribe(() => {
    play(1, "Press SPACE if you experience a light case of WANDERLUST");
});

WA.room.onEnterLayer('doukutsu').subscribe(() => {
    play(2, "Press SPACE if you interested into a story about a cave");
});

WA.room.onEnterLayer('scummvm').subscribe(() => {
    play(3, "When the name of chuck the plant is not a secret to you, then press SPACE");
});


// Games Leave

WA.room.onLeaveLayer('wanderlust').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('doukutsu').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('scummvm').subscribe(() => {
    cleanup();
});
