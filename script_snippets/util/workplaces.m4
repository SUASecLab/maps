dnl Workplace operations
dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/ui.m4')dnl
include(`script_snippets/js/timeout.m4')dnl
include(`script_snippets/js/xhr.m4')dnl
dnl
dnl Multi-user workplace
dnl
define(`MULTI_USER', `function multiUser(machine, machine2) {
    cleanup();
    triggerMessage = USER_CONFIRMATION(`"Press on SPACE to open the group workplace"',
        `() => {
            XHR(`GET', `"/extensions/getNoVNCPassword/?token=" + WA.player.userRoomToken',`function() {
                    if (`XHR'.readyState == 4 && this.status == 200) {
                        const password =  `XHR'.responseText;

                    TIMEOUT(`async function() {
                        if (machine2) {
                            coWebsite2 = OPEN_COWEBSITE(`"/websockify/vnc.html?path=" + machine2 + "&autoconnect=true&resize=scale&password=" + password', `false', `"fullscreen"', `25')
                        }
                        coWebsite = OPEN_COWEBSITE(`"/websockify/vnc.html?path=" + machine + "&autoconnect=true&resize=scale&password=" + password', `false', `"fullscreen"', `25')
                        coWebsiteJitsi = OPEN_COWEBSITE(`"/extensions/jitsi/?roomName=" + machine + "&userName=" + encodeURI(WA.player.name) + "&token=" + WA.player.userRoomToken', `false', `"fullscreen"', `25')
                    }',  `250')
                }
            }')
        }')
}')dnl
dnl
dnl Single-user workplace
dnl
define(`SINGLE_USER', `function singleUser(machine, confirmationMessage, secondWebsite) {
    cleanup();
    triggerMessage = USER_CONFIRMATION(`confirmationMessage',
        `() => {
            XHR(`GET', `"/extensions/getNoVNCPassword/?token=" + WA.player.userRoomToken',`function() {
                    if (`XHR'.readyState == 4 && this.status == 200) {
                        const password =  `XHR'.responseText;
                        
                        TIMEOUT(`async function() {
                            if (secondWebsite) {
                                coWebsite2 = OPEN_COWEBSITE(`secondWebsite', `false', `""', `25', `1', `true')
                            }
                            coWebsite = OPEN_COWEBSITE(`"/websockify/vnc.html?path=" + machine + "&autoconnect=true&resize=scale&password=" + password', `false', `"fullscreen"', `25')
                        }', `250')
                    }
                }')
        }')
}')dnl
