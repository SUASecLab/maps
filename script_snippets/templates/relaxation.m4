dnl Generates the script for the relaxation area
dnl
include(`script_snippets/api/init.m4')dnl
include(`script_snippets/composite/foreach.m4')dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/api/ui.m4')dnl
include(`script_snippets/js/timeout.m4')dnl
include(`script_snippets/js/xhr.m4')dnl
include(`script_snippets/util/cleanup.m4')dnl
include(`script_snippets/util/workplaces.m4')dnl
include(`script_snippets/util/tips.m4')dnl
dnl
let cinemaHintsShown = false;
var currentVideoLink;
var intervalId;
dnl coWebsite = CoWebsite variable, needed for cleanup operation
dnl triggerMesage = TriggerMessage variable, needed for cleanup operation
var coWebsite;
var coWebsite2;
var coWebsiteJitsi;
var triggerMessage;

CLEANUP

dnl Add show tips functionality to menu
INIT(`ADD_TIPS_TO_MENU')

dnl Cinema functionality

ENTER_LAYER(`cinema', `
    if (!cinemaHintsShown) {
        WA.chat.sendChatMessage("Change video: /video <Video Link>", "Cinema");
        WA.chat.sendChatMessage("Link format: https://www.youtube.com/watch?v=Video-ID", "Cinema");
        cinemaHintsShown = true;
    }
    
    getVideoLink(async function(link) {
        if (link) {
            coWebsite = OPEN_COWEBSITE(link);
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
                            coWebsite = OPEN_COWEBSITE(currentVideoLink);
                        }, 250);
                    }
                }
            });
        }, 1000);
    });
')

LEAVE_LAYER(`cinema', `
    cleanup();
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
')


WA.chat.onChatMessage((message => {
    if (message.startsWith("/video")) {
        let input = message.split(" ");
        if (input.length != 2) {
            WA.chat.sendChatMessage("Wrong number of arguments", "Cinema");
        } else {
            XHR(`GET', `"/cinema/?url=" + input[1] + "&token=" + WA.player.userRoomToken',`
                function() {
                    if (`XHR'.readyState == 4) {
                        let response = `XHR'.responseText;
                        WA.chat.sendChatMessage(response, "Cinema");
                    }
                }')
        }
    }
}));

function getVideoLink(myCallback) {
    XHR(`GET', `"/cinema/?token=" + WA.player.userRoomToken', `function() {
            if (`XHR'.readyState == 4 && this.status == 200) {
                myCallback(`XHR'.responseText);
            } else if (`XHR'.readyState == 4 && this.status == 404) {
                myCallback(null);
            }
        }')
}

dnl Games

SINGLE_USER

dnl Enter games

ENTER_LAYER(`wanderlust', `
    singleUser("gaming-1", "Press SPACE if you experience a light case of WANDERLUST");')
ENTER_LAYER(`doukutsu', `
    singleUser("gaming-2", "Press SPACE if you interested into a story about a cave");')
ENTER_LAYER(`scummvm', `
    singleUser("gaming-3", "When the name of chuck the plant is not a secret to you, then press SPACE");')
dnl
dnl Leave games

foreach(`MAP', (wanderlust, doukutsu, scummvm), `LEAVE_LAYER(`MAP', `
    cleanup();')
')
