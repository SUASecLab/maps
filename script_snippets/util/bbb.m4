dnl BigBlueButton operations
dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/api/ui.m4')dnl
include(`script_snippets/js/timeout.m4')dnl
include(`script_snippets/js/xhr.m4')dnl
dnl
dnl Parameters
dnl $1 meetingID
dnl $2 coWebsiteName
define(`BBB', `dnl
if (!(WA.player.tags.includes("exam"))) {
    triggerMessage = USER_CONFIRMATION(`"Press on SPACE to enter the lecture"',
            `() => {
                XHR(`GET', `"/extensions/bigbluebutton/?token=" + WA.player.userRoomToken +
                        "&meetingName=lecture&meetingID=$1&userName=" +
                        encodeURI(WA.player.name)',
                `function() {
                        if (`XHR'.readyState == 4 &&  this.status == 200) {
                            let bbbJoinLink = `XHR'.responseText;

                            TIMEOUT(`async function() {
                                $2 = OPEN_COWEBSITE(bbbJoinLink, false,
                                            "microphone *; camera *; display-capture *; clipboard-read *; clipboard-write *; screen-wake-lock *; fullscreen *",
                                        70, 0, true, false)
                            }', `250')
                        }
                    }')
            }')
        }')dnl
