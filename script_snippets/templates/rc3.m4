dnl Generates the script for the rc3 map
dnl
include(`script_snippets/api/init.m4')dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/util/tips.m4')dnl
ENTER_LAYER(`fahrplan', `OPEN_TAB(`https://fahrplan.events.ccc.de/rc3/2021/Fahrplan/')')

dnl Add show tips functionality to menu
INIT(`ADD_TIPS_TO_MENU')
