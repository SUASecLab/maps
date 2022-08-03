// script for the iot lab map

var rc3MapEnabled = false;
var popups = [];
var popupNumber = 0;
let adminHintShown = false;
var coWebsite;
var triggerMessage;

function cleanup() {
    if (triggerMessage) {
        triggerMessage.remove();
    }
    if (coWebsite) {
        coWebsite.close();
    }
    for (let i = 0; i < popupNumber; i++) {
        if (popups[i]) {
            popups[i].close();
            popups[i] = null;
        }
    }
}

function enableRc3Map() {
    rc3MapEnabled = true;
}

WA.onInit().then(() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    if ((month === 11) &&
        (27 <= day) &&
        (day <= 30)) {
        enableRc3Map();
    }
});

WA.room.onEnterLayer('rc3').subscribe(() => {
    if (rc3MapEnabled) {
        WA.nav.goToRoom("/@/org/lab.itsec.hs-sm.de/rc3");
    }
});

// lecture room
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
                            '&meetingName=lecture&meetingID=9c83a2ee-25e5-4770-9ebd-60cde920b0a6&userName=' +
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

// functions for workplaces
function components(nr) {
    let components = 'Could not fetch components';
    let XHR = null;
    
    /* Show hint for changing components to admins */
    if ((WA.player.tags.includes("admin")) && (!adminHintShown)) {
        adminHintShown = true;
        WA.chat.sendChatMessage("You can change the displayed components here:", "Components")
        WA.chat.sendChatMessage("https://lab.itsec.hs-sm.de/components/edit/?token=" + WA.player.userRoomToken, "Components")
        WA.chat.sendChatMessage("Do not forget to select the correct table number", "Components")
    }

    function displayComponents(nr, components) {
        popups[popupNumber] = WA.ui.openPopup(
            'contiki-' + nr,
            'Workplace ' + nr + '\n' + components,
            [{
                label: "Close",
                className: "primary",
                callback: (popup) => {
                    popup.close();
                }
            }]
        );
        popupNumber++;
    }
    
    try {
        XHR = new XMLHttpRequest();
    } catch(e) {
         console.error('Could not generate XHR');
    }
    
    if (XHR) {
        XHR.open('GET', '/components/nr/' + nr + "?token=" + WA.player.userRoomToken, true);
        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && this.status == 200) {
                components =  XHR.responseText;
                displayComponents(nr, components);
            }
        }
        XHR.send(null);
    }
}

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
                            coWebsite = await WA.nav.openCoWebSite("/assigner/contiki-" + nr + "?token=" + token,
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
                            coWebsite = await WA.nav.openCoWebSite("/websockify/vnc.html?path=websockify/cooja-" + nr + "&autoconnect=true&resize=scale&password=" + password,
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

WA.room.onEnterLayer('workgroup_1').subscribe(() => {
    components(1);
    multiUser(1);
});

WA.room.onEnterLayer('workgroup_2').subscribe(() => {
    components(2);
    multiUser(2);
});

WA.room.onEnterLayer('workgroup_3').subscribe(() => {
    components(3);
    multiUser(3);
});

WA.room.onEnterLayer('workgroup_4').subscribe(() => {
    components(4);
    multiUser(4);
});

WA.room.onEnterLayer('workgroup_5').subscribe(() => {
    components(5);
    multiUser(5);
});

WA.room.onEnterLayer('workgroup_6').subscribe(() => {
    components(6);
    multiUser(6);
});

// Multi User Leave

WA.room.onLeaveLayer('workgroup_1').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('workgroup_2').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('workgroup_3').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('workgroup_4').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('workgroup_5').subscribe(() => {
    cleanup();
});

WA.room.onLeaveLayer('workgroup_6').subscribe(() => {
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
