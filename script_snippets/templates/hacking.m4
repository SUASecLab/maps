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
dnl coWebsite2 = 2nd CoWebsite variable, also needed for cleanup
dnl triggerMesage = TriggerMessage variable, needed for cleanup operation
var coWebsite;
var coWebsite2;
var triggerMessage;

CLEANUP

dnl Add show tips functionality to menu
INIT(`ADD_TIPS_TO_MENU')
SINGLE_USER

dnl Generate multi user enter functions
forloop(`i', `1', `21', `ENTER_LAYER(`user-i', `
    if (WA.player.tags.includes("hacking-ctf")) {
    	singleUser(WA.player.id, "Press on SPACE to open the workplace", "/ctf/?token=" + WA.player.userRoomToken);
    } else {
   		singleUser("hacking-i", "Press on SPACE to open the workplace");
    }')
')

dnl Generate multi-user leave functions
forloop(`i', `1', `21', `LEAVE_LAYER(`user-i', `
    cleanup();
    if (coWebsite2) {
        coWebsite2.close();
    }
    if (coWebsite) {
        coWebsite.close();
    }
    ')
')

