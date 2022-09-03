dnl WorkAdventure init operation
dnl
dnl Listening on init
dnl
dnl Parameters
dnl $1 JS to be run on init
dnl
define(`INIT', `WA.onInit().then(() => {
    $1
});')dnl
