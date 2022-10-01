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
            TIMEOUT(`async function() {
                if (machine2) {
                    coWebsite = OPEN_COWEBSITE(`"/assigner/" + machine + "?vm2=" + machine2 + "&token=" + WA.player.userRoomToken + "&name=" + encodeURI(WA.player.name)', `false', `"microphone *; camera *; fullscreen"', 75)
                }
                else {
                    coWebsite = OPEN_COWEBSITE(`"/assigner/" + machine + "?token=" + WA.player.userRoomToken + "&name=" + encodeURI(WA.player.name)', `false', `"microphone *; camera *; fullscreen"')
                }
            }',  `250')
        }')
}')dnl
dnl
dnl Single-user workplace
dnl
define(`SINGLE_USER', `function singleUser(machine, confirmationMessage) {
    cleanup();
    triggerMessage = USER_CONFIRMATION(`confirmationMessage',
        `() => {
            XHR(`GET', `"/extensions/getNoVNCPassword/?token=" + WA.player.userRoomToken',`function() {
                    if (`XHR'.readyState == 4 && this.status == 200) {
                        const password =  `XHR'.responseText;
                        
                        TIMEOUT(`async function() {
                            coWebsite = OPEN_COWEBSITE(`"/websockify/vnc.html?path=websockify/" + machine + "&autoconnect=true&resize=scale&password=" + password', `false', `"fullscreen"')
                        }', `250')
                    }
                }')
        }')
}')dnl
