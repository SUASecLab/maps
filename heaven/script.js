// script for the heaven map
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
                            '&meetingName=lecture&meetingID=b7d89ad5-1353-412d-9a61-f5031a6ec34b&userName=' +
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

// workplace functions

function multiUser(nr) {
    if (triggerMessage) {
        triggerMessage.remove();
    }
    triggerMessage = WA.ui.displayActionMessage({
        message: "Press on SPACE to open the group workplace",
        callback: () => {
            if (coWebsite) {
                coWebsite.close()
            }
            var XHR;
            try {
                XHR = new XMLHttpRequest();
            } catch (e) {
                console.error("Could not generate token extension XHR");
            }
            
            if (XHR) {
                XHR.open("GET", "/extensions/addNameToToken/?name=" + encodeURI(WA.player.name) + "&token=" + WA.player.userRoomToken, true);
                XHR.onreadystatechange = function() {
                    if (XHR.readyState == 4 && this.status == 200) {
                        const token =  XHR.responseText;
                        
                        setTimeout(async function() {
                            coWebsite = await WA.nav.openCoWebSite("/assigner/heaven-" + nr + "?token=" + token,
                                                                   false,
                                                                   "microphone *; camera *;fullscreen"
                            );
                        },  250);
                    }
                }
                XHR.send(null);
            }
        },
    });
}

function singleUser(nr) {
    if (triggerMessage) {
        triggerMessage.remove();
    }
    triggerMessage = WA.ui.displayActionMessage({
        message: "Press on SPACE to open the workplace",
        callback: () => {
            if (coWebsite) {
                coWebsite.close()
            }
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
                            coWebsite = await WA.nav.openCoWebSite("/websockify/vnc.html?path=websockify/heaven-" + nr + "&autoconnect=true&resize=scale&password=" + password,
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

// Multi User Enter

WA.room.onEnterLayer('multi_user_1').subscribe(() => {
    multiUser(1);
});

WA.room.onEnterLayer('multi_user_2').subscribe(() => {
    multiUser(2);
});

WA.room.onEnterLayer('multi_user_3').subscribe(() => {
    multiUser(3);
});


// Multi User Leave

WA.room.onLeaveLayer('multi_user_1').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('multi_user_2').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('multi_user_3').subscribe(() => {
    cleanup();
});

// Single User Enter

WA.room.onEnterLayer('single_user_1').subscribe(() => {
    singleUser(1);
});

WA.room.onEnterLayer('single_user_2').subscribe(() => {
    singleUser(2);
});

WA.room.onEnterLayer('single_user_3').subscribe(() => {
    singleUser(3);
});

WA.room.onEnterLayer('single_user_4').subscribe(() => {
    singleUser(4);
});

WA.room.onEnterLayer('single_user_5').subscribe(() => {
    singleUser(5);
});

WA.room.onEnterLayer('single_user_6').subscribe(() => {
    singleUser(6);
});

WA.room.onEnterLayer('single_user_7').subscribe(() => {
    singleUser(7);
});

WA.room.onEnterLayer('single_user_8').subscribe(() => {
    singleUser(8);
});

WA.room.onEnterLayer('single_user_9').subscribe(() => {
    singleUser(9);
});

WA.room.onEnterLayer('single_user_10').subscribe(() => {
    singleUser(10);
});

WA.room.onEnterLayer('single_user_11').subscribe(() => {
    singleUser(11);
});

WA.room.onEnterLayer('single_user_12').subscribe(() => {
    singleUser(12);
});

WA.room.onEnterLayer('single_user_13').subscribe(() => {
    singleUser(13);
});

WA.room.onEnterLayer('single_user_14').subscribe(() => {
    singleUser(14);
});

WA.room.onEnterLayer('single_user_15').subscribe(() => {
    singleUser(15);
});

WA.room.onEnterLayer('single_user_16').subscribe(() => {
    singleUser(16);
});

WA.room.onEnterLayer('single_user_17').subscribe(() => {
    singleUser(17);
});

WA.room.onEnterLayer('single_user_18').subscribe(() => {
    singleUser(18);
});

WA.room.onEnterLayer('single_user_19').subscribe(() => {
    singleUser(19);
});

WA.room.onEnterLayer('single_user_20').subscribe(() => {
    singleUser(20);
});

WA.room.onEnterLayer('single_user_21').subscribe(() => {
    singleUser(21);
});

WA.room.onEnterLayer('single_user_22').subscribe(() => {
    singleUser(22);
});

WA.room.onEnterLayer('single_user_23').subscribe(() => {
    singleUser(23);
});

// Single User Leave

WA.room.onLeaveLayer('single_user_1').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_2').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_3').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_4').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_5').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_6').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_7').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_8').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_9').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_10').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_11').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_12').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_13').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_14').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_15').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_16').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_17').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_18').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_19').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_20').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_21').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_22').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('single_user_23').subscribe(() => {
    cleanup();
});
