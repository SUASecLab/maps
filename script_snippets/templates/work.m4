dnl Generates the script for the internet of things laboratory
dnl
include(`script_snippets/api/init.m4')dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/api/ui.m4')dnl
include(`script_snippets/composite/forloop2.m4')dnl
include(`script_snippets/util/bbb.m4')dnl
include(`script_snippets/util/workplaces.m4')dnl
include(`script_snippets/util/cleanup.m4')dnl
include(`script_snippets/util/tips.m4')dnl
dnl
var rc3MapEnabled = false;
var popups = [];
var popupNumber = 0;
let adminHintShown = false;
var coWebsite;
var coWebsite2;
var coWebsiteJitsi;
var triggerMessage;

CLEANUP(`
    for (let i = 0; i < popupNumber; i++) {
        if (popups[i]) {
            popups[i].close();
            popups[i] = null;
        }
    }');

function enableRc3Map() {
    rc3MapEnabled = true;
}

INIT(`const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    if ((month === 11) &&
        (27 <= day) &&
        (day <= 30)) {
        enableRc3Map();
    }
dnl
dnl Show tips in menu
    ADD_TIPS_TO_MENU
dnl Open tips in iframe
    triggerMessage = USER_CONFIRMATION(`"Press on SPACE to show tips"',
        `() => {
            TIMEOUT(`async function() {
                coWebsite = OPEN_COWEBSITE(`TIPS_LOCATION')
            }', `250')
        }')')

dnl Cleanup when leaving start
LEAVE_LAYER(`start', `cleanup();')
    
ENTER_LAYER(`rc3', `
    if (rc3MapEnabled) {
        WA.nav.goToRoom("/~/rc3.wam");
    }')

dnl lecture room
ENTER_LAYER(`lecture', `
dnl Cleanup open trigger messages and cowebsites
    cleanup();
    BBB(`9c83a2ee-25e5-4770-9ebd-60cde920b0a6', `coWebsite')')

dnl Detect if the users leaves BigBlueButton
LEAVE_LAYER(`lecture', `
    cleanup();')

dnl functions for workplaces
function components(wpNr, nr, nr2) {
    let components = "Could not fetch components";
    
    /* Show hint for changing components to admins */
    if ((WA.player.tags.includes("admin")) && (!adminHintShown)) {
        adminHintShown = true;
        WA.chat.sendChatMessage("You can change the displayed components here:", "Components")
        WA.chat.sendChatMessage("https://lab.itsec.hs-sm.de/components/edit/?token=" + WA.player.userRoomToken, "Components")
        WA.chat.sendChatMessage("Do not forget to select the correct table number", "Components")
    }

    function displayComponents(nr, components) {
        popups[popupNumber] = WA.ui.openPopup(
            "contiki-" + nr,
            "Workgroup" + nr + ": " + components,
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
    
    XHR(`GET', `"/components/nr/" + nr + "?token=" + WA.player.userRoomToken', `function() {
            if (`XHR'.readyState == 4 && this.status == 200) {
                components = `XHR'.responseText;
                if (nr2) {
                    var `XHR2';
                    try {
                        `XHR2' = new XMLHttpRequest();
                    } catch (e) {
                        console.error("Could not generate `XHR2'");
                    }
                    
                    if (`XHR2') {
                        `XHR2'.open("GET", "/components/nr/" + nr2 + "?token=" + WA.player.userRoomToken, true);
                        `XHR2'.onreadystatechange = function() {
                            if (`XHR2'.readyState == 4 && this.status == 200) {
                                components += "; ";
                                components += `XHR2'.responseText;
                                displayComponents(wpNr, components);
                            }
                        }
                        `XHR2'.send(null);
                    }
                } else {
                    displayComponents(wpNr, components);
                }
            }
        }')
}

MULTI_USER

dnl Generate multi-user enter functions
ENTER_LAYER(`workgroup-1', `
    components(1, 1, 2);
    multiUser("contiki-1", "contiki-2");
')

ENTER_LAYER(`workgroup-2', `
    components(2, 3, 4);
    multiUser("contiki-3", "contiki-4");
')

ENTER_LAYER(`workgroup-3', `
    components(3, 5, 6);
    multiUser("contiki-5", "contiki-6");
')


dnl Generate multi-user leave functions
forloop(`i', `1', `3', `LEAVE_LAYER(`workgroup-i', `
    cleanup();')
')
