dnl Generates the script for the graphics interaction laboratory
dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/util/bbb.m4')dnl
include(`script_snippets/util/cleanup.m4')dnl
dnl
dnl coWebsite = CoWebsite variable, needed for cleanup operation
dnl triggerMesage = TriggerMessage variable, needed for cleanup operation
dnl
var coWebsite;
var triggerMessage;

CLEANUP

dnl Detect if the user enters BigBlueButton
ENTER_LAYER(`lecture', `
dnl Cleanup open trigger messages and cowebsites
    cleanup();
    BBB(`0c7e6c16-bb49-45c3-b567-e3ed2945a7ab', `coWebsite')')

dnl Detect if the users leaves BigBlueButton
LEAVE_LAYER(`lecture', `
    cleanup();')
