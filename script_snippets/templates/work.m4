dnl Generates the script for the internet of things laboratory
dnl
include(`script_snippets/api/nav.m4')dnl
include(`script_snippets/api/room.m4')dnl
include(`script_snippets/api/ui.m4')dnl
include(`script_snippets/composite/forloop2.m4')dnl
include(`script_snippets/util/bbb.m4')dnl
include(`script_snippets/util/workplaces.m4')dnl
include(`script_snippets/util/cleanup.m4')dnl
dnl
var rc3MapEnabled = false;
var popups = [];
var popupNumber = 0;
let adminHintShown = false;
var coWebsite;
var triggerMessage;

CLEANUP(`
    for (let i = 0; i < popupNumber; i++) {
        if (popups[i]) {
            popups[i].close();
            popups[i] = null;
        }
    }');

function enableRc3Map() {
    rc3MapEnabled = true;
}

WA.onInit().then(() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    if ((month === 11) &&
        (27 <= day) &&
        (day <= 30)) {
        enableRc3Map();
    }
});

ENTER_LAYER(`rc3', `
    if (rc3MapEnabled) {
        WA.nav.goToRoom("/@/org/lab.itsec.hs-sm.de/rc3");
    }')

// lecture room
ENTER_LAYER(`lecture', `
dnl Cleanup open trigger messages and cowebsites
    cleanup();
    BBB(`9c83a2ee-25e5-4770-9ebd-60cde920b0a6', `coWebsite')')

dnl Detect if the users leaves BigBlueButton
LEAVE_LAYER(`lecture', `
    cleanup();')

// functions for workplaces
function components(nr) {
    let components = "Could not fetch components";
    
    /* Show hint for changing components to admins */
    if ((WA.player.tags.includes("admin")) && (!adminHintShown)) {
        adminHintShown = true;
        WA.chat.sendChatMessage("You can change the displayed components here:", "Components")
        WA.chat.sendChatMessage("https://lab.itsec.hs-sm.de/components/edit/?token=" + WA.player.userRoomToken, "Components")
        WA.chat.sendChatMessage("Do not forget to select the correct table number", "Components")
    }

    function displayComponents(nr, components) {
        popups[popupNumber] = WA.ui.openPopup(
            "contiki-" + nr,
            "Workplace " + nr + '\n' + components,
            [{
                label: "Close",
                className: "primary",
                callback: (popup) => {
                    popup.close();
                }
            }]
        );
        popupNumber++;
    }
    
    XHR(`GET', `"/components/nr/" + nr + "?token=" + WA.player.userRoomToken', `function() {
            if (`XHR'.readyState == 4 && this.status == 200) {
                components =  `XHR'.responseText;
                displayComponents(nr, components);
            }
        }')
}

MULTI_USER

SINGLE_USER

dnl Generate multi-user enter functions
forloop(`i', `1', `6', `ENTER_LAYER(`workgroup-i', `
    components(i);
    multiUser("contiki-i");')
')

dnl Generate multi-user leave functions
forloop(`i', `1', `6', `LEAVE_LAYER(`workgroup-i', `
    cleanup();')
')

dnl Generate single-user enter functions
forloop(`i', `1', `22', `ENTER_LAYER(`singleuser-i', `
    singleUser("cooja-i", `"Press on SPACE to open the workplace"');')
')

dnl Generate singe-user leave functions
forloop(`i', `1', `22', `LEAVE_LAYER(`singleuser-i', `
    cleanup();')
')
