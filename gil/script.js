// script for the gil
var coWebsite;
var triggerMessage;

function cleanup() {
    if (triggerMessage) {
        triggerMessage.remove();
    }
    if (coWebsite) {
        coWebsite.close();
    }
}

// big blue button
WA.room.onEnterLayer('lecture').subscribe(() => {
    if (triggerMessage) {
        triggerMessage.remove();
    }
    triggerMessage = WA.ui.displayActionMessage({
        message: "Press on SPACE to enter the lecture",
        callback: () => {
            if (coWebsite) {
                coWebsite.close()
            }
            var XHR;
            try {
                XHR = new XMLHttpRequest();
            } catch (e) {
                console.error("Could not generate XHR");
            }
            
            if (XHR) {
                XHR.open('GET', '/extensions/bigbluebutton/?token=' + WA.player.userRoomToken +
                            '&meetingName=lecture&meetingID=0c7e6c16-bb49-45c3-b567-e3ed2945a7ab&userName=' +
                            encodeURI(WA.player.name), true);
                XHR.onreadystatechange = function() {
                    if (XHR.readyState == 4 &&  this.status == 200) {
                        let bbbJoinLink = XHR.responseText;
                        
                        setTimeout(async function() {
                            coWebsite = await WA.nav.openCoWebSite(bbbJoinLink, false,
                                    "microphone *; camera *; fullscreen; display-capture *; clipboard-read *; clipboard-write *;",
                                    70, 0, true, false);
                        }, 250);
                    }
                }
                XHR.send(null);
            }
        },
    });
});

WA.room.onLeaveLayer('lecture').subscribe(() => {
    cleanup();
});
