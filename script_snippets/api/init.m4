dnl WorkAdventure init operation
dnl
dnl Listening on init
dnl
dnl Parameters
dnl $1 JS to be run on init
dnl
define(`INIT', `WA.onInit().then(() => {
    if (WA.player.tags.includes("exam")) {
        WA.controls.disablePlayerProximityMeeting();
        console.log("Exam mode: disabling proximity meeting");
    }
    $1
});')dnl
