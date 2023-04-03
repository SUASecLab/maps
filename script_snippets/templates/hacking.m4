dnl Generates the script for the programmers' heaven
dnl
include(`script_snippets/api/init.m4')dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/api/ui.m4')dnl
include(`script_snippets/composite/forloop2.m4')dnl
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
MULTI_USER

dnl Generate multi user enter functions
forloop(`i', `1', `21', `ENTER_LAYER(`user-i', `
    multiUser("hacking-i");')
')

dnl Generate multi-user leave functions
forloop(`i', `1', `21', `LEAVE_LAYER(`user-i', `
    cleanup();')
')

