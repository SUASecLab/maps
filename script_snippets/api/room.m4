dnl WorkAdventure Room operations
dnl
dnl Subscribe to entering layers events
dnl
dnl Parmeters:
dnl $1: Layer name
dnl $2: Code to run if the layer was entered
dnl
define(`ENTER_LAYER', `WA.room.onEnterLayer("$1").subscribe(() => { $2
});')dnl
dnl
dnl
dnl Subscribe to leaving layer events
dnl
dnl Parameters:
dnl $1: Layer name
dnl $2: Code to run if the layer was left
dnl
dnl
define(`LEAVE_LAYER', `WA.room.onLeaveLayer("$1").subscribe(() => {$2
});')dnl
