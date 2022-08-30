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
triggerMessage = USER_CONFIRMATION(`"Press on SPACE to enter the lecture"',
        `() => {
            XHR(`GET', `"/extensions/bigbluebutton/?token=" + WA.player.userRoomToken +
                    "&meetingName=lecture&meetingID=0c7e6c16-bb49-45c3-b567-e3ed2945a7ab&userName=" +
                    encodeURI(WA.player.name)',
            `function() {
                    if (`XHR'.readyState == 4 &&  this.status == 200) {
                        let bbbJoinLink = `XHR'.responseText;

                        TIMEOUT(`async function() {
                            $2 = OPEN_COWEBSITE(bbbJoinLink, false,
                                        "microphone *; camera *; fullscreen; display-capture *; clipboard-read *; clipboard-write *;",
                                    70, 0, true, false)
                        }', `250')
                    }
                }')
        }')')dnl
