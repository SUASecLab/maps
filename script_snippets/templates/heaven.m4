dnl Generates the script for the programmers' heaven
dnl
include(`script_snippets/api/init.m4')dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/api/ui.m4')dnl
include(`script_snippets/composite/forloop2.m4')dnl
include(`script_snippets/util/bbb.m4')dnl
include(`script_snippets/util/workplaces.m4')dnl
include(`script_snippets/util/cleanup.m4')dnl
include(`script_snippets/util/tips.m4')dnl
dnl
dnl coWebsite = CoWebsite variable, needed for cleanup operation
dnl triggerMesage = TriggerMessage variable, needed for cleanup operation
var coWebsite;
var triggerMessage;

CLEANUP

dnl Add show tips functionality to menu
INIT(`ADD_TIPS_TO_MENU')

dnl Only change maps if exam mode is not enabled
ENTER_LAYER(`gil', `dnl
    CHANGE_MAP(`"/@/org/lab.itsec.hs-sm.de/gil"')')

ENTER_LAYER(`laboratory', `dnl
    CHANGE_MAP(`"/@/org/lab.itsec.hs-sm.de/laboratory"')')

ENTER_LAYER(`lecture', `
dnl Cleanup open trigger messages and cowebsites
    cleanup();
    BBB(`b7d89ad5-1353-412d-9a61-f5031a6ec34b', `coWebsite')')

dnl Detect if the users leaves BigBlueButton
LEAVE_LAYER(`lecture', `
    cleanup();')

SINGLE_USER
MULTI_USER

dnl Generate multi user enter functions
forloop(`i', `1', `3', `ENTER_LAYER(`multi_user-i', `
    multiUser("heaven-i");')
')

dnl Generate multi-user leave functions
forloop(`i', `1', `3', `LEAVE_LAYER(`multi_user-i', `
    cleanup();')
')

dnl Generate single-user enter functions
forloop(`i', `1', `23', `ENTER_LAYER(`single_user-i', `
    singleUser("heaven-i", "Press on SPACE to open the workplace");')
')

dnl Generate singe-user leave functions
forloop(`i', `1', `23', `LEAVE_LAYER(`single_user-i', `
    cleanup();')
')
