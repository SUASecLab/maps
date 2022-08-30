dnl WorkAdventure UI operations
dnl
dnl Waiting for user confirmation
dnl
dnl Parameters:
dnl $1: message
dnl $2: callback function
dnl
define(`USER_CONFIRMATION', `WA.ui.displayActionMessage({
        message: $1,
        callback: $2
    });')dnl
