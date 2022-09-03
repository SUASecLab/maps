dnl  Show tips functions
dnl
dnl Define tips location
define(`TIPS_LOCATION', `"/maps/tips.html"')dnl
dnl
dnl Define function for registering menu command
define(`ADD_TIPS_TO_MENU', `
    WA.ui.registerMenuCommand("Show tips",
        {
            iframe: TIPS_LOCATION
        });')dnl
